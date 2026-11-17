#!/bin/bash
set -euo pipefail

: "${GITHUB_APP_ID:?Missing GITHUB_APP_ID}"
: "${GITHUB_APP_PRIVATE_KEY:?Missing GITHUB_APP_PRIVATE_KEY}"
: "${GITHUB_APP_INSTALLATION_ID:?Missing GITHUB_APP_INSTALLATION_ID}"
: "${OUTPUT_TOKEN_FILE:?Missing OUTPUT_TOKEN_FILE}"

umask 077
private_key=$(mktemp)
trap 'rm -f "$private_key"' EXIT
rm -f "$OUTPUT_TOKEN_FILE"
printf '%b' "$GITHUB_APP_PRIVATE_KEY" > "$private_key"

b64url() {
  openssl base64 -A | tr '+/' '-_' | tr -d '='
}

app_id=$(printf '%s' "$GITHUB_APP_ID" | tr -d '[:space:]')
installation_id=$(printf '%s' "$GITHUB_APP_INSTALLATION_ID" | tr -d '[:space:]')
[[ "$app_id" =~ ^[0-9]+$ ]] || { echo "GITHUB_APP_ID must be numeric"; exit 1; }
[[ "$installation_id" =~ ^[0-9]+$ ]] || { echo "GITHUB_APP_INSTALLATION_ID must be numeric"; exit 1; }

now=$(date +%s)
header=$(printf '{"alg":"RS256","typ":"JWT"}' | b64url)
payload=$(printf '{"iat":%s,"exp":%s,"iss":"%s"}' "$((now - 60))" "$((now + 540))" "$app_id" | b64url)
unsigned_token="$header.$payload"
signature=$(printf '%s' "$unsigned_token" | openssl dgst -binary -sha256 -sign "$private_key" | b64url)
jwt="$unsigned_token.$signature"

response=$(curl --fail-with-body -sS -X POST \
  -H "Authorization: Bearer $jwt" \
  -H 'Accept: application/vnd.github+json' \
  "https://api.github.com/app/installations/$installation_id/access_tokens")
token=$(printf '%s' "$response" | jq -er '.token | select(type == "string" and length > 0)')

mkdir -p "$(dirname "$OUTPUT_TOKEN_FILE")"
printf '%s' "$token" > "$OUTPUT_TOKEN_FILE"
chmod 600 "$OUTPUT_TOKEN_FILE"
