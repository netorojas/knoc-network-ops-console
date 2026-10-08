# Benchmark · performance and where Orbiscale sits in the market

## 1 · Performance (measured)

Headless Chromium, CPU throttled 4×, no GPU, global scenario (35 sites, 245 assets). Scripts live outside the public repo; numbers are from the 5.1 work.

| Interaction | Before (5.0) | After (5.1+) |
|---|---|---|
| Map zoom/pan · janky frames (> 50 ms) | 31 | 5 |
| Map zoom/pan · p95 frame time | 117 ms | 33 ms |
| Inventory · first rows painted | whole table at once | first 50 rows, rest after 160 ms |
| Search inputs | every keystroke | debounced (140–300 ms) |

What changed: during zoom/pan the map and the topology move as one GPU layer and redraw once when you stop; map items are memoised; no live blur over the map.

Known limit: topology wheel-zoom still drops frames in headless software rendering; on a laptop GPU it should be smooth. Help us confirm with a real-device trace.

Regression suite for 5.3: 23 Orbiscale screens × 3 languages × 3 scenarios, plus 9 Flow screens × 3 languages and the settings sheets, with zero render errors.

## 2 · Market positioning (categories, not a feature audit)

Orbiscale is a portfolio project, not a commercial product. The table compares **categories of tools** a team usually combines; product names are examples of each category.

| Need | Typical tool category (examples) | Orbiscale approach |
|---|---|---|
| Network map and inventory | Network discovery/IPAM/CMDB (e.g. Auvik, NetBox, Device42) | Map + topology + inventory from read-only discovery scripts, on-prem and 5 clouds side by side |
| Cloud cost | FinOps platforms (e.g. Apptio Cloudability, Flexera, Vantage) | Cost per cloud/site/resource with role-based views; demo data only |
| Security posture | CNAPP/CSPM + vulnerability scanners (e.g. Defender for Cloud, Security Hub, Tenable) | Reads findings from those tools and adds *where it lives* and *how to act* |
| Work intake | ITSM (e.g. ServiceNow, Jira Service Management, ManageEngine) | Shows where work is born and which site it affects; drafts tickets, never writes without review |
| Team board | Kanban / ops boards | Orbiscale Flow: self-updating board with evidence labels |
| Access | IAM / PIM (e.g. Entra ID PIM) | Module permissions per group plus time-boxed elevation, modelled on PIM |

**The differentiator is the join, not any single screen:** one place where an asset, the work about it, its risk, its cost and who may see it meet. The trade-off is depth: each specialised tool goes much deeper in its own category.
