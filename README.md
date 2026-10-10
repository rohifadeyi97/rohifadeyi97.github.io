# Portfolio — hiring-focused edition

A GitHub Pages compatible static website. Extract and merge the contents of this directory into the root of the portfolio repository. Do not upload the ZIP itself. Keep the existing directory structure.

## Structure
- `index.html`: new interactive two-discipline homepage. The Systems / Digital content lens uses `portfolio-polish.js`.
- `systems.html`: BI, CRM, data integrations, and Music Ops.
- `creative.html`: commercial content and social-first event campaigns, with accessible filters.
- `case-studies/`: five technical case studies; `autonomous-playlists.html` redirects to `music-ops.html`.
- `glass.css`, `studio.css`: preserved core styles. `portfolio-polish.css` applies the hiring-focused redesign.
- `glass.js`, `portfolio-polish.js`: existing interactions and the new lens/filter controls.
- `assets/images/`: original dashboard/diagram assets; `assets/creative/`: compressed videos and posters.

## Notes
- The Gyu San spot is unreleased. Confirm permission before publishing publicly.
- The event collaborations reported strong turnout; the portfolio does not attribute attendance or conversions to the videos.
- Power BI reports, PDFs, social links, and all local file references are preserved.
- No video is auto-played. Motion respects reduced-motion preferences.
- Original analytics and integration projects are described as what they actually built, not quantified with invented outcomes.

## Review
Open the site using a local static server (`python3 -m http.server 8000` from this folder) or GitHub Pages.
