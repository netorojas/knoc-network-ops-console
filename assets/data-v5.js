/*!
 * Orbiscale · v5 demo data (multicloud resources, network security, costs, demands, findings)
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). SPDX-License-Identifier: AGPL-3.0-or-later
 * Fictional company "Contoso Global". Every resource, address, person, ticket and price is invented.
 */
(function () {
  var S = window.KNOC_SNAPSHOT; if (!S || !S.nodes || !S.sites) return;
  var N = S.nodes, ST = S.status || (S.status = {}), LK = S.links || (S.links = {}), now = new Date().toISOString();

  /* ---------- provider normalisation ---------- */
  if (S.sites['cld-azure']) { S.sites['cld-azure'].provider = 'Microsoft Azure'; S.sites['cld-azure'].short = 'Azure Global'; }
  if (S.sites['cld-devops']) S.sites['cld-devops'].provider = 'SaaS';
  if (S.sites['br-azure-msp']) S.sites['br-azure-msp'].provider = 'Microsoft Azure';

  /* ---------- helpers ---------- */
  var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function add(site, id, type, name, role, x) {
    var s = S.sites[site]; if (!s || N[id]) return;
    var n = { id: id, site: site, type: type, name: name, role: role, country: s.country, vendor: s.provider || 'Microsoft Azure', env: 'prod', conf: 'F', src: 'Orbiscale Discovery (read-only, demo)', tags: 'multicloud,v5' };
    for (var k in x) n[k] = x[k];
    N[id] = n;
    ST[id] = { id: id, at: now, src: 'Orbiscale Discovery · cloud API', method: 'api', target: n.fqdn || n.ip || name, state: x && x._st || 'up', ms: 40 + Math.round(rnd() * 90), error: null };
    delete n._st;
    if (x && x.link) { var l = 'lk-' + id + '--' + x.link; LK[l] = { id: l, a: id, b: x.link, kind: x.lk || 'host', label: x.ll || '' }; delete n.link; delete n.lk; delete n.ll; }
  }
  function vnetOf(site) { for (var k in N) if (N[k].site === site && N[k].type === 'vnet') return k; return null; }

  /* ---------- network security, gateways, subnets, storage, Fabric, compute ---------- */
  var R = function (p, d, port, src, act, note) { return { pri: p, dir: d, port: port, src: src, act: act, note: note || '' }; };
  var DEF = [
    { s: 'cld-azure', id: 'nsg-az-hub', t: 'nsg', n: 'nsg-hub-snet-mgmt', r: 'NSG · management subnet (hub)', rules: [R(100, 'in', '443', 'AzureFrontDoor.Backend', 'allow'), R(110, 'in', '3389', '10.10.0.0/16 (HQ via VPN)', 'allow'), R(4096, 'in', '*', '*', 'deny')] },
    { s: 'cld-azure', id: 'kv-az-hub', t: 'kv', n: 'kv-hub-contoso', r: 'Key Vault · RBAC · purge protection ON' },
    { s: 'cld-azure', id: 'st-az-diag', t: 'obj', n: 'stcontosodiag (Blob)', r: 'Storage account · Blob · diagnostics & flow logs', fqdn: 'stcontosodiag.blob.cloud.example' },
    { s: 'cld-azure', id: 'fabric-az', t: 'db', n: 'Microsoft Fabric F64 · OneLake', r: 'Fabric capacity · Lakehouse + Power BI (finance & ops)', fqdn: 'fabric-contoso.cloud.example', tags: 'multicloud,v5,fabric' },
    { s: 'cld-azure', id: 'vm-az-jump', t: 'vm', n: 'VM-AZ-JUMP-01', r: 'Jump box · Bastion only (B2s)', ip: '10.100.9.4' },

    { s: 'aws-use1', id: 'sg-aws-api', t: 'nsg', n: 'sg-api-tier', r: 'Security group · API tier', link: 'vpc-aws-use1-prod', rules: [R(1, 'in', '443', 'alb-api', 'allow'), R(2, 'in', '22', '0.0.0.0/0', 'allow', 'FINDING · SSH open to the internet'), R(3, 'out', '*', '0.0.0.0/0', 'allow')] },
    { s: 'aws-use1', id: 'sg-aws-db', t: 'nsg', n: 'sg-rds-orders', r: 'Security group · database', link: 'vpc-aws-use1-prod', rules: [R(1, 'in', '5432', 'sg-api-tier', 'allow'), R(2, 'in', '*', '*', 'deny')] },
    { s: 'aws-use1', id: 'tgw-aws-vpn', t: 'vpngw', n: 'tgw-vpn-hq', r: 'Transit Gateway VPN · 2 tunnels to HQ (BGP)', link: 'vpc-aws-use1-prod', lk: 'vpn', ip: '198.51.100.60' },
    { s: 'aws-use1', id: 'sub-aws-priv-a', t: 'sub', n: 'subnet-private-a (10.60.1.0/24)', r: 'Private subnet · us-east-1a', link: 'vpc-aws-use1-prod' },
    { s: 'aws-use1', id: 'ec2-aws-bastion', t: 'vm', n: 'ec2-bastion-legacy', r: 'EC2 t3.large · 0.4% CPU in 30 days', ip: '10.60.9.10', link: 'vpc-aws-use1-prod', _st: 'deg' },
    { s: 'aws-use1', id: 'ebs-aws-orphan', t: 'stor', n: 'ebs-unattached (6 volumes)', r: 'EBS gp3 · 1.2 TB not attached to any instance', link: 'vpc-aws-use1-prod' },
    { s: 'aws-euc1', id: 'sg-aws-eu', t: 'nsg', n: 'sg-gdpr-workloads', r: 'Security group · EU workloads', link: 'vpc-aws-euc1-prod', rules: [R(1, 'in', '443', '10.0.0.0/8', 'allow'), R(2, 'in', '*', '*', 'deny')] },
    { s: 'aws-euc1', id: 'ec2-aws-gdpr', t: 'vm', n: 'ec2-gdpr-01', r: 'EC2 m7i.large · DPO portal', ip: '10.61.1.10', link: 'vpc-aws-euc1-prod' },

    { s: 'az-weu', id: 'nsg-az-weu', t: 'nsg', n: 'nsg-snet-aks-weu', r: 'NSG · AKS subnet', rules: [R(100, 'in', '443', 'AzureFrontDoor.Backend', 'allow'), R(200, 'in', '10250', 'VirtualNetwork', 'allow'), R(4096, 'in', '*', '*', 'deny')] },
    { s: 'az-weu', id: 'afw-az-weu', t: 'afw', n: 'afw-hub-weu', r: 'Azure Firewall Premium · IDPS alert mode' },
    { s: 'az-weu', id: 'vpngw-az-weu', t: 'vpngw', n: 'vpngw-weu', r: 'VPN Gateway VpnGw2AZ · to Frankfurt DC', lk: 'vpn', ip: '198.51.100.70' },
    { s: 'az-weu', id: 'sub-az-aks', t: 'sub', n: 'snet-aks (10.120.4.0/22)', r: 'Subnet · AKS nodes' },
    { s: 'az-weu', id: 'st-az-weu', t: 'obj', n: 'stweuportal (Blob)', r: 'Storage account · Blob · public access ENABLED', fqdn: 'stweuportal.blob.cloud.example', _st: 'deg' },
    { s: 'az-weu', id: 'vm-az-weu-sql', t: 'vm', n: 'vm-sqlmi-test-weu', r: 'D16s v5 · test environment running 24×7', ip: '10.120.8.4' },
    { s: 'az-eus2', id: 'nsg-az-eus2', t: 'nsg', n: 'nsg-dr-eus2', r: 'NSG · DR landing zone', rules: [R(100, 'in', '443', 'VirtualNetwork', 'allow'), R(4096, 'in', '*', '*', 'deny')] },
    { s: 'az-eus2', id: 'vm-az-eus2-dr', t: 'vm', n: 'vm-dr-standby-01', r: 'B4ms · DR standby (deallocated off-test)', ip: '10.130.1.4' },

    { s: 'gcp-euw1', id: 'fw-gcp-euw1', t: 'nsg', n: 'vpc-fw-analytics', r: 'VPC firewall rules', link: 'vpc-gcp-euw1', rules: [R(1000, 'in', '443', 'Cloud Load Balancing', 'allow'), R(1100, 'in', '22', 'Google IAP range', 'allow'), R(65535, 'in', '*', '*', 'deny')] },
    { s: 'gcp-euw1', id: 'gcs-gcp-euw1', t: 'obj', n: 'gs://contoso-analytics-raw', r: 'Cloud Storage · uniform access', link: 'vpc-gcp-euw1' },
    { s: 'gcp-euw1', id: 'gce-gcp-euw1', t: 'vm', n: 'gce-etl-01', r: 'Compute Engine n2-standard-8', ip: '10.70.1.5', link: 'vpc-gcp-euw1' },
    { s: 'gcp-ase2', id: 'fw-gcp-ase2', t: 'nsg', n: 'vpc-fw-apac', r: 'VPC firewall rules · APAC', rules: [R(1000, 'in', '443', '0.0.0.0/0', 'allow'), R(65535, 'in', '*', '*', 'deny')] },
    { s: 'gcp-ase2', id: 'gcs-gcp-ase2', t: 'obj', n: 'gs://contoso-apac-assets', r: 'Cloud Storage · static assets' },

    { s: 'oci-gru', id: 'sl-oci-erp', t: 'nsg', n: 'seclist-erp-app', r: 'Security list · ERP subnet', link: 'vcn-oci-gru', rules: [R(1, 'in', '443', '10.10.0.0/16', 'allow'), R(2, 'in', '3389', '0.0.0.0/0', 'allow', 'FINDING · RDP open to the internet'), R(3, 'in', '*', '*', 'deny')] },
    { s: 'oci-gru', id: 'drg-oci', t: 'vpngw', n: 'drg-fastconnect', r: 'DRG · FastConnect 1 Gbps + IPSec backup', link: 'vcn-oci-gru', lk: 'vpn', ip: '198.51.100.80' },
    { s: 'oci-gru', id: 'lb-oci-erp', t: 'lb', n: 'lb-erp-web', r: 'Flexible Load Balancer', link: 'vcn-oci-gru' },

    { s: 'ibm-eude', id: 'sg-ibm', t: 'nsg', n: 'sg-integration', r: 'VPC security group', link: 'vpc-ibm-eude', rules: [R(1, 'in', '443', '10.0.0.0/8', 'allow'), R(2, 'in', '*', '*', 'deny')] },
    { s: 'ibm-eude', id: 'vsi-ibm', t: 'vm', n: 'vsi-mq-gateway-01', r: 'Virtual Server bx2-4x16 · MQ gateway', ip: '10.80.1.10', link: 'vpc-ibm-eude' },
    { s: 'ibm-eude', id: 'tgw-ibm', t: 'vpngw', n: 'transit-gw-eu', r: 'Transit Gateway + Direct Link to Frankfurt DC', link: 'vpc-ibm-eude', lk: 'vpn' }
  ];
  DEF.forEach(function (d) {
    var x = { rules: d.rules, ip: d.ip, fqdn: d.fqdn, _st: d._st, lk: d.lk };
    if (d.tags) x.tags = d.tags;
    var v = d.link || vnetOf(d.s); if (v && N[v]) x.link = v;
    if (!x.fqdn && !x.ip) x.fqdn = d.id + '.cloud.example';
    add(d.s, d.id, d.t, d.n, d.r, x);
  });

  /* ---------- monthly cost per resource (USD) ---------- */
  var BASE = { vm: 310, k8s: 2600, db: 1450, obj: 220, kv: 18, nsg: 0, afw: 1180, vpngw: 380, sub: 0, vnet: 45, lb: 95, fn: 60, app: 290, bot: 520, bkp: 340, dr: 610, cdn: 180, apigw: 700, stor: 130, sbc: 640, sec: 2100, coll: 160, isp: 420, saas: 900, iac: 350, mon: 1600, hyp: 280, fw: 210 };
  var FIX = { 'fabric-az': 8400, 'eks-aws-use1-prod': 6200, 'ebs-aws-orphan': 118, 'ec2-aws-bastion': 61, 'vm-az-weu-sql': 1120, 'adb-oci-gru': 3900, 'bq-gcp-euw1': 2300, 'law-siem': 3200 };
  Object.keys(N).forEach(function (k) {
    var n = N[k], s = S.sites[n.site] || {}, b = FIX[k] != null ? FIX[k] : BASE[n.type];
    if (b == null) return;
    if (s.kind !== 'cloud' && ['isp', 'hyp', 'fw', 'sbc'].indexOf(n.type) < 0) return;
    n.cost = FIX[k] != null ? b : Math.round(b * (0.7 + rnd() * 0.7));
    n.tagged = rnd() > 0.18; // cost-allocation tags present
    n.costOwner = ['Infra', 'Apps', 'Data', 'Security', 'Finance'][Math.floor(rnd() * 5)];
  });

  /* ---------- demands: where work is born and where it lives ---------- */
  var P = ['alex', 'diego', 'carla', 'elena', 'fabio', 'gabriel', 'helena', 'igor', 'julia', 'kiran'];
  window.ORB_V5 = {
    people: { alex: 'Alex R. (lead)', diego: 'Diego V.', carla: 'Carla M.', elena: 'Elena S.', fabio: 'Fábio T.', gabriel: 'Gabriel O.', helena: 'Helena P.', igor: 'Igor K.', julia: 'Júlia N.', kiran: 'Kiran D.' },
    demands: [
      { id: 'NET-04', ch: 'alert', origin: 'Zabbix · SLA probe', site: 'br-sp-hq', node: 'isp-br-sp-hq', who: 'alex', sev: 'P0', age: 0, st: 'doing', t: 'HQ link B with 4% packet loss — SD-WAN holding on link A', bl: 'NET-04' },
      { id: 'SEC-01', ch: 'teams', origin: 'Teams · #infra-latam', site: 'cld-azure', node: 'sbc-az-01', who: 'alex', sev: 'P0', age: 3, st: 'open', t: 'SBC TLS certificate expires in 23 days, renewal has no owner', bl: 'SEC-01' },
      { id: 'GOV-02', ch: 'meeting', origin: 'Daily 06/10 · Facilitator notes', site: 'br-sp-hq', who: 'diego', sev: 'P0', age: 0, st: 'open', t: 'Quarterly VPN access review (SOX) due today', bl: 'GOV-02' },
      { id: 'TKT-07', ch: 'ticket', origin: 'ITSM · Global support queue', site: 'ca-mtl', who: 'kiran', sev: 'P1', age: 9, st: 'blocked', t: '20 Canada tickets stuck in the global support queue', bl: 'TKT-07' },
      { id: 'SEC-05', ch: 'email', origin: 'E-mail · MSP Nimbus', site: 'ar-bsas', who: 'elena', sev: 'P1', age: 6, st: 'doing', t: 'Argentina FortiGates still not sending syslog to the SIEM', bl: 'SEC-05' },
      { id: 'SRV-02', ch: 'email', origin: 'E-mail · Dell renewals', site: 'br-sp-hq', who: 'alex', sev: 'P1', age: 12, st: 'open', t: 'Warranty of 2 ESXi hosts ends in December — quote pending', bl: 'SRV-02' },
      { id: 'APP-04', ch: 'ticket', origin: 'ITSM · Licensing', site: 'mx-cdmx', who: 'diego', sev: 'P1', age: 15, st: 'open', t: 'Licences bought outside the IT process in Mexico', bl: 'APP-04' },
      { id: 'CLD-02', ch: 'project', origin: 'Project · Arc onboarding', site: 'cld-azure', who: 'carla', sev: 'P1', age: 21, st: 'doing', t: 'Azure Arc onboarding: 6 of 14 servers pending', bl: 'CLD-02' },
      { id: 'OPS-07', ch: 'alert', origin: 'Orbiscale Sweep', site: 'br-sp-hq', who: 'igor', sev: 'P1', age: 1, st: 'open', t: 'HQ print server down in the last sweep', bl: 'OPS-07' },
      { id: 'NET-09', ch: 'email', origin: 'E-mail · Finance AP', site: 'pe-lima', who: 'fabio', sev: 'P2', age: 4, st: 'open', t: 'Lima link invoice above the contract value', bl: 'NET-09' },
      { id: 'VOZ-03', ch: 'change', origin: 'CAB · RFC-2214', site: 'mx-cdmx', who: 'helena', sev: 'P1', age: 2, st: 'open', t: 'Mexico SIP trunk migration on 15/10 without rollback plan', bl: 'VOZ-03' },
      { id: 'END-02', ch: 'project', origin: 'Project · Edge baseline', site: 'co-bogota', who: 'julia', sev: 'P2', age: 30, st: 'doing', t: 'Edge baseline in 9 countries — 96% compliant', bl: 'END-02' },
      { id: 'HW-11', ch: 'ticket', origin: 'ITSM · Hardware', site: 'ar-bsas', who: 'gabriel', sev: 'P2', age: 5, st: 'blocked', t: 'Disk swap on the Buenos Aires host waiting for the part', bl: 'HW-11' },
      { id: 'ONB-04', ch: 'teams', origin: 'Teams · HR onboarding', site: 'uy-mvd', who: 'carla', sev: 'P2', age: 2, st: 'open', t: '3 people starting in Montevideo on Monday', bl: 'ONB-04' },
      { id: 'GOV-01', ch: 'meeting', origin: 'Weekly Mini-CAB', site: 'br-sp-hq', who: 'diego', sev: 'P2', age: 8, st: 'open', t: 'Weekly Mini-CAB proposal waiting for management approval', bl: 'GOV-01' },
      { id: 'MON-01', ch: 'ticket', origin: 'ITSM · Service Health', site: 'cld-azure', who: 'alex', sev: 'P2', age: 11, st: 'doing', t: 'Automatic Service Health notices removed from the L2 queue', bl: 'MON-01' },
      { id: 'CLD-11', ch: 'project', origin: 'Project · EU landing zone', site: 'az-weu', who: 'carla', sev: 'P1', age: 18, st: 'doing', t: 'AKS upgrade 1.30 → 1.31 in West Europe' },
      { id: 'CLD-14', ch: 'teams', origin: 'Teams · #cloud-ops', site: 'aws-use1', who: 'igor', sev: 'P1', age: 1, st: 'open', t: 'EKS node group at 88% memory during the nightly ETL' },
      { id: 'CLD-15', ch: 'email', origin: 'E-mail · Oracle support', site: 'oci-gru', who: 'fabio', sev: 'P2', age: 7, st: 'open', t: 'Autonomous Database patch window proposal for the ERP' },
      { id: 'CLD-16', ch: 'meeting', origin: 'Architecture review 03/10', site: 'ibm-eude', who: 'elena', sev: 'P2', age: 3, st: 'open', t: 'Decide MQ gateway HA design on IBM Cloud' },
      { id: 'CLD-17', ch: 'ticket', origin: 'ITSM · Data platform', site: 'gcp-euw1', who: 'julia', sev: 'P2', age: 6, st: 'doing', t: 'BigQuery slot reservations for month-end reports' },
      { id: 'NET-21', ch: 'change', origin: 'CAB · RFC-2230', site: 'de-frankfurt', who: 'gabriel', sev: 'P1', age: 1, st: 'open', t: 'Frankfurt DC core switch firmware upgrade' },
      { id: 'NET-22', ch: 'alert', origin: 'FortiAnalyzer', site: 'sg-singapore', who: 'kiran', sev: 'P1', age: 0, st: 'doing', t: 'Singapore hub IPSec flapping to Hong Kong' },
      { id: 'OPS-12', ch: 'email', origin: 'E-mail · Facilities London', site: 'gb-london', who: 'helena', sev: 'P2', age: 4, st: 'open', t: 'UPS battery replacement needs a maintenance window' },
      { id: 'OPS-13', ch: 'teams', origin: 'Teams · #us-office', site: 'us-austin', who: 'igor', sev: 'P2', age: 2, st: 'open', t: 'Austin meeting rooms dropping Wi-Fi on the 3rd floor' },
      { id: 'PRJ-30', ch: 'project', origin: 'Project · SD-WAN APAC', site: 'jp-tokyo', who: 'kiran', sev: 'P2', age: 40, st: 'doing', t: 'SD-WAN rollout APAC: Tokyo and Sydney left' }
    ],
    findings: [
      { id: 'F-01', sev: 'crit', node: 'sg-aws-api', site: 'aws-use1', ctl: 'Network · SSH from 0.0.0.0/0', fix: 'Restrict port 22 to the bastion / SSM Session Manager and remove the internet rule.', q: 'ITSM · Cloud Security', tm: 'Teams · #sec-cloud' },
      { id: 'F-02', sev: 'crit', node: 'sl-oci-erp', site: 'oci-gru', ctl: 'Network · RDP from 0.0.0.0/0', fix: 'Remove the internet RDP rule; use OCI Bastion with time-boxed sessions.', q: 'ITSM · Cloud Security', tm: 'Teams · #sec-cloud' },
      { id: 'F-03', sev: 'high', node: 'st-az-weu', site: 'az-weu', ctl: 'Storage · public blob access enabled', fix: 'Disable anonymous blob access on the account; serve assets via Front Door with private origin.', q: 'ITSM · Cloud Security', tm: 'Teams · #sec-cloud' },
      { id: 'F-04', sev: 'high', node: 'fw-br-sp-hq-01', site: 'br-sp-hq', ctl: 'Firmware below the approved baseline', fix: 'Schedule a CAB change to move to the approved FortiOS baseline with HA failover test.', q: 'ITSM · Network', tm: 'Teams · #infra-latam' },
      { id: 'F-05', sev: 'med', node: 'kv-az-weu-prod', site: 'az-weu', ctl: 'Key Vault · diagnostic logs not sent to SIEM', fix: 'Add a diagnostic setting to the SIEM workspace (AuditEvent).', q: 'ITSM · Security Ops', tm: 'Teams · #soc' },
      { id: 'F-06', sev: 'med', node: 'gke-gcp-ase2', site: 'gcp-ase2', ctl: 'Kubernetes · control plane open to all networks', fix: 'Enable authorised networks or private endpoint for the GKE control plane.', q: 'ITSM · Platform', tm: 'Teams · #cloud-ops' },
      { id: 'F-07', sev: 'med', node: 'ec2-aws-bastion', site: 'aws-use1', ctl: 'Unused instance with public IP', fix: 'Stop and snapshot, then delete after 30 days (also saves cost).', q: 'ITSM · Cloud Ops', tm: 'Teams · #cloud-ops' },
      { id: 'F-08', sev: 'low', node: 'cos-ibm-eude', site: 'ibm-eude', ctl: 'Object storage · no retention policy', fix: 'Apply an immutable retention policy aligned with the backup standard.', q: 'ITSM · Backup', tm: 'Teams · #infra-latam' }
    ],
    /* last 12 months, total cloud + connectivity spend (USD) with per-provider share */
    months: ['2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10'],
    trend: {
      'Microsoft Azure': [21800, 22400, 23100, 23900, 24600, 25200, 26800, 27400, 28100, 28900, 29600, 30100],
      'AWS':             [14200, 14600, 15100, 15800, 16900, 17200, 17600, 18800, 19400, 20100, 20900, 21300],
      'Google Cloud':    [ 4100,  4200,  4300,  4500,  4700,  5100,  5300,  5500,  5800,  6100,  6400,  6600],
      'Oracle Cloud':    [ 5200,  5200,  5300,  5300,  5400,  5400,  5500,  5500,  5600,  5600,  5700,  5700],
      'IBM Cloud':       [ 1900,  1900,  2000,  2000,  2100,  2100,  2200,  2200,  2300,  2300,  2400,  2400],
      'SaaS':            [ 3900,  3900,  4000,  4000,  4100,  4100,  4200,  4200,  4300,  4300,  4400,  4400],
      'On-prem':         [16200, 16200, 16100, 16100, 16000, 16000, 15900, 15900, 15800, 15800, 15700, 15700]
    },
    budget: { 'Microsoft Azure': 28000, 'AWS': 19000, 'Google Cloud': 7000, 'Oracle Cloud': 6000, 'IBM Cloud': 2600, 'SaaS': 4500, 'On-prem': 16500 },
    recs: [
      { id: 'R-01', kind: 'idle', node: 'ec2-aws-bastion', save: 61, eff: 'low', t: 'Stop idle EC2 bastion (0.4% CPU in 30 days)' },
      { id: 'R-02', kind: 'orphan', node: 'ebs-aws-orphan', save: 118, eff: 'low', t: 'Delete 6 unattached EBS volumes after snapshot' },
      { id: 'R-03', kind: 'schedule', node: 'vm-az-weu-sql', save: 750, eff: 'low', t: 'Run the test SQL VM only in business hours (12×5)' },
      { id: 'R-04', kind: 'schedule', node: 'fabric-az', save: 2900, eff: 'med', t: 'Pause Fabric F64 nights and weekends or move to F32 with smoothing' },
      { id: 'R-05', kind: 'commit', node: 'eks-aws-use1-prod', save: 1650, eff: 'med', t: '1-year Compute Savings Plan for the steady EKS baseline' },
      { id: 'R-06', kind: 'commit', node: 'adb-oci-gru', save: 780, eff: 'med', t: 'Annual Universal Credits commitment for the ERP database' },
      { id: 'R-07', kind: 'rightsize', node: 'aks-az-weu-prod', save: 640, eff: 'med', t: 'Right-size AKS user pool (avg 31% CPU) and enable cluster autoscaler' },
      { id: 'R-08', kind: 'tier', node: 'st-az-eus2-arch', save: 210, eff: 'low', t: 'Lifecycle rule: cool → archive after 90 days' },
      { id: 'R-09', kind: 'tags', node: null, save: 0, eff: 'low', t: 'Tag untagged resources so cost can be charged back' },
      { id: 'R-10', kind: 'contract', node: 'isp-pe-lima', save: 140, eff: 'low', t: 'Dispute the Lima link invoice above contract (NET-09)' }
    ]
  };
})();
