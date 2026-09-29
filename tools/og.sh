#!/bin/sh
# Renders tools/og.html into og.png (en) and es/og.png (es), 1200x630.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
render() {
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=5000 \
    --screenshot="$2" "file://$PWD/tools/og.html?lang=$1" >/dev/null 2>&1
}
render en og.png
render es es/og.png
