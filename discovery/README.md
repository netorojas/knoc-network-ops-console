# Orbinoc Discovery

Read-only collectors that inventory **any** environment — one country or the whole world — and turn it into one file Orbinoc can import.

```
platform CLI (read-only)  ──►  <platform>.raw.json  ──►  normalize.py  ──►  <platform>.orbinoc.json  ──►  Orbinoc › Settings › Discovery › Import
```

| Platform | Script | Read-only identity you need |
|---|---|---|
| AWS | `aws.sh` | Managed policy **ReadOnlyAccess** or **ViewOnlyAccess** (AWS SSO / profile) |
| Microsoft Azure | `azure.sh` | **Reader** on subscriptions or a management group (Azure Resource Graph) |
| Google Cloud | `gcp.sh` | **roles/cloudasset.viewer** on org / folder / project (Cloud Asset Inventory) |
| Oracle Cloud (OCI) | `oci.sh` | Policy `Allow group OrbinocReaders to inspect all-resources in tenancy` |
| IBM Cloud | `ibm.sh` | Platform **Viewer** + service **Reader** |
| VMware vSphere | `vsphere.ps1` | vCenter role **Read-only** (PowerCLI) |
| Proxmox VE | `proxmox.sh` | Role **PVEAuditor** |
| Microsoft Hyper-V | `hyperv.ps1` | Member of **Hyper-V Administrators** (only `Get-*` cmdlets are used) |
| Nutanix | `nutanix.sh` | Prism Central **Viewer** (v3 `vms/list`) |
| Kubernetes (EKS, AKS, GKE, OpenShift, RKE2, k3s) | `kubernetes.sh` | ClusterRole **view** |
| Docker | `docker.sh` | Access to `docker ps` on the host |
| Terraform | `terraform.sh` | Read access to the state (`terraform show -json` — no plan, no apply) |
| Ansible | `ansible.sh` | Any inventory (`ansible-inventory --list`) |

## Rules (non-negotiable)

- **Read-only.** No script creates, changes or deletes anything. Every command is a `list`, `describe`, `get`, `search` or `show`.
- **No secrets.** Passwords are asked interactively (PowerShell `Get-Credential`, `curl -u`) and never written to disk. Key Vault / Secrets Manager / Secret Manager are listed by **name only**; values are never read.
- **No credentials in files.** Use your CLI login (SSO, managed identity, profile). Variables to edit are marked `ALTERE AQUI`.

## Try it without any cloud account

```bash
python3 discovery/normalize.py aws discovery/fixtures/aws.raw.json > /tmp/aws.orbinoc.json
```

Or import `discovery/sample-import.orbinoc.json` in the demo (Settings › Discovery › Import file) and watch new regions appear on the map.

## Output schema `orbinoc-discovery/1`

```json
{ "schema": "orbinoc-discovery/1", "source": "aws", "generatedAt": "2026-10-07T12:00:00Z",
  "sites": [{ "id": "aws-sa-east-1", "name": "AWS · sa-east-1 (São Paulo)", "kind": "cloud", "country": "BR", "lat": -23.5, "lon": -46.6 }],
  "nodes": [{ "id": "i-01", "name": "web-01", "type": "vm", "site": "aws-sa-east-1", "country": "BR", "vendor": "AWS", "ip": "10.20.1.5" }],
  "links": [{ "a": "i-01", "b": "vpc-0a1", "kind": "host" }] }
```

Types: `fw sw ap rtr isp srv vm hyp k8s ctr fn app bot db obj bkp dr kv lb vnet vpngw cdn apigw iac saas mon sec stor`.

## Test status

| Piece | Status |
|---|---|
| `normalize.py` | Tested with the fixtures in `fixtures/` (all 11 parsers). |
| `*.sh` | Syntax-checked (`bash -n`). Not run against live accounts in this repo. |
| `*.ps1` | Reviewed. Not executed here. |

Run them first in a lab or a non-production subscription and read the output before importing.
