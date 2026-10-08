/*!
 * Orbiscale · v7 demo data — managed endpoints from several tools and business applications
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). SPDX-License-Identifier: AGPL-3.0-or-later
 * Fictional company "Contoso Global". People, devices, serials and applications are generated
 * for the demo (no real person or device). Product names are used only as examples.
 */
(function () {
  'use strict';
  var S = window.KNOC_SNAPSHOT; if (!S || !S.sites) return;
  var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function pick(a) { return a[Math.floor(rnd() * a.length)]; }
  var DAY = 864e5, NOW = Date.UTC(2026, 9, 7, 12);

  /* ---------- 1 · endpoints: Intune + IBM MaaS360 + Jamf + AWS WorkSpaces + IBM Cloud VDI ---------- */
  var present = {}; Object.keys(S.sites).forEach(function (k) { var c = S.sites[k].country; if (c && c !== 'CLD') present[c] = 1; });
  var PEOPLE = { BR: 70, AR: 34, CO: 20, PE: 16, CL: 14, MX: 26, EC: 8, UY: 7, CA: 14, US: 22, GB: 12, DE: 14, FR: 7, NL: 6, ES: 7, IN: 16, SG: 8, JP: 6, AU: 6, HK: 5, AE: 4, ZA: 4 };
  var P3 = { BR: 'BRA', AR: 'ARG', CO: 'COL', PE: 'PER', CL: 'CHL', MX: 'MEX', EC: 'ECU', UY: 'URY', CA: 'CAN', US: 'USA', GB: 'GBR', DE: 'DEU', FR: 'FRA', NL: 'NLD', ES: 'ESP', IN: 'IND', SG: 'SGP', JP: 'JPN', AU: 'AUS', HK: 'HKG', AE: 'ARE', ZA: 'ZAF' };
  var FN = ['Ana', 'Bruno', 'Camila', 'Daniel', 'Eva', 'Felipe', 'Gabriela', 'Hugo', 'Isabel', 'João', 'Karen', 'Lucas', 'Marina', 'Nicolás', 'Olivia', 'Pablo', 'Rafaela', 'Samuel', 'Tatiana', 'Victor', 'Wen', 'Yuki', 'Aisha', 'Ben', 'Chloé', 'Dev', 'Emma', 'Lars'];
  var LN = ['A.', 'B.', 'C.', 'D.', 'F.', 'G.', 'L.', 'M.', 'N.', 'P.', 'R.', 'S.', 'T.', 'V.'];
  var DEPTS = ['Finance', 'Sales', 'Marketing', 'Operations', 'Quality', 'Supply Chain', 'HR', 'IT', 'Legal', 'R&D', 'Customer Care'];
  var PCS = [['Dell', 'Latitude 7450'], ['Dell', 'Latitude 5440'], ['Lenovo', 'ThinkPad T14 Gen 5'], ['HP', 'EliteBook 840 G11'], ['Lenovo', 'ThinkPad X1 Carbon'], ['HP', 'ProBook 450 G10']];
  var WINV = ['10.0.26100.2033', '10.0.22631.4317', '10.0.22631.3880', '10.0.19045.4894'];
  var PHONES = [['Apple', 'iPhone 15', 'iOS', ['18.0.1', '17.6.1', '17.4']], ['Apple', 'iPhone 14', 'iOS', ['18.0.1', '17.5.1']], ['Samsung', 'Galaxy S24', 'Android', ['14', '15']], ['Samsung', 'Galaxy A55', 'Android', ['14', '13']], ['Motorola', 'Edge 50', 'Android', ['14']]];
  var MDM_PHONE = { AR: 'IBM MaaS360', MX: 'IBM MaaS360', IN: 'IBM MaaS360' }; // regions that still run the older MDM
  var devices = [], n = 0;
  function comp() { var x = rnd(); return x < 0.82 ? 'compliant' : x < 0.91 ? 'noncompliant' : x < 0.95 ? 'inGracePeriod' : 'unknown'; }
  function sync() { var x = rnd(); return new Date(NOW - (x < 0.9 ? x * 6 : 31 + x * 60) * DAY).toISOString(); }
  Object.keys(PEOPLE).forEach(function (cc) {
    if (!present[cc]) return;
    for (var i = 0; i < PEOPLE[cc]; i++) {
      n++; var num = ('000' + n).slice(-4), user = 'u' + num + '@contoso.example', name = pick(FN) + ' ' + pick(LN), dept = pick(DEPTS);
      var pc = pick(PCS), mac = rnd() < 0.1, c1 = comp();
      devices.push({ name: P3[cc] + (mac ? '-MB-' : '-NB-') + num, user: user, userName: name, dept: dept, country: cc,
        os: mac ? 'macOS' : 'Windows', osVersion: mac ? pick(['15.0', '14.6.1', '14.4']) : pick(WINV), manufacturer: mac ? 'Apple' : pc[0], model: mac ? 'MacBook Air M3' : pc[1],
        serial: 'DEMO' + Math.floor(rnd() * 1e8).toString(36).toUpperCase(), compliance: c1, lastSync: sync(), src: mac ? 'Jamf Pro' : 'Microsoft Intune',
        enc: c1 === 'compliant' || rnd() > 0.5, av: c1 === 'noncompliant' && rnd() < 0.5 ? 'off' : 'active', risk: c1 === 'noncompliant' ? pick(['medium', 'high']) : pick(['none', 'low', 'low', 'none']) });
      if (rnd() < 0.62) {
        var ph = pick(PHONES), c2 = comp();
        devices.push({ name: P3[cc] + '-MB' + (ph[2] === 'iOS' ? 'I' : 'A') + '-' + num, user: user, userName: name, dept: dept, country: cc,
          os: ph[2], osVersion: pick(ph[3]), manufacturer: ph[0], model: ph[1], serial: 'DEMO' + Math.floor(rnd() * 1e8).toString(36).toUpperCase(),
          compliance: c2, lastSync: sync(), src: MDM_PHONE[cc] || 'Microsoft Intune', enc: true, av: 'active', risk: c2 === 'noncompliant' ? 'medium' : 'none' });
      }
      if (rnd() < 0.05) devices.push({ name: P3[cc] + '-TB-' + num, user: user, userName: name, dept: dept, country: cc, os: 'iPadOS', osVersion: '18.0', manufacturer: 'Apple', model: 'iPad Air', serial: 'DEMO' + Math.floor(rnd() * 1e8).toString(36).toUpperCase(), compliance: comp(), lastSync: sync(), src: 'Microsoft Intune', enc: true, av: 'active', risk: 'none' });
    }
  });
  /* virtual desktops in the clouds: contractors and the dev center */
  [['US', 'AWS WorkSpaces', 'Amazon', 'WorkSpaces Performance', 18], ['IN', 'AWS WorkSpaces', 'Amazon', 'WorkSpaces Power', 14], ['DE', 'IBM Cloud VSI (VDI)', 'IBM Cloud', 'bx2-2x8 · Windows 11 VDI', 8], ['BR', 'Azure Virtual Desktop', 'Microsoft', 'AVD D4s v5 · multi-session', 10]].forEach(function (v) {
    if (!present[v[0]]) return;
    for (var i = 0; i < v[4]; i++) {
      n++; var num = ('000' + n).slice(-4), c3 = comp();
      devices.push({ name: P3[v[0]] + '-VD-' + num, user: 'c' + num + '@contoso.example', userName: pick(FN) + ' ' + pick(LN) + ' (contractor)', dept: pick(['R&D', 'IT', 'Finance', 'Customer Care']), country: v[0],
        os: 'Windows', osVersion: pick(WINV), manufacturer: v[2], model: v[3], serial: 'VD-' + num, compliance: c3, lastSync: sync(), src: v[1], enc: true, av: c3 === 'noncompliant' ? 'off' : 'active', risk: c3 === 'noncompliant' ? 'high' : 'low', vdi: true });
    }
  });
  /* demo only: the live product never embeds endpoints (personal data stays in the live database) */
  window.ORB_EPDEMO = { 'demo-lot-1': { id: 'demo-lot-1', demo: true, devices: devices } };
  var ST = window.KNOC && window.KNOC.S;
  if (ST && (!ST.endpoints || !Object.keys(ST.endpoints).length) && !ST.db && window.KNOC_SCN) ST.endpoints = window.ORB_EPDEMO; // demo build only (scenario switcher present)

  /* ---------- 2 · business applications and what they run on ---------- */
  window.ORB_APPS = [
    { id: 'erp', name: 'ERP · finance, supply and invoicing', tier: 0, owner: 'Finance', rto: '4 h', rpo: '15 min', users: 'BR AR CO PE CL MX EC UY', nodes: ['lb-oci-erp', 'vm-oci-gru-erp-01', 'vm-oci-gru-erp-02', 'adb-oci-gru', 'erp-app-01', 'os-oci-gru', 'bkp-br-veeam-01', 'fw-br-sp-hq-01'] },
    { id: 'orders', name: 'Orders API · e-commerce and partners', tier: 0, owner: 'Sales', rto: '1 h', rpo: '5 min', users: 'US GB DE FR NL ES', nodes: ['alb-aws-use1-api', 'ec2-aws-use1-api-01', 'ec2-aws-use1-api-02', 'eks-aws-use1-prod', 'rds-aws-use1-orders', 'bkp-aws-use1', 's3-aws-euc1-backup'] },
    { id: 'idp', name: 'Identity · sign-in, MFA and devices', tier: 0, owner: 'IT', rto: '1 h', rpo: '0', users: 'all', nodes: ['entra', 'saas-okta', 'dc-hq-01', 'dc-hq-02', 'dc-az-01', 'dc-ar-01'] },
    { id: 'crm', name: 'CRM and customer portal', tier: 1, owner: 'Customer Care', rto: '4 h', rpo: '30 min', users: 'GB DE FR NL ES AE ZA', nodes: ['apim-az-weu', 'app-az-weu-portal', 'aks-az-weu-prod', 'sql-az-weu-crm', 'st-az-weu', 'rsv-az-weu'] },
    { id: 'voice', name: 'Telephony · Teams Phone and contact center', tier: 1, owner: 'IT', rto: '2 h', rpo: '—', users: 'all', nodes: ['teams-dr', 'sbc-az-01', 'sbc-mx-01', 'pbx-de-fra-01', 'pbx-gb-lon-01'] },
    { id: 'mq', name: 'Integration hub · MQ and partner EDI', tier: 1, owner: 'Supply Chain', rto: '4 h', rpo: '15 min', users: 'DE NL GB', nodes: ['roks-ibm-eude', 'vsi-ibm', 'cos-ibm-eude', 'wx-ibm-eude'] },
    { id: 'lab', name: 'Quality lab · batch release records', tier: 1, owner: 'Quality', rto: '8 h', rpo: '1 h', users: 'AR BR', nodes: ['srv-pilar-qa', 'esx-ar-01', 'stor-ar-01', 'dc-ar-01'] },
    { id: 'devops', name: 'Platform · CI/CD, IaC and observability', tier: 1, owner: 'IT', rto: '8 h', rpo: '24 h', users: 'IT', nodes: ['devops', 'saas-gha', 'saas-tfc', 'saas-awx', 'saas-ddog', 'saas-pgd'] },
    { id: 'bi', name: 'Analytics and BI · month-end reports', tier: 2, owner: 'Finance', rto: '24 h', rpo: '4 h', users: 'all', nodes: ['fabric-az', 'bq-gcp-euw1', 'gke-gcp-euw1', 'run-gcp-euw1', 'gcs-gcp-euw1', 's3-aws-use1-datalake', 'lambda-aws-use1-etl', 'gce-gcp-euw1'] },
    { id: 'help', name: 'Service desk · ITSM and L1 assistant', tier: 2, owner: 'IT', rto: '8 h', rpo: '1 h', users: 'all', nodes: ['saas-snow', 'bot-az-weu-helpdesk', 'saas-pgd'] },
    { id: 'files', name: 'Files and printing · offices', tier: 2, owner: 'Operations', rto: '24 h', rpo: '24 h', users: 'BR US DE', nodes: ['file-hq-01', 'print-hq-01', 'nas-hq-01', 'srv-us-nyc-01', 'stor-de-fra-01'] },
    { id: 'ai', name: 'Demand forecast · AI models', tier: 2, owner: 'Supply Chain', rto: '48 h', rpo: '24 h', users: 'US GB SG', nodes: ['vtx-gcp-euw1', 'gke-gcp-ase2', 'gcs-gcp-ase2'] }
  ];
})();
