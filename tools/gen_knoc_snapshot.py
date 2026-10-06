# Orbinoc · Network Ops Console
# Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto)
# SPDX-License-Identifier: AGPL-3.0-or-later
#!/usr/bin/env python3
"""Synthetic KNOC snapshot for the fictional company "Contoso LATAM".
Every name, address, IP, phone number and vendor account below is invented.
Public IPs use the RFC 5737 documentation ranges (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24).
"""
import json, random, sys
random.seed(42)
AT = "2026-10-01T12:00:00Z"
SWEEP = "2026-10-01T11:45:00Z"
SWEEP_HOST = "NOC-WKS-01"

sites, nodes, links, status = {}, {}, {}, {}

def site(i, **kw):
    kw["id"] = i; kw.setdefault("conf", "F"); kw.setdefault("src", "Contoso LATAM site register (demo)"); sites[i] = kw

def node(i, **kw):
    kw["id"] = i; kw.setdefault("env", "prod"); kw.setdefault("conf", "F"); nodes[i] = kw; return i

def link(a, b, kind, label=""):
    lid = f"lk-{a}--{b}"; links[lid] = {"id": lid, "a": a, "b": b, "kind": kind, "label": label}

# ---------------------------------------------------------------- sites
SITES = [
 # id, country, name, city, kind, lat, lon, net, isp
 ("br-sp-hq", "BR", "São Paulo HQ + CPD", "São Paulo", "cpd", -23.59, -46.66, "10.10", "Carrier Alfa Fibra 500 Mbps + Carrier Beta 200 Mbps (SD-WAN)"),
 ("br-campinas", "BR", "Campinas Plant", "Campinas", "fabrica", -22.90, -47.06, "10.11", "Carrier Alfa Fibra 200 Mbps"),
 ("ar-bsas", "AR", "Buenos Aires Office", "Buenos Aires", "escritorio", -34.60, -58.38, "10.20", "Pampa Net 300 Mbps"),
 ("ar-pilar", "AR", "Pilar Plant", "Pilar", "fabrica", -34.46, -58.91, "10.21", "Pampa Net 100 Mbps"),
 ("co-bogota", "CO", "Bogotá Office", "Bogotá", "escritorio", 4.71, -74.07, "10.30", "Andina Fibra 200 Mbps"),
 ("pe-lima", "PE", "Lima Office", "Lima", "escritorio", -12.05, -77.04, "10.40", "Inca Link 100 Mbps"),
 ("cl-santiago", "CL", "Santiago Office", "Santiago", "escritorio", -33.45, -70.67, "10.50", "Cordillera Net 100 Mbps"),
 ("mx-cdmx", "MX", "Mexico City Office", "Ciudad de México", "escritorio", 19.43, -99.13, "10.60", "Azteca Datos 200 Mbps"),
 ("ec-quito", "EC", "Quito Office", "Quito", "escritorio", -0.18, -78.47, "10.70", "Equinoccio ISP 50 Mbps"),
 ("uy-mvd", "UY", "Montevideo Office", "Montevideo", "escritorio", -34.90, -56.16, "10.80", "Río Plata Net 100 Mbps"),
 ("ca-mtl", "CA", "Montréal Office", "Montréal", "escritorio", 45.50, -73.57, "10.90", "Maple Fibre 500 Mbps"),
]
for sid, cc, name, city, kind, lat, lon, net, isp in SITES:
    site(sid, country=cc, name=name, city=city, kind=kind, lat=lat, lon=lon, isp=isp,
         address=f"Demo address, {city}", legal=f"Contoso LATAM — {name}", state="", zip="",
         notes=f"Network {net}.0.0/16 · data is fictional (portfolio demo).")
site("cld-azure", country="CLD", name="Azure / M365 (Contoso tenant)", kind="cloud")

