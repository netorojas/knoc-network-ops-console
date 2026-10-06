# Changelog

All notable changes to Orbiscale (formerly KNOC). Format: [Keep a Changelog](https://keepachangelog.com/), versions follow SemVer.

## [4.0.0] - 2026-10-07
### Added
- Orbinoc is now **Orbiscale** (orbit + scale). Discovery files from v3 (`orbinoc-discovery/1`) still import.
- **Live map**: floating site cards that never overlap each other, the markers or the controls. Drag them anywhere, pin, collapse or close; positions are remembered.
- Level of detail on the map: blurred chip when far, summary when closer, full asset list up close; colliding labels blur until you hover them.
- Minimap with "you are here" on the map and the topology; click or drag it to travel.
- Rich hover tooltips, click ripples and an exploration progress chip.
- Topology: drag assets to make room (not saved, "Re-arrange" undoes it), hover shows neighbours, zone and block titles shrink with an ellipsis instead of running into each other, secondary captions step aside when zoomed out.
- **Settings › Look and colours**: 7 palettes (Signature, Corporate, Graphite, Ocean, Woodland, Dusk, High contrast) plus your own brand colours, with a contrast check.
- **Settings › Contact and support**: contact, commercial licence, issue report that opens a pre-filled GitHub draft (blocks passwords and tokens), private security advisory.
- `SECURITY.md` and GitHub issue templates.
### Changed
- New default palette: light "Ember" (signal red, royal blue, sun yellow on warm cream), dark "Grove" (night forest, moss green, old gold).
- The help button opens a menu: FAQ, tour, what's new, contact, report a problem.

## [3.0.0] - 2026-10-07
### Added
- KNOC is now **Orbinoc**.
- World map (Natural Earth) that frames itself around your footprint; countries come from your data.
- Demo scenarios: 1 country · Regional · Global (35 sites, 25 countries, 200+ assets).
- Multicloud: AWS, Azure, Google Cloud, OCI and IBM Cloud regions on the map; IaaS/PaaS/SaaS, Kubernetes, containers, functions, bots, databases, backup and DR.
- On-prem platforms: VMware, Proxmox, Hyper-V, Nutanix, Docker, Kubernetes, Veeam, Commvault, NetApp.
- Settings › Discovery: read-only collectors for 13 platforms + Terraform and Ansible, a tested normalizer and file import.
- Map and topology fill the screen.
- New light and dark themes; hidden easter egg.
- 10 more integrations; localhost kit (`serve.sh`, `serve.ps1`, Docker).
### Changed
- Licence: AGPL-3.0-or-later (open-core) with a commercial licence available. v2.x and earlier remain MIT.

## [2.0.0] - 2026-10-06
### Added
- Shared portal shell (`assets/portal.*`): demo sign-in (Entra ID, Google, GitHub, enterprise SSO), settings panel, 26 integration blueprints with field mapping and a simulated connection test, command palette, FAQ, changelog and a 60-second tour.
- Responsive layout down to 360 px with a mobile drawer and bottom sheets.
- Map and topology fill the viewport and re-fit on resize; friendlier zoom levels in the topology.
### Security
- No credential is collected. Integration secrets are stored only as a vault reference; connectors default to read-only.

## [1.1.0] - 2026-10-05
### Added
- Public demo with a fictional company (Contoso LATAM), Open Graph cards, GIF and MP4 walkthrough, gitleaks on every push.

## 4.1.0 — Executive workspace

- Executive navy/blue/teal palette by default; existing choices retained, graphite/violet added.
- Initial loading state, with initialization fallback notice and reduced-motion support.
- Removed KPI count-up on navigation and repeated delayed topology fitting.
- FinOps demonstration: explicit fictional USD costs, budgets and potential savings; Azure, AWS and IBM inventory from the existing snapshot.
- Shared work-origin view uses existing backlog evidence and an explicit fictional SBC association. External email, Teams, calendar and billing connectors remain unconnected.
- Validation: JavaScript syntax, panel output, cost totals, inventory providers and relation IDs. Browser visual/performance validation pending.
