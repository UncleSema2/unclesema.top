#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
repo='UncleSema2/unclesema.top'
gh auth status --hostname github.com
login="$(gh api user --jq .login)"
if [[ "$(printf '%s' "$login" | tr '[:upper:]' '[:lower:]')" != 'unclesema2' ]]; then
  echo "Expected GitHub account UncleSema2; authenticated as $login." >&2
  exit 1
fi
if [[ ! -d .git ]]; then
  git init -b main
  git config user.name 'Semen Korobko'
  git config user.email 'semenkorobko2@gmail.com'
fi
git add docs .gitignore README.md scripts
if ! git diff --cached --quiet; then
  git commit -m 'Update personal research homepage'
fi
if ! gh repo view "$repo" >/dev/null 2>&1; then
  gh repo create "$repo" --public --description 'Personal research homepage — world models, representation learning and planning' --source . --remote origin
elif ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "https://github.com/$repo.git"
fi
git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push -u origin main
if gh api "repos/$repo/pages" >/dev/null 2>&1; then
  gh api --method PUT "repos/$repo/pages" --input - <<'JSON'
{"build_type":"legacy","source":{"branch":"main","path":"/docs"},"cname":"unclesema.top"}
JSON
else
  gh api --method POST "repos/$repo/pages" --input - <<'JSON'
{"build_type":"legacy","source":{"branch":"main","path":"/docs"}}
JSON
  gh api --method PUT "repos/$repo/pages" -f cname=unclesema.top
fi
gh api --method POST "repos/$repo/pages/builds" >/dev/null
printf '\nPublished source: https://github.com/%s\n' "$repo"
printf 'Website: https://unclesema.top/\n'
