# Changelog

All notable changes to Orbiscale (formerly KNOC). Format: [Keep a Changelog](https://keepachangelog.com/), versions follow SemVer.

## [5.1.0] - 2026-10-07
### Added
- **Management** group in the left menu: FinOps and a new **Resource costs** screen (filter by origin, family, owner and tag; sort; CSV export; hidden for the Analyst persona).
- **Work pins** on the map and a **work guide** drawer: origin, owner, suggested next steps, affected inventory (with published versions), security risks at the same place, cost of affected resources, and a link to the inventory filtered to exactly those assets.
- New icon system: one glyph per asset type and one frame shape per family (network hexagon, security shield, compute square, data circle, operations diamond) plus an origin badge for cloud resources; cloud markers get a provider ring.
- **View preferences** for the map (work pins, WAN lines, names, soft focus, animations, compact cards, relief/flat/contrast style) and the topology (IP, origin badge, focus, animations).
- Multi-vendor demo estate: Cisco (Catalyst, Meraki, ISR, Secure Firewall), Juniper (EX, QFX, SRX, MX, Mist), HPE Aruba (CX, APs), Palo Alto, Unify OpenScape, NetApp, SUSE Rancher, HPE ProLiant; latest published version, end of support and licence dates (fictional).
### Changed
- Performance: during zoom/pan the map and topology move as one GPU layer and redraw once when you stop; cards only follow their anchors while moving; map items are memoised; no live blur over the map; the inventory paints the first 50 rows first; search inputs are debounced.
- Calm visuals: alert pulse grows with the marker instead of the map units (no more giant red rings when zoomed in), land and markers fade instead of jumping, soft focus on the clicked item.

## [5.0.0] - 2026-10-08
### Added
- Origin badge (on-prem, Azure, AWS, Google Cloud, Oracle, IBM, SaaS) on map cards and every v5 table.
- Cloud & Tenants: multicloud overview per provider, network design (gateways/VPNs per cloud) and NSG / security group / security list / VPC firewall rules. More demo resources: NSGs, Azure Firewall, VPN/Transit gateways, subnets, Blob/GCS buckets, Microsoft Fabric, compute.
- Topology views per cloud provider.
- **Demands**: where tickets, projects, e-mails, meetings, Teams threads, changes and alerts are born and which site/resource they live on; channel filter, hotspots, load per analyst (generated avatars), links to the map, topology and Infra Backlog (`?dem=<ID>` deep link).
- Security findings from discovery with a simulated ITSM ticket / Teams post draft (nothing is sent).
- **FinOps** (Enterprise module): cost by cloud/region/site/resource, 12-month trend, budget, untagged resources, savings recommendations; persona views (Executive, Manager, Coordinator, Analyst).
- Splash screen and a loading veil for heavy views.
### Changed
- New default palette **Executive** (blue and teal on neutral surfaces). Ember/Grove stays available.
- Map legend: "Cloud (multicloud)". Map redraws are coalesced per frame; topology text fitting uses canvas measurement (≈8× faster).

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