# ---------------------------------------------------------------- per-site edge
pub = iter(f"203.0.113.{i}" for i in range(10, 250, 7))
FW_MODEL = {"br-sp-hq": "FortiGate 200F", "br-campinas": "FortiGate 100F"}
for sid, cc, name, city, kind, lat, lon, net, isp in SITES:
    p = sid.split("-")[0].upper(); s = sid.split("-")[1].upper()
    carrier = isp.split(" ")[0] + " " + isp.split(" ")[1]
    ispn = node(f"isp-{sid}", country=cc, site=sid, type="isp", name=f"ISP-{p}-{s}", vendor=carrier,
                role=f"Internet link — {isp}", ip=next(pub))
    fw_model = FW_MODEL.get(sid, "FortiGate 60F" if kind == "escritorio" else "FortiGate 80F")
    fw1 = node(f"fw-{sid}-01", country=cc, site=sid, type="fw", name=f"FW-{p}-{s}-01", vendor="Fortinet",
               model=fw_model, version="FortiOS 7.4.4", ip=f"{net}.0.1", port=443, mgmtUrl=f"https://{net}.0.1",
               role="Edge firewall / SD-WAN")
    link(ispn, fw1, "wan", "WAN1")
    if sid in ("br-sp-hq", "ar-bsas", "ca-mtl"):
        fw2 = node(f"fw-{sid}-02", country=cc, site=sid, type="fw", name=f"FW-{p}-{s}-02", vendor="Fortinet",
                   model=fw_model, version="FortiOS 7.4.4", ip=f"{net}.0.2", role="HA secondary (A-P)")
        link(fw1, fw2, "ha", "FGCP A-P")
    sw = node(f"sw-{sid}-01", country=cc, site=sid, type="sw", name=f"SW-{p}-{s}-01", vendor="Fortinet",
              model="FortiSwitch 248E-FPOE", version="7.4.2", ip=f"{net}.0.10", role="Core / access switch (FortiLink)")
    link(fw1, sw, "lan", "FortiLink")
    ap = node(f"ap-{sid}-01", country=cc, site=sid, type="ap", name=f"AP-{p}-{s}-01", vendor="Fortinet",
              model="FortiAP 231F", version="7.4.3", ip=f"{net}.0.20", role="Wi-Fi 6 (802.11k/v, band steering)")
    link(sw, ap, "lan", "PoE")
    if sid != "br-sp-hq":
        link(fw1, "fw-br-sp-hq-01", "vpn", "IPsec hub-spoke")

# a second ISP at HQ (SD-WAN)
node("isp-br-sp-hq-b", country="BR", site="br-sp-hq", type="isp", name="ISP-BR-HQ-B", vendor="Carrier Beta",
     role="Second internet link (SD-WAN member)", ip="203.0.113.250")
link("isp-br-sp-hq-b", "fw-br-sp-hq-01", "wan", "WAN2")

# ---------------------------------------------------------------- HQ compute
HQ = "br-sp-hq"
for n, ver in ((1, "ESXi 7.0 U3"), (2, "ESXi 7.0 U3"), (3, "ESXi 6.7 U3")):
    h = node(f"esx-hq-0{n}", country="BR", site=HQ, type="hyp", name=f"ESX-HQ-0{n}", vendor="Dell",
             model="PowerEdge R740", version=ver, ip=f"10.10.1.2{n}", port=443, role="VMware host (cluster CL-HQ)")
    o = node(f"idrac-hq-0{n}", country="BR", site=HQ, type="oob", name=f"IDRAC-HQ-0{n}", vendor="Dell",
             model="iDRAC9", ip=f"10.10.100.2{n}", port=443, role="Out-of-band management")
    link(o, h, "oob")
    link("sw-br-sp-hq-01", h, "lan", "10G trunk")
VMS = [("vcsa-hq", "VCSA-HQ", "vCenter Server 7", "10.10.1.10", "VMware vCenter", 1),
       ("dc-hq-01", "DC-HQ-01", "Windows Server 2022", "10.10.1.11", "Domain controller / DNS / DHCP", 1),
       ("dc-hq-02", "DC-HQ-02", "Windows Server 2019", "10.10.1.12", "Domain controller / DNS", 2),
       ("erp-app-01", "ERP-APP-01", "Windows Server 2019", "10.10.1.30", "ERP application server", 2),
       ("file-hq-01", "FILE-HQ-01", "Windows Server 2022", "10.10.1.40", "File server (DFS)", 1),
       ("zbx-hq-01", "ZBX-HQ-01", "Oracle Linux 9", "10.10.1.25", "Zabbix server", 3),
       ("print-hq-01", "PRINT-HQ-01", "Windows Server 2016", "10.10.1.45", "Print server (legacy)", 3)]
