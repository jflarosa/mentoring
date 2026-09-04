# Business context

- **Teams**: creative developers and crea (creative designers), who build interactive creatives —
  playable ads, MRAID, etc. — as JS bundles.
- **Problem**: creatives are shared with clients today via a raw link to a generic execution
  engine, no review UX:
  `https://cdn-creatives.adikteev.com/Creatives/demoLink/MLEngine/index.html?PLE_Phaser_Vite/creative-11a4d96e.min.js`
- **Goal of this project**: a public preview interface that runs a creative's JS bundle and lets
  clients validate or reject it, with:
  - device selection (phone brand/model, screen size)
  - orientation toggle (portrait/landscape)
  - dark / light mode
  - a validate/reject action for the client
- **UX reference**: [craftsmanplus playable preview](https://play.preview.craftsmanplus.com/) —
  ratio selector, orientation toggle, and a QR code to open the playable on a real mobile device.
  State (ratio, orientation, ...) is shared through URL query params
  (e.g. `?portrait=true&ratio=16:9`).
- **v1 scope (start simple)**: ratio selector, orientation toggle, QR code to open the preview on
  mobile. State managed via URL query params using `nuqs`, so a given ratio/orientation is
  shareable via link. The device selector, dark/light mode, and validate/reject flow come after.

This is the reference to check before proposing any architecture for the preview feature — do not
add scope beyond what's listed here without checking with the user first.
