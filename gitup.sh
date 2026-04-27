#!/bin/bash
set -e

# Show what's about to be committed
git status --short
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "Nothing to commit."
    exit 0
fi

if [ $# -eq 0 ]; then
    read -p "Commit message: " commitMessage
else
    commitMessage="$*"
fi

if [ -z "$commitMessage" ]; then
    echo "Aborting: empty commit message."
    exit 1
fi

git add -A
git commit -m "$commitMessage"
git push
