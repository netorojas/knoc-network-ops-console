# Changelog

All notable changes to Orbinoc (formerly KNOC). Format: [Keep a Changelog](https://keepachangelog.com/), versions follow SemVer.

## [3.0.0] - 2026-10-07
### Added
- KNOC is now **Orbinoc**.
- World map (Natural Earth) that frames itself around your footprint; countries come from your data.
- Demo scenarios: 1 country · Regional · Global (35 sites, 25 countries, 200+ assets).
- Multicloud: AWS, Azure, Google Cloud, OCI and IBM Cloud regions on the map; IaaS/PaaS/SaaS, Kubernetes, containers, functions, bots, databases, backup and DR.
- On-prem platforms: VMware, Proxmox, Hyper-V, Nutanix, Docker, Kubernetes, Veeam, Commvault, NetApp.
- Settings › Discovery: read-only collectors for 13 platforms + Terraform and Ansible, a tested normalizer and file import.
- Map and topology fill the screen.
- Themes: light *overworld* and dark *night-navy*; hidden easter egg.
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