for vid, nm, os_, ip, role, host in VMS:
    t = "mon" if vid.startswith("zbx") else "vm"
    node(vid, country="BR", site=HQ, type=t, name=nm, vendor="VMware" if vid != "zbx-hq-01" else "Zabbix",
         os=os_, ip=ip, role=role, model="VM")
    link(f"esx-hq-0{host}", vid, "host")
node("nas-hq-01", country="BR", site=HQ, type="stor", name="NAS-HQ-01", vendor="Synology", model="RS3621xs+",
     ip="10.10.1.50", port=5001, role="Backup repository (immutable snapshots)")
link("sw-br-sp-hq-01", "nas-hq-01", "lan")
node("ups-hq-01", country="BR", site=HQ, type="ups", name="UPS-HQ-01", vendor="APC", model="Smart-UPS SRT 10kVA",
     ip="10.10.100.40", role="CPD UPS")
node("env-hq-01", country="BR", site=HQ, type="sensor", name="ENV-HQ-01", vendor="Generic", model="Temp/humidity sensor",
     ip="10.10.100.41", role="CPD temperature monitor (5-min alerts)")
node("rtr-hq-01", country="BR", site=HQ, type="rtr", name="RTR-HQ-01", vendor="Cisco", model="ISR 4331", version="IOS-XE 17.9",
     ip="10.10.0.5", role="Legacy MPLS router (being retired)", conf="P")
link("rtr-hq-01", "fw-br-sp-hq-01", "lan")

# Argentina small compute
node("esx-ar-01", country="AR", site="ar-bsas", type="hyp", name="ESX-AR-01", vendor="HPE", model="ProLiant DL380 Gen10",
     version="ESXi 7.0 U3", ip="10.20.1.21", role="Local host")
node("dc-ar-01", country="AR", site="ar-bsas", type="vm", name="DC-AR-01", os="Windows Server 2022", ip="10.20.1.11",
     role="Domain controller (site)")
link("esx-ar-01", "dc-ar-01", "host"); link("sw-ar-bsas-01", "esx-ar-01", "lan")
node("srv-pilar-qa", country="AR", site="ar-pilar", type="srv", name="SRV-PILAR-QA", vendor="Dell", model="PowerEdge T440",
     os="Windows Server 2016", ip="10.21.1.30", role="Quality-lab application server", conf="P")
link("sw-ar-pilar-01", "srv-pilar-qa", "lan")

# ---------------------------------------------------------------- cloud
C = "cld-azure"
node("vpngw-az", country="CLD", site=C, type="isp", name="VPNGW-AZ-HUB", vendor="Microsoft", model="VPN Gateway VpnGw2AZ",
     ip="198.51.100.10", role="Azure hub VPN gateway (BGP to HQ)")
link("fw-br-sp-hq-01", "vpngw-az", "vpn", "IPsec + BGP")
node("dc-az-01", country="CLD", site=C, type="vm", name="DC-AZ-01", os="Windows Server 2022", ip="10.100.1.4",
     role="Domain controller in Azure (Arc-enabled)")
node("app-az-01", country="CLD", site=C, type="vm", name="APP-AZ-01", os="Windows Server 2022", ip="10.100.2.4",
     role="LATAM business apps")
link("vpngw-az", "dc-az-01", "lan"); link("vpngw-az", "app-az-01", "lan")
node("sbc-az-01", country="CLD", site=C, type="sbc", name="SBC-AZ-01", vendor="AudioCodes", model="Mediant VE",
     version="7.40A", ip="198.51.100.20", port=443, role="Teams Direct Routing SBC")
