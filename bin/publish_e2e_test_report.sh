#!/bin/bash
set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_PULL_REQUEST:?Missing DRONE_PULL_REQUEST}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"
: "${DRONE_COMMIT_SHA:?Missing DRONE_COMMIT_SHA}"

test -s playwright-report/index.html || { echo "Missing Playwright HTML report"; exit 1; }
[[ "$DRONE_PULL_REQUEST" =~ ^[0-9]+$ ]] || { echo "Invalid pull request number"; exit 1; }
[[ "$DRONE_BUILD_NUMBER" =~ ^[0-9]+$ ]] || { echo "Invalid build number"; exit 1; }

umask 077
archive="playwright-report-pr-$DRONE_PULL_REQUEST-$DRONE_BUILD_NUMBER.zip"
response_file=$(mktemp)
trap 'rm -f "$response_file" "$archive"' EXIT
rm -f "$archive"
zip -qr "$archive" playwright-report

api="https://api.github.com/repos/$DRONE_REPO"
tag="pr-$DRONE_PULL_REQUEST-playwright-report"

github_api() {
  curl --fail-with-body -sS \
    -H "Authorization: Bearer $GITHUB_APP_TOKEN" \
    -H 'Accept: application/vnd.github+json' "$@"
}

http_code=$(curl -sS -o "$response_file" -w '%{http_code}' \
  -H "Authorization: Bearer $GITHUB_APP_TOKEN" \
  -H 'Accept: application/vnd.github+json' "$api/releases/tags/$tag")
case "$http_code" in
  200) ;;
  404)
    github_api -X POST "$api/releases" \
      -d "$(jq -n --arg tag "$tag" --arg commit "$DRONE_COMMIT_SHA" \
        --arg name "Playwright Report PR #$DRONE_PULL_REQUEST" \
        '{tag_name:$tag,target_commitish:$commit,name:$name,prerelease:true,draft:false}')" > "$response_file"
    ;;
  *)
    echo "Failed to fetch report release (HTTP $http_code)"
    exit 1
    ;;
esac
release_id=$(jq -er '.id | select(type == "number")' "$response_file")

asset_ids=()
page=1
while :; do
  assets=$(github_api "$api/releases/$release_id/assets?per_page=100&page=$page")
  matching_ids=$(printf '%s' "$assets" | jq -r --arg name "$archive" '.[] | select(.name == $name) | .id')
  while IFS= read -r asset_id; do
    [ -n "$asset_id" ] && asset_ids+=("$asset_id")
  done <<< "$matching_ids"
  count=$(printf '%s' "$assets" | jq -er 'length')
  [ "$count" -eq 100 ] || break
  page=$((page + 1))
done

# Delete after pagination so removing an asset cannot shift later pages.
for asset_id in "${asset_ids[@]}"; do
  github_api -X DELETE "$api/releases/assets/$asset_id" > /dev/null
done

asset=$(github_api -X POST \
  -H 'Content-Type: application/zip' \
  --data-binary "@$archive" \
  "https://uploads.github.com/repos/$DRONE_REPO/releases/$release_id/assets?name=$archive")
download_url=$(printf '%s' "$asset" | jq -er '.browser_download_url | select(type == "string" and length > 0)')

marker="<!-- playwright-report-build-$DRONE_BUILD_NUMBER -->"
body=$(printf '%s\nPlaywright HTML report for this PR build:\n%s\n\nDrone build: %s\n' \
  "$marker" "$download_url" "$DRONE_BUILD_LINK")
comment_id=''
page=1
while :; do
  comments=$(github_api "$api/issues/$DRONE_PULL_REQUEST/comments?per_page=100&page=$page")
  comment_id=$(printf '%s' "$comments" | jq -r --arg marker "$marker" \
    '[.[] | select(.user.type == "Bot" and (.body | contains($marker)))][0].id // empty')
  [ -z "$comment_id" ] || break
  count=$(printf '%s' "$comments" | jq -er 'length')
  [ "$count" -eq 100 ] || break
  page=$((page + 1))
done

comment_payload=$(jq -n --arg body "$body" '{body:$body}')
if [ -n "$comment_id" ]; then
  comment=$(github_api -X PATCH "$api/issues/comments/$comment_id" -d "$comment_payload")
else
  comment=$(github_api -X POST "$api/issues/$DRONE_PULL_REQUEST/comments" -d "$comment_payload")
fi
comment_url=$(printf '%s' "$comment" | jq -er '.html_url | select(type == "string" and length > 0)')
echo "Uploaded report asset: $download_url"
echo "Published PR comment: $comment_url"
