/*!
 * Orbiscale · v6 demo data — multi-vendor estate, latest versions and licences
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). SPDX-License-Identifier: AGPL-3.0-or-later
 * Fictional company "Contoso Global". Models are real product families used as examples; versions,
 * dates, serials and licences are invented and are NOT vendor advisories.
 */
(function () {
  var S = window.KNOC_SNAPSHOT; if (!S || !S.nodes) return;
  var N = S.nodes, ST = S.status || (S.status = {}), LK = S.links || (S.links = {}), now = new Date().toISOString();

  /* 1 · each region runs a different vendor mix (LATAM stays Fortinet) */
  var MIX = {
    'us-austin': { sw: ['Cisco', 'Catalyst 9300-48P', 'IOS XE 17.9.4'], ap: ['Cisco', 'Meraki MR46', 'MR 30.6'], fw: ['Cisco', 'Secure Firewall 3110', 'FTD 7.2.5'] },
    'us-newyork': { sw: ['Cisco', 'Meraki MS250-48', 'MS 16.8'], ap: ['Cisco', 'Meraki MR56', 'MR 30.6'], fw: ['Palo Alto Networks', 'PA-3410', 'PAN-OS 10.2.8'] },
    'gb-london': { sw: ['HPE Aruba', 'CX 6300M', 'AOS-CX 10.12.1000'], ap: ['HPE Aruba', 'AP-635', 'AOS 10.5.1'] },
    'fr-paris': { sw: ['HPE Aruba', 'CX 6200F', 'AOS-CX 10.11.1020'], ap: ['HPE Aruba', 'AP-515', 'AOS 8.11.0'] },
    'es-madrid': { sw: ['HPE Aruba', 'CX 6100', 'AOS-CX 10.10.1100'], ap: ['HPE Aruba', 'Instant On AP25', '3.0.0'] },
    'de-frankfurt': { sw: ['Juniper', 'EX4400-48P', 'Junos 22.4R3'], fw: ['Juniper', 'SRX4200', 'Junos 22.4R2'], ap: ['Juniper', 'Mist AP45', 'Mist 0.14'] },
    'nl-amsterdam': { sw: ['Juniper', 'EX2300-24P', 'Junos 21.4R3'], ap: ['Juniper', 'Mist AP34', 'Mist 0.12'] },
    'sg-singapore': { sw: ['Juniper', 'QFX5120-48Y', 'Junos 23.2R1'], fw: ['Juniper', 'SRX1500', 'Junos 21.4R3'] },
    'jp-tokyo': { sw: ['Cisco', 'Catalyst 9200L', 'IOS XE 17.6.5'], ap: ['Cisco', 'Catalyst 9120AX', 'IOS XE 17.9.4'] },
    'hk-hongkong': { sw: ['Cisco', 'Catalyst 9200', 'IOS XE 17.3.8'], ap: ['Cisco', 'Meraki MR36', 'MR 29.7'] },
    'au-sydney': { sw: ['HPE Aruba', 'CX 6300F', 'AOS-CX 10.12.1000'], ap: ['HPE Aruba', 'AP-635', 'AOS 10.5.1'] },
    'ae-dubai': { fw: ['Palo Alto Networks', 'PA-440', 'PAN-OS 11.0.3'], sw: ['Cisco', 'Catalyst 1000', 'IOS 15.2(7)E8'] },
    'za-johannesburg': { sw: ['HPE Aruba', 'CX 6100', 'AOS-CX 10.09.1030'] },
    'in-bengaluru': { sw: ['Cisco', 'Catalyst 9300-24U', 'IOS XE 17.9.4'], ap: ['Cisco', 'Catalyst 9130AX', 'IOS XE 17.9.4'] }
  };
  Object.keys(N).forEach(function (k) {
    var n = N[k], m = MIX[n.site] && MIX[n.site][n.type]; if (!m) return;
    n.vendor = m[0]; n.model = m[1]; n.version = m[2];
  });

  /* 2 · more on-prem gear: voice, routers, servers, storage, containers */
  function add(site, id, type, name, x) {
    var s = (S.sites || {})[site]; if (!s || N[id]) return;
    var n = { id: id, site: site, type: type, name: name, country: s.country, env: 'prod', conf: 'F', src: 'Orbiscale Discovery (demo)' };
    for (var k in x) n[k] = x[k];
    N[id] = n;
    ST[id] = { id: id, at: now, src: 'Orbiscale Sweep (demo)', method: 'icmp', target: n.ip || n.fqdn || name, state: x._st || 'up', ms: 3 + Math.round(Math.random() * 20), error: null };
    delete n._st;
    if (x.link) { var l = 'lk-' + id + '--' + x.link; LK[l] = { id: l, a: id, b: x.link, kind: x.lk || 'lan', label: '' }; delete n.link; delete n.lk; }
  }
  function sw(site) { for (var k in N) if (N[k].site === site && N[k].type === 'sw') return k; return null; }
  [
    ['de-frankfurt', 'pbx-de-fra-01', 'pbx', 'OSV-DE-FRA-01', { vendor: 'Unify', model: 'OpenScape Voice V10', version: 'V10 R2.4', ip: '10.70.5.10', role: 'Voice platform (EU) · SIP to carrier' }],
    ['gb-london', 'pbx-gb-lon-01', 'pbx', 'OSB-GB-LON-01', { vendor: 'Unify', model: 'OpenScape Business X8', version: 'V3 R3.0', ip: '10.71.5.10', role: 'Office telephony · 120 users', _st: 'deg' }],
    ['us-austin', 'rtr-us-aus-01', 'rtr', 'RTR-US-AUS-01', { vendor: 'Cisco', model: 'ISR 4451', version: 'IOS XE 17.6.3', ip: '10.80.0.1', role: 'WAN edge · MPLS + Internet' }],
    ['de-frankfurt', 'rtr-de-fra-01', 'rtr', 'RTR-DE-FRA-01', { vendor: 'Juniper', model: 'MX204', version: 'Junos 22.2R3', ip: '10.70.0.1', role: 'DC edge · BGP to two carriers' }],
    ['de-frankfurt', 'srv-de-fra-01', 'hyp', 'PVE-DE-FRA-01', { vendor: 'HPE', model: 'ProLiant DL380 Gen11', version: 'Proxmox VE 8.1', ip: '10.70.1.21', role: 'Proxmox cluster (EU apps)' }],
    ['de-frankfurt', 'stor-de-fra-01', 'stor', 'NAS-DE-FRA-01', { vendor: 'NetApp', model: 'AFF A250', version: 'ONTAP 9.12.1', ip: '10.70.2.10', role: 'NFS/SMB · SnapMirror to Azure' }],
    ['de-frankfurt', 'k8s-de-fra-01', 'k8s', 'rke2-eu-prod', { vendor: 'SUSE Rancher', model: 'RKE2 v1.28', version: 'v1.28.9', fqdn: 'rke2-eu.contoso.example', role: 'On-prem Kubernetes · 6 nodes' }],
    ['sg-singapore', 'srv-sg-01', 'hyp', 'ESX-SG-01', { vendor: 'Dell', model: 'PowerEdge R660', version: 'ESXi 8.0 U2', ip: '10.90.1.21', role: 'VMware host (APAC)' }],
    ['us-newyork', 'srv-us-nyc-01', 'srv', 'SRV-US-NYC-01', { vendor: 'HPE', model: 'ProLiant DL360 Gen10', version: 'Windows Server 2019', ip: '10.81.1.10', role: 'File + print · branch' }],
    ['br-sp-hq', 'ctr-br-sp-01', 'ctr', 'docker-hq-01', { vendor: 'Docker', model: 'Docker Engine', version: '24.0.7', ip: '10.10.1.40', role: 'Internal tools (Orbiscale, Zabbix proxy)' }],
    ['mx-cdmx', 'sbc-mx-01', 'sbc', 'SBC-MX-01', { vendor: 'AudioCodes', model: 'Mediant 800C', version: '7.40A.500', ip: '10.40.5.10', role: 'SIP trunk migration target' }],
    ['ar-bsas', 'stor-ar-01', 'stor', 'NAS-AR-BSAS-01', { vendor: 'Synology', model: 'RS3621xs+', version: 'DSM 7.1.1', ip: '10.20.2.10', role: 'Branch backups' }]
  ].forEach(function (a) { var x = a[4]; var l = sw(a[0]); if (l) x.link = l; add(a[0], a[1], a[2], a[3], x); });

  /* 3 · latest published version, end of support and licences (fictional) */
  var LATEST = [
    [/^Fortinet/, /FortiGate|FG-/, '7.4.4'], [/^Fortinet/, /FortiSwitch/, '7.4.3'], [/^Fortinet/, /FortiAP/, '7.4.3'],
    [/^Cisco/, /Catalyst 9[0-9]{3}/, 'IOS XE 17.12.3'], [/^Cisco/, /Meraki MS/, 'MS 17.1'], [/^Cisco/, /Meraki MR/, 'MR 31.1'], [/^Cisco/, /Secure Firewall/, 'FTD 7.4.1'], [/^Cisco/, /ISR/, 'IOS XE 17.9.5'], [/^Cisco/, /Catalyst 1000/, 'IOS 15.2(7)E10'],
    [/Aruba/, /^CX/, 'AOS-CX 10.13.1000'], [/Aruba/, /^AP-|Instant/, 'AOS 10.6.0'],
    [/^Juniper/, /EX|QFX|SRX|MX/, 'Junos 23.4R2'], [/^Juniper/, /Mist/, 'Mist 0.14'],
    [/^Palo Alto/, /PA-/, 'PAN-OS 11.1.4'], [/^Unify/, /OpenScape Voice/, 'V10 R3.2'], [/^Unify/, /OpenScape Business/, 'V3 R4.0'],
[/^NetApp/, /AFF/, 'ONTAP 9.15.1'], [/^AudioCodes/, /Mediant/, '7.40A.600'],
    [/^Synology/, /RS/, 'DSM 7.2.1'], [/^Docker/, /Engine/, '26.1.4'], [/^SUSE/, /RKE2/, 'v1.30.2']
  ];
  var seed = 11; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function iso(d) { return new Date(Date.UTC(2026, 9, 6) + d * 864e5).toISOString().slice(0, 10); }
  Object.keys(N).forEach(function (k) {
    var n = N[k]; if (!n.vendor || !n.model) return;
    var OS = [[/^ESXi/, 'ESXi 8.0 U3'], [/^Proxmox VE/, 'Proxmox VE 8.2'], [/^Windows Server/, 'Windows Server 2025']];
    for (var j = 0; j < OS.length; j++) if (OS[j][0].test(n.version || '')) { n.latest = OS[j][1]; break; }
    for (var i = 0; !n.latest && i < LATEST.length; i++) {
      var r = LATEST[i]; if (r[0].test(n.vendor) && r[1].test(n.model)) { n.latest = r[2]; break; }
    }
    if (['fw', 'sw', 'ap', 'hyp', 'srv', 'stor', 'pbx', 'sbc', 'rtr'].indexOf(n.type) >= 0) {
      var x = rnd();
      n.lic = { kind: n.type === 'fw' ? 'UTP / security bundle' : n.type === 'hyp' ? 'vSphere / support' : n.type === 'pbx' ? 'User licences + SW assurance' : 'Support contract', until: iso(Math.round(-20 + x * 420)), seats: n.type === 'pbx' ? 120 + Math.round(x * 300) : null };
      n.eos = /6\.7|15\.2\(7\)E8|17\.3|21\.4|10\.09|8\.11\.0|Windows Server 2019/.test(n.version || '') ? iso(Math.round(30 + x * 300)) : null;
    }
  });
})();