node("teams-dr", country="CLD", site=C, type="saas", name="TEAMS-DR", vendor="Microsoft", model="Teams Direct Routing",
     fqdn="sip.pstnhub.microsoft.com", port=5061, role="Microsoft SIP proxies")
link("sbc-az-01", "teams-dr", "sip", "TLS 5061")
node("entra", country="CLD", site=C, type="saas", name="ENTRA-ID", vendor="Microsoft", model="Entra ID P1",
     role="Identity, Conditional Access, Intune")
node("devops", country="CLD", site=C, type="saas", name="AZURE-DEVOPS", vendor="Microsoft", fqdn="dev.azure.com",
     mgmtUrl="https://dev.azure.com/", role="it.infra repository (scripts, docs, pipelines)")
node("law-siem", country="CLD", site=C, type="sec", name="LAW-SIEM", vendor="Microsoft", model="Log Analytics + Sentinel",
     role="SIEM workspace · MDR partner reads it")
node("coll-az-01", country="CLD", site=C, type="coll", name="COLL-AZ-01", vendor="Microsoft", os="Ubuntu 22.04",
     ip="10.100.3.4", role="Syslog/CEF collector (AMA + DCR)")
link("coll-az-01", "law-siem", "ama", "DCR syslog")
link("fw-br-sp-hq-01", "coll-az-01", "api", "syslog 514")
link("dc-az-01", "law-siem", "ama", "DCR windows events")

# ---------------------------------------------------------------- voice carriers (SIP peers)
for cc, carrier, ip, st in (("BR", "Carrier Voz Brasil", "192.0.2.10", "MIGRADO OK 10/Mar"),
                            ("AR", "Pampa Voz", "192.0.2.20", "MIGRADO OK 24/Mar"),
                            ("MX", "Azteca Voz", "192.0.2.30", "PENDENTE (janela 15/Out)"),
                            ("CA", "Maple Voice", "192.0.2.40", "MIGRADO OK 09/Abr")):
    sid = f"sip-{cc.lower()}"
    node(sid, country=cc, site={"BR": "br-sp-hq", "AR": "ar-bsas", "MX": "mx-cdmx", "CA": "ca-mtl"}[cc], type="isp", name=f"SIP-{cc}-{carrier.split()[0].upper()}", vendor=carrier, ip=ip,
         sipPort="5061", tags="sip-trunk", tstatus=st, role=f"SIP trunk peer — {carrier}")
    link("sbc-az-01", sid, "sip", "SIP trunk")

# ---------------------------------------------------------------- status sweep (deterministic)
down_ids = {"print-hq-01", "srv-pilar-qa", "rtr-hq-01", "ap-ec-quito-01", "env-hq-01"}
for nid, n in nodes.items():
    if not n.get("ip"):
        continue
    state = "down" if nid in down_ids else "up"
    status[nid] = {"id": nid, "at": SWEEP, "src": f"KNOC Sweep @{SWEEP_HOST}", "method": "tcp" if n.get("port") else "icmp",
                   "target": n["ip"], "state": state, "ms": None if state == "down" else random.randint(2, 140),
                   "error": "TimedOut" if state == "down" else None}
ups = sum(1 for s in status.values() if s["state"] == "up")
sweeps = [{"id": "sw-20261001-demo", "at": SWEEP, "host": SWEEP_HOST, "total": len(status), "up": ups,
           "down": len(status) - ups, "skipped": 0, "byId": None}]

# ---------------------------------------------------------------- partners (fictional carriers + real product vendors)
def partner(i, name, cat, cc, services, status_="ativo", conf="FATO", owner="Infra LATAM", portal="", monitor="", objective=""):
    return i, {"id": i, "name": name, "category": cat, "country": cc, "services": services, "status": status_,
               "confidence": conf, "owner": owner, "portal": portal, "monitor": monitor, "objective": objective or services,
               "account": "DEMO-" + i.upper()[:6], "support": f"support@{i}.example", "evidence": "Demo record", "notes": ""}
