# Portfolio — updated campaign work

Static GitHub Pages site. Extract the ZIP and copy **its contents** into the root of the existing repository, preserving `assets/`, `case-studies/` and the page files. Commit and push the extracted files, not the ZIP.

## Latest revision: Operational Data Integration

- Reworked the case study into a shorter, image-led page with Salesforce lead-routing and Zapier product/pricebook automation shown as actual screenshots.
- Added the Account-centered consultation engagement workflow from the later Salesforce sandbox implementation (Lead conversion, POCs, engagement history and Tasks), while keeping planned renewal reminders clearly distinguished.
- Updated the Systems index thumbnail and summary. Everything else in the portfolio remains unchanged.

## Changes in the previous pass

- Removed the Vinyl Club signup-page mockup from the predictive analytics case study. The benchmark-grounded scenario graphic remains.
- Reformatted the homepage discipline selector so real project screenshots display in full with information below the visual, not covering charts.
- Removed repeated end-of-case-study cards and the separate creative metric/approach panels.
- Added the *Last Chance* vertical promo and two additional *Late Breakfast* edits, grouped as before, campaign, and after. Existing five videos remain.
- Kept documented event totals unobtrusive alongside their own relevant campaign. No unsupported claims about video-attributed conversion.
- The Music Ops diagram remains truthful. **An actual live screenshot is not included** because that app runs locally on the owner's Mac and was not part of the attached site files.

## Capturing the REAL Music Ops dashboard (on the Mac where the app lives)

Start Music Ops (`~/Documents/autonomous-playlists-v6`, port 8899) if it isn't already running, then from the extracted website root run:

```bash
bash tools/capture-music-ops-mac.sh
```

This uses the locally installed Chrome browser in headless mode, takes a real screenshot at `http://127.0.0.1:8899`, saves `assets/images/music-ops-dashboard.png`, and inserts it into `case-studies/music-ops.html`. If you use a different local URL, prefix the command with `MUSICOPS_URL=...`.

**Review the image for private names, paths, access tokens, unpublished material, and internal data before committing.** If it fails to show the dashboard (because login is required or the app isn't running), do not publish it—open the app and capture a suitable view manually instead.

## GitHub Pages

Each included video is a web-sized H.264 MP4 (under GitHub's normal 25 MiB browser-upload limit). Do not use Git LFS to host GitHub Pages media. If you prefer GitHub Desktop, copy the extracted contents into a local clone and push.

### When merging into an existing repository

If they are still present from an earlier deployment, remove unused files such as `case-studies/tandem.html`, `assets/images/Vinyl.png`, and `assets/images/VinylClub.png`. They are intentionally absent from this build. This avoids leaving stale public pages and imagery behind when you merge updated files.

Gyu San is still unreleased; confirm permission to exhibit it publicly.


## 2026-10-11 update
- Creative grid: Between Seasons and Last Chance now share the row on desktop; removed the unused gap.
- Operational Data Integration: restored the complete story from cleanup and field mappings through lead routing, product sync, course data, consultation work, and reporting use.
- Sanitized project brief refreshed to a concise two-page PDF.
