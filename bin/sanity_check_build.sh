#!/bin/sh
set -e

export STATUS=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Status}})
export BRANCH=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Target}})
export EVENT=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Event}})
export REFS=$(drone build info $GIT_REPO $DRONE_BUILD_PARENT --format {{.Ref}})

if [[ "$STATUS" != "success" ]]; then
  echo "Build number $DRONE_BUILD_PARENT failed due to unsuccessful status."
  exit 1
fi

if [[ "$BRANCH" != "$DRONE_REPO_BRANCH" ]]; then
  echo "Build number $DRONE_BUILD_PARENT failed because it's not on the $DRONE_REPO_BRANCH branch."
  exit 1
fi

if [[ "$EVENT" != "push" ]]; then
  echo "Build number $DRONE_BUILD_PARENT failed because the event is not a push."
  exit 1
fi

if [[ "$REFS" != "refs/heads/master" ]]; then
  echo "Build number $DRONE_BUILD_PARENT failed because the reference is not refs/heads/$DRONE_REPO_BRANCH."
  exit 1
fi

echo "Build number $DRONE_BUILD_PARENT passed sanity check. Ready to deploy to PROD!"