partners = dict([
 partner("carrier-alfa", "Carrier Alfa", "ISP", "BR", "Internet 500 Mbps HQ + Campinas", monitor="Monthly invoice; link SLA 99.5%"),
 partner("carrier-beta", "Carrier Beta", "ISP", "BR", "Second link HQ (SD-WAN)"),
 partner("pampa-net", "Pampa Net", "ISP", "AR", "Internet Buenos Aires + Pilar"),
 partner("andina-fibra", "Andina Fibra", "ISP", "CO", "Internet Bogotá"),
 partner("inca-link", "Inca Link", "ISP", "PE", "Internet Lima", "a confirmar", "PROVÁVEL"),
 partner("cordillera-net", "Cordillera Net", "ISP", "CL", "Internet Santiago"),
 partner("azteca-datos", "Azteca Datos", "ISP", "MX", "Internet CDMX"),
 partner("maple-fibre", "Maple Fibre", "ISP", "CA", "Internet Montréal"),
 partner("carrier-voz-br", "Carrier Voz Brasil", "Carrier SIP", "BR", "SIP trunk + DID range"),
 partner("pampa-voz", "Pampa Voz", "Carrier SIP", "AR", "SIP trunk"),
 partner("azteca-voz", "Azteca Voz", "Carrier SIP", "MX", "SIP trunk", "em implantação"),
 partner("maple-voice", "Maple Voice", "Carrier SIP", "CA", "SIP trunk + toll-free"),
 partner("fortinet", "Fortinet", "Segurança", "GLOBAL", "FortiGate / FortiSwitch / FortiAP + FortiCare", portal="https://support.fortinet.com"),
 partner("microsoft", "Microsoft", "Cloud/Hosting", "GLOBAL", "Azure, M365, Entra ID, Intune, Sentinel", portal="https://portal.azure.com"),
 partner("broadcom", "Broadcom (VMware)", "Software/Licença", "GLOBAL", "vSphere licensing", "a confirmar", "PROVÁVEL"),
 partner("audiocodes", "AudioCodes", "Telefonia", "GLOBAL", "Mediant VE SBC support"),
 partner("dell", "Dell Technologies", "Hardware", "LATAM", "PowerEdge warranty (ProSupport)"),
 partner("msp-latam", "Nimbus MSP", "MSP", "LATAM", "24x7 MDR / SOC on Sentinel"),
 partner("cabling-sp", "Cabos & Cia", "Consultoria", "BR", "Structured cabling projects", "encerrado"),
 partner("print-co", "PrintFlow", "Outro", "LATAM", "Managed print", "a confirmar", "HIPÓTESE"),
])

portals = {}
for i, (name, url, cc, method, data, prio) in enumerate([
  ("Azure portal", "https://portal.azure.com", "GLOBAL", "oauth", "Resources, Arc, Sentinel", 1),
  ("Entra admin center", "https://entra.microsoft.com", "GLOBAL", "oauth", "Identity, Conditional Access", 2),
  ("Intune admin center", "https://intune.microsoft.com", "GLOBAL", "browser", "Device compliance, baselines", 3),
  ("Microsoft 365 admin", "https://admin.microsoft.com", "GLOBAL", "browser", "Service Health, licenses", 4),
  ("Teams admin center", "https://admin.teams.microsoft.com", "GLOBAL", "browser", "Direct Routing, voice policies", 5),
  ("FortiCloud", "https://support.fortinet.com", "LATAM", "browser", "Serials, FortiCare, EOS dates", 6),
  ("Dell Support", "https://www.dell.com/support", "LATAM", "browser", "Warranty status", 7),
  ("Carrier Alfa portal", "https://portal.carrier-alfa.example", "BR", "browser", "Invoices, link tickets", 8)]):
    pid = "po-" + name.lower().replace(" ", "-")
    portals[pid] = {"id": pid, "name": name, "url": url, "country": cc, "method": method, "data": data, "prio": prio,
                    "owner": "Infra LATAM", "auto": "Manual", "discovery": "pendente" if i > 1 else "feito", "found": ""}

