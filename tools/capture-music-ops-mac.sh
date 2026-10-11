#!/bin/bash
# Capture the REAL Music Ops dashboard running on this Mac, not a fabricated mockup.
# Run from inside the extracted portfolio with: bash tools/capture-music-ops-mac.sh
set -euo pipefail

SITE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
URL="${MUSICOPS_URL:-http://127.0.0.1:8899}"
IMAGE="$SITE_ROOT/assets/images/music-ops-dashboard.png"
CASE="$SITE_ROOT/case-studies/music-ops.html"
CHROME=''
for c in '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' "$HOME/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" '/Applications/Chromium.app/Contents/MacOS/Chromium'; do
  if [ -x "$c" ]; then CHROME="$c"; break; fi
done
if [ -z "$CHROME" ]; then
  echo 'Google Chrome/Chromium is needed for one-command capture.' >&2
  exit 1
fi
if ! curl -fsS --max-time 4 "$URL" > /dev/null; then
  echo "Music Ops was not reachable at $URL" >&2
  echo "Start it on your Mac first:" >&2
  echo '  cd ~/Documents/autonomous-playlists-v6' >&2
  echo '  ./venv/bin/python -m control_center.server' >&2
  echo 'Then run this script again.' >&2
  exit 1
fi

TMP="$(mktemp -d -t musicops-capture)"
trap 'rm -rf "$TMP"' EXIT
"$CHROME" --headless=new --no-first-run --no-default-browser-check \
  --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --user-data-dir="$TMP/chrome-profile" --window-size=1440,960 \
  --virtual-time-budget=6000 --screenshot="$TMP/screenshot.png" "$URL" \
  > "$TMP/chrome.log" 2>&1 || {
  echo 'Chrome capture failed. Look for browser permissions or dashboard startup issues.' >&2
  exit 1
}
if [ ! -s "$TMP/screenshot.png" ]; then
  echo 'No screenshot was created.' >&2
  exit 1
fi
mkdir -p "$(dirname "$IMAGE")"
cp "$TMP/screenshot.png" "$IMAGE"
SITE_ROOT="$SITE_ROOT" python3 - <<'PY'
from pathlib import Path
import os,re
site=Path(os.environ['SITE_ROOT'])
f=site/'case-studies/music-ops.html'
s=f.read_text(encoding='utf-8')
replacement='''<div class="real-dashboard-mount" id="musicops-screenshot-mount"><figure><img src="../assets/images/music-ops-dashboard.png" alt="Actual Who’s AUX Music Ops control center dashboard, captured from the local application" loading="lazy"/><figcaption>WHO’S AUX MUSIC OPS / ACTUAL LOCAL CONTROL CENTER INTERFACE</figcaption></figure></div>'''
pattern=r'<div\b(?=[^>]*\bid=["\']musicops-screenshot-mount["\'])[^>]*>.*?</div>'
s,n=re.subn(pattern,lambda _:replacement,s,count=1,flags=re.S)
if n != 1:
    raise SystemExit('Could not locate the Music Ops image slot in case study; HTML left unchanged.')
f.write_text(s,encoding='utf-8')
print('Inserted the real dashboard screenshot in case-studies/music-ops.html')
PY
printf '\nCaptured %s\n' "$IMAGE"
echo 'Review the screenshot carefully for private names, paths, tokens, or unreleased content BEFORE committing it publicly.'
