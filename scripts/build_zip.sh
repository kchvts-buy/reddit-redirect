#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="$(node -e "const m=require('$ROOT_DIR/manifest.json'); process.stdout.write(m.version)")"
OUT_DIR="$ROOT_DIR/dist"
OUT_FILE="$OUT_DIR/default-sort-for-reddit-$VERSION.zip"

mkdir -p "$OUT_DIR"
rm -f "$OUT_FILE"

cd "$ROOT_DIR"
zip -qr "$OUT_FILE" \
  manifest.json \
  background.js \
  popup.html \
  popup.js \
  icons/icon16.png \
  icons/icon32.png \
  icons/icon48.png \
  icons/icon128.png \
  icons/icon16-off.png \
  icons/icon32-off.png \
  icons/icon48-off.png \
  icons/icon128-off.png

echo "$OUT_FILE"