qlinks = {q[0]: {"id": q[0], "cat": "monitor", "title": q[1], "url": q[2], "note": q[3]} for q in [
  ("zbx", "Zabbix HQ", "https://zabbix.contoso.example", "Hosts, triggers, maps"),
  ("grafana", "Grafana", "https://grafana.contoso.example", "WAN latency dashboards"),
  ("sdp", "Service Desk", "https://servicedesk.contoso.example", "L1/L2/L3 queues"),
  ("faz", "FortiAnalyzer", "https://faz.contoso.example", "Firewall logs"),
  ("vcsa", "vCenter HQ", "https://vcsa-hq.contoso.example/ui/", "Cluster CL-HQ")]}

tuts = {
 "doc-dr": {"id": "doc-dr", "kind": "doc", "topic": "Telefonia", "title": "Plan Direct Routing", "note": "SBC FQDNs, ports and certificate",
            "url": "https://learn.microsoft.com/microsoftteams/direct-routing-plan"},
 "doc-sdwan": {"id": "doc-sdwan", "kind": "doc", "topic": "Rede", "title": "FortiGate SD-WAN", "note": "Members, SLA probes, rules",
               "url": "https://docs.fortinet.com/product/fortigate/7.4"},
 "doc-pcap": {"id": "doc-pcap", "kind": "doc", "topic": "Captura", "title": "Packet capture (diagnose sniffer)", "note": "Troubleshooting on FortiOS",
              "url": "https://docs.fortinet.com/product/fortigate/7.4"}}

risks = {}
for i, (sev, iso, desc, action) in enumerate([
  ("ALTO", "BR", "ESX-HQ-03 still on ESXi 6.7 (end of general support).", "Move VMs to hosts 01/02, upgrade or retire the host."),
  ("ALTO", "*", "No documented DR test for the ERP in the last 12 months.", "Run a restore test from NAS-HQ-01 and record RTO/RPO."),
  ("ALTO", "BR", "PRINT-HQ-01 on Windows Server 2016 and offline in the last sweep.", "Migrate to Universal Print or decommission."),
  ("MEDIO", "AR", "Pilar plant has a single ISP link.", "Quote a 4G/5G backup member for SD-WAN."),
  ("MEDIO", "EC", "Quito AP offline; no local hands.", "Remote power-cycle via PoE; ship a spare."),
  ("MEDIO", "*", "VPN access groups not reviewed this quarter (SOX).", "Run the quarterly access review and attach evidence."),
  ("MEDIO", "MX", "Mexico SIP trunk migration window still pending.", "Confirm window with carrier and prepare rollback."),
  ("MEDIO", "*", "Firmware drift: 3 FortiAPs below recommended build.", "Schedule upgrade in the next change window."),
  ("BAIXO", "BR", "Legacy MPLS router still in the HQ rack.", "Confirm no traffic and remove after 30 days."),
  ("BAIXO", "*", "Vendor contacts spread across mailboxes.", "Keep this partner register as the single source."),
  ("BAIXO", "CA", "Toll-free number routing not documented.", "Export Teams voice routes and document.")], 1):
    rid = f"K-{i:02d}"
    risks[rid] = {"id": rid, "sev": sev, "iso": iso, "desc": desc, "action": action, "impact": "", "owner": "Infra LATAM",
                  "src": "KNOC review (demo)", "status": "aberto"}

deadlines = {}
for i, (kind, cc, date, title, partner_, note, conf) in enumerate([
  ("contrato", "BR", "2026-11-30", "Carrier Alfa contract renewal", "carrier-alfa", "Renegotiate 500 Mbps → 1 Gbps", "F"),
  ("certificado", "*", "2026-10-28", "SBC TLS certificate expires", "audiocodes", "Renew public cert for sbc.contoso.example", "F"),
  ("EOS", "BR", "2026-12-31", "ESXi 6.7 host out of support window", "broadcom", "See risk K-01", "F"),
  ("contrato", "*", "2027-01-15", "FortiCare renewal (12 devices)", "fortinet", "Bundle UTP", "F"),
  ("domínio", "*", "2027-02-10", "contoso-latam.example domain renewal", "", "Auto-renew on", "P"),
  ("pagamento", "AR", "2026-10-20", "Pampa Net invoice due", "pampa-net", "Avoid suspension", "F"),
  ("contrato", "MX", "2026-10-15", "Azteca Voz go-live window", "azteca-voz", "Change approved by CAB", "P")], 1):
    did = f"dl-{i:02d}"
    deadlines[did] = {"id": did, "kind": kind, "country": cc, "date": date, "title": title, "partner": partner_,
                      "partnerName": partners.get(partner_, {}).get("name", ""), "note": note, "conf": conf,
                      "src": "Demo data", "status": "aberto"}

