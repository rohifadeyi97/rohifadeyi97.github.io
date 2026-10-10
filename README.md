# Portfolio - discipline-led final pass

Static site for GitHub Pages. No build step required.

## What changed

- Removed sticky navigation and case-study chapter bars. Creative filters also scroll away.
- The homepage discipline selector now switches the full page between a light Systems palette and a dark Creative palette, including headlines, copy, navigation, chapter colors, cards, and actions. Keyboard arrow support remains.
- Repaired typography and layout in all architecture diagrams, particularly the Marketing Attribution Warehouse and Operational Data Integration diagrams.
- Added a custom SVG visual summary from the documented Vinyl Club feasibility model. It is explicitly labeled modeled/not actual; the original Vinyl Club landing-page screenshot is preserved as separate brand context.
- Added a sanitized Salesforce lead-routing Flow Builder image to the existing workflow screenshots.
- Expanded descriptions of Gyu San and four event campaigns. Added the user's documented event-registration figures, distinguishing RSVPs from tickets sold. No claim of video-attributed conversions or attendance is made.
- Linked every event campaign to its POSH event page and Gyu San to its official website.
- All prior video files, screenshots, case-study URLs, and PDF deliverables are preserved.

## Deployment

Unzip the archive, and copy the *contents* of `portfolio-discipline-final` into the root of the `rohifadeyi97.github.io` repository, merging existing folders rather than deleting them. Then commit and push with GitHub Desktop or Git.

Do not upload the ZIP itself to the repository. Video files are already web-sized MP4s. Keep the `assets/creative` directory intact. No Git LFS is required.

The unreleased Gyu San commercial remains publicly visible as a portfolio preview; confirm you have permission before deploying.

## QA

The current pass was checked in offline Chromium at 1440px desktop and 390px mobile widths on eight pages. Menu behavior, the discipline switch, creative filters, no-overflow layouts, image references, non-sticky headers, and JavaScript errors were checked. External sites and the MP4 streams could not be fully exercised in the offline preview environment.