voice = {}
def v(i, **kw):
    kw["id"] = i; kw.setdefault("conf", "F"); kw.setdefault("src", "Voice CMDB (demo)"); voice[i] = kw
v("n-br-main", vkind="number", kind="principal", country="BR", number="+55 11 5555-0100", label="Main line São Paulo",
  carrier="Carrier Voz Brasil", routesTo="AA 'Contoso BR'", range="")
v("n-br-0800", vkind="number", kind="tollfree", country="BR", number="0800 000 0000", label="Customer service toll-free",
  carrier="Carrier Voz Brasil", routesTo="Call queue 'SAC'", range="")
v("n-ar-main", vkind="number", kind="principal", country="AR", number="+54 11 5555-0100", label="Main line Buenos Aires",
  carrier="Pampa Voz", routesTo="AA 'Contoso AR'", range="")
v("n-ca-dids", vkind="number", kind="did-range", country="CA", number="+1 514 555-0100..0149", count=50,
  range="+1 514 555 0100–0149", label="Montréal DID block", carrier="Maple Voice", routesTo="SBC-AZ-01")
v("n-mx-main", vkind="number", kind="principal", country="MX", number="+52 55 5555 0100", label="Main line CDMX",
  carrier="Azteca Voz", routesTo="(pending migration)", conf="P", range="")
for cc, lang in (("BR", "pt"), ("AR", "es/en"), ("CA", "fr/en"), ("CO", "es")):
    v(f"i-{cc.lower()}-ivr", vkind="ivr", type="auto-attendant", country=cc, name=f"IVR Contoso {cc}", language=lang,
      hours="Mon–Fri 08:00–18:00", holidays="National calendar", menu="1 → Sales · 2 → Support · 0 → Reception",
      number={"BR": "+55 11 5555-0100", "AR": "+54 11 5555-0100", "CA": "+1 514 555-0100", "CO": "+57 1 555 0100"}[cc], routesTo="")
for cc, carrier in (("BR", "Carrier Voz Brasil"), ("AR", "Pampa Voz"), ("MX", "Azteca Voz"), ("CA", "Maple Voice")):
    v(f"t-{cc.lower()}", vkind="trunk", country=cc, carrier=carrier,
      detail=f"PSTN gateway sbc.contoso.example ↔ {carrier} (TLS/SRTP)")
v("d-dp-latam", vkind="dialplan", kind="tenant-dialplan", country="*", name="DP-LATAM",
  detail="Normalization rules for 9 countries (E.164)")
v("d-ovrp", vkind="dialplan", kind="voice-routing-policy", country="*", name="OVRP-LATAM-INTL",
  detail="International calling allowed for approved users only")
v("d-cid", vkind="dialplan", kind="caller-id", country="CA", name="Caller ID on SBC",
  detail="Carrier cannot change CLID; set on SBC (P-Asserted-Identity)")

config = {"id": "main", "at": "2026-10-01", "devopsOrg": "contoso-infra", "tenantDomain": "contoso-latam.example",
          "sitesGaps": ["Peru: ISP contract number not on file (demo gap).", "Quito: no local hands for hardware swaps."],
          "voiceGaps": ["Export Teams voice routes for MX after migration."]}

snap = {"deadlines": deadlines, "links": links, "nodes": nodes, "partners": partners, "portals": portals, "qlinks": qlinks,
        "risks": risks, "sites": sites, "status": status, "tuts": tuts, "voice": voice, "config": config, "sweeps": sweeps, "at": AT}
json.dump(snap, sys.stdout, ensure_ascii=False)
