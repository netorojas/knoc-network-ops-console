/*!
 * Orbiscale · v7: Security (cloud + on-prem + endpoints), Lifecycle & licences, Business applications,
 * endpoints from several management tools, and Voice intake (WhatsApp-style audio → demand on the map).
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). SPDX-License-Identifier: AGPL-3.0-or-later
 * Demo only: vulnerability IDs are fictional (V-xxxx) and are NOT vendor advisories or CVEs.
 */
(function () {
  'use strict';
  var K = window.KNOC, D = window.ORB_V5, APPS = window.ORB_APPS || [], SN = window.KNOC_SNAPSHOT;
  if (!K || !D || !SN) return;
  var $ = function (i) { return document.getElementById(i); };
  function L() { try { return K.getL(); } catch (e) { return 'pt'; } }
  function L3(pt, es, en) { var l = L(); return l === 'es' ? es : l === 'en' ? en : pt; }
  function T3(a) { return a ? L3(a[0], a[1], a[2]) : ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function money(v) { return 'US$ ' + Math.round(v || 0).toLocaleString(L() === 'en' ? 'en-US' : 'pt-BR'); }
  function node(id) { var n = (K.S && K.S.nodes || SN.nodes)[id]; return n && K.siteOf(n) ? n : null; }
  function site(id) { return K.siteOf({ site: id }); }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  function days(iso) { return iso ? Math.round((new Date(iso).getTime() - Date.now()) / 864e5) : null; }
  function fmtD(iso) { try { return new Date(iso).toLocaleDateString(L() === 'en' ? 'en-GB' : L() === 'es' ? 'es-ES' : 'pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }); } catch (e) { return iso; } }
  function tile(n, s) { return K.typeTile ? K.typeTile(n, s || 22) : ''; }
  function badge(n) { return K.originBadge ? K.originBadge(n) : ''; }
  function prov(n) { return K.provOf ? K.provOf(n) : 'On-prem'; }
  var PEOPLE = D.people || {}, PK = Object.keys(PEOPLE);
  /* "FortiOS 7.4.4" and "7.4.4" are the same release: compare only the version token */
  function vnum(s) { var m = String(s || '').match(/\d+(?:[.\-]\w+)*(?:\([\w.]+\)\w*)?/g); return m ? m[m.length - 1].toLowerCase() : String(s || '').toLowerCase(); }
  function hasUpd(n) { return !!(n.latest && n.version && vnum(n.latest) !== vnum(n.version)); }
  K.hasUpd = hasUpd;

  /* ---------- 0 · menu entries ---------- */
  var TT = {
    pt: { sec: 'Segurança', life: 'Ciclo de vida e licenças', apps: 'Aplicações de negócio' },
    es: { sec: 'Seguridad', life: 'Ciclo de vida y licencias', apps: 'Aplicaciones de negocio' },
    en: { sec: 'Security', life: 'Lifecycle & licences', apps: 'Business applications' }
  };
  if (K.T) Object.keys(TT).forEach(function (l) { if (K.T[l]) Object.assign(K.T[l], TT[l]); });
  if (K.NAV) {
    var put = function (g, after, item) {
      var grp = K.NAV.filter(function (x) { return x.g === g; })[0]; if (!grp || grp.items.some(function (i) { return i[0] === item[0]; })) return;
      var at = grp.items.map(function (i) { return i[0]; }).indexOf(after); grp.items.splice(at < 0 ? grp.items.length : at + 1, 0, item);
    };
    put('gOps', 'dem', ['sec', 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM9 12l2 2 4-4']);
    put('gKnow', 'cloud', ['apps', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 17h6M17 14v6']);
    put('gMgmt', 'cost', ['life', 'M12 7v5l3 2M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4']);
    try { K.renderNav(); } catch (e) { /* paints on next render */ }
  }

  /* ---------- 1 · vulnerability model (cloud + on-prem + endpoints) ---------- */
  var SRC = { 'Microsoft Azure': 'Microsoft Defender for Cloud', 'AWS': 'AWS Security Hub', 'Google Cloud': 'Security Command Center', 'Oracle Cloud': 'OCI Cloud Guard', 'IBM Cloud': 'IBM Security and Compliance Center', 'SaaS': 'Defender for Cloud Apps (SSPM)' };
  var NETT = { fw: 1, sw: 1, ap: 1, rtr: 1, vpngw: 1, sbc: 1, isp: 0 };
  function srcFor(n) { var p = prov(n); if (SRC[p]) return SRC[p]; return NETT[n.type] && /Fortinet/.test(n.vendor || '') ? 'FortiAnalyzer' : 'Tenable Nessus'; }
  var CFG = {
    vm: [['osupd', 'high', ['Atualizações críticas de SO pendentes', 'Actualizaciones críticas de SO pendientes', 'Critical OS updates pending']], ['edr', 'med', ['Agente EDR sem reportar há 7 dias', 'Agente EDR sin reportar hace 7 días', 'EDR agent silent for 7 days']]],
    db: [['pub', 'high', ['Acesso público de rede habilitado no banco', 'Acceso público de red habilitado en la base', 'Public network access enabled on the database']], ['cmk', 'low', ['Criptografia com chave do provedor (CMK recomendada)', 'Cifrado con clave del proveedor (se recomienda CMK)', 'Encryption with provider key (CMK recommended)']]],
    k8s: [['root', 'med', ['Pods rodando como root', 'Pods ejecutándose como root', 'Pods running as root']], ['kver', 'med', ['Versão do Kubernetes perto do fim de suporte', 'Versión de Kubernetes cerca del fin de soporte', 'Kubernetes version close to end of support']]],
    obj: [['vers', 'low', ['Versionamento de objetos desativado', 'Versionado de objetos desactivado', 'Object versioning disabled']]],
    kv: [['purge', 'med', ['Proteção contra exclusão (purge) desativada', 'Protección contra purga desactivada', 'Purge protection disabled']]],
    nsg: [['flow', 'low', ['Flow logs desativados', 'Flow logs desactivados', 'Flow logs disabled']]],
    vnet: [['flow', 'low', ['Flow logs desativados', 'Flow logs desactivados', 'Flow logs disabled']]],
    app: [['tls', 'med', ['TLS 1.0/1.1 ainda aceito', 'TLS 1.0/1.1 todavía aceptado', 'TLS 1.0/1.1 still accepted']]],
    apigw: [['tls', 'med', ['TLS 1.0/1.1 ainda aceito', 'TLS 1.0/1.1 todavía aceptado', 'TLS 1.0/1.1 still accepted']]],
    lb: [['tls', 'med', ['TLS 1.0/1.1 ainda aceito', 'TLS 1.0/1.1 todavía aceptado', 'TLS 1.0/1.1 still accepted']]],
    saas: [['mfa', 'high', ['Contas de serviço sem MFA / acesso condicional', 'Cuentas de servicio sin MFA / acceso condicional', 'Service accounts without MFA / conditional access']]],
    bot: [['key', 'med', ['Chave de API sem rotação há 180 dias', 'Clave de API sin rotación hace 180 días', 'API key not rotated for 180 days']]]
  };
  var WHY = {
    disc: ['Configuração que abre caminho direto para um atacante.', 'Configuración que abre un camino directo a un atacante.', 'A configuration that opens a direct path for an attacker.'],
    upd: ['Versões antigas acumulam falhas já corrigidas pelo fabricante.', 'Las versiones antiguas acumulan fallas ya corregidas por el fabricante.', 'Old versions keep flaws the vendor has already fixed.'],
    eos: ['Depois do fim de suporte não há mais correções de segurança.', 'Después del fin de soporte no hay más correcciones de seguridad.', 'After end of support there are no more security fixes.'],
    lic: ['Sem contrato ativo não há assinaturas de ameaça nem suporte do fabricante.', 'Sin contrato activo no hay firmas de amenazas ni soporte del fabricante.', 'No active contract means no threat signatures and no vendor support.'],
    cfg: ['Desvio do baseline de segurança da nuvem.', 'Desvío del baseline de seguridad de la nube.', 'Drift from the cloud security baseline.'],
    ep: ['Aparelho fora da política pode vazar dados ou servir de entrada.', 'Un equipo fuera de política puede filtrar datos o servir de entrada.', 'A device outside policy can leak data or become an entry point.']
  };
  var FIX = {
    upd: [['Leia as release notes e o caminho de upgrade do fabricante', 'Lee las release notes y la ruta de upgrade del fabricante', 'Read the vendor release notes and upgrade path'], ['Backup da configuração e evidência antes', 'Backup de la configuración y evidencia antes', 'Back up the configuration and capture evidence first'], ['Abra a mudança no CAB com janela e rollback definidos', 'Abre el cambio en el CAB con ventana y rollback definidos', 'Raise the change in CAB with window and rollback defined'], ['Em HA: atualize o secundário, faça failover, depois o primário', 'En HA: actualiza el secundario, failover y luego el primario', 'In HA: upgrade the secondary, fail over, then the primary']],
    eos: [['Confirme a data com o fabricante e o contrato', 'Confirma la fecha con el fabricante y el contrato', 'Confirm the date with the vendor and the contract'], ['Planeje substituição ou upgrade de versão', 'Planifica reemplazo o upgrade de versión', 'Plan replacement or a version upgrade'], ['Enquanto isso: reduza exposição e monitore', 'Mientras tanto: reduce exposición y monitorea', 'Meanwhile: reduce exposure and monitor']],
    lic: [['Peça a cotação de renovação (compras / parceiro)', 'Pide la cotización de renovación (compras / socio)', 'Request the renewal quote (procurement / partner)'], ['Registre o risco aceito até a renovação', 'Registra el riesgo aceptado hasta la renovación', 'Record the accepted risk until renewal'], ['Atualize a data no inventário depois de renovar', 'Actualiza la fecha en el inventario al renovar', 'Update the date in the inventory after renewal']],
    cfg: [['Confirme o achado no console nativo da nuvem', 'Confirma el hallazgo en la consola nativa de la nube', 'Confirm the finding in the native cloud console'], ['Corrija via IaC (Terraform) para não voltar no próximo deploy', 'Corrige vía IaC (Terraform) para que no vuelva en el próximo deploy', 'Fix it in IaC (Terraform) so the next deploy does not bring it back'], ['Valide e feche com evidência (print do console + commit)', 'Valida y cierra con evidencia (captura + commit)', 'Validate and close with evidence (console capture + commit)']],
    ep: [['Abra a lista filtrada de aparelhos não conformes', 'Abre la lista filtrada de equipos no conformes', 'Open the filtered list of non-compliant devices'], ['Avise os usuários com prazo (template do service desk)', 'Avisa a los usuarios con plazo (plantilla del service desk)', 'Notify users with a deadline (service desk template)'], ['Depois do prazo: acesso condicional bloqueia o aparelho', 'Después del plazo: el acceso condicional bloquea el equipo', 'After the deadline: conditional access blocks the device']]
  };
  var VULN = null;
  function buildV() {
    var out = [], seq = 0, now = Date.now();
    function add(v) { seq++; v.id = 'V-' + ('000' + seq).slice(-4); var h = hash(v.key); v.age = v.age != null ? v.age : 1 + h % 60; v.who = PK.length ? PK[h % PK.length] : ''; v.st = v.st || (h % 9 === 0 ? 'risk' : h % 4 === 0 ? 'doing' : 'open'); out.push(v); }
    D.findings.forEach(function (f) { var n = node(f.node); if (!n) return; add({ key: f.id, kind: 'disc', sev: f.sev, node: n.id, site: n.site, env: prov(n), src: SRC[prov(n)] || 'Orbiscale Discovery', exp: /0\.0\.0\.0|public|open to all|public IP/i.test(f.ctl), t3: [f.ctl, f.ctl, f.ctl], fix3: [[f.fix, f.fix, f.fix]], fid: f.id }); });
    K.nodeList().forEach(function (n) {
      var edge = { fw: 1, vpngw: 1, sbc: 1, rtr: 1, lb: 1, apigw: 1 }[n.type];
      if (hasUpd(n)) add({ key: 'u' + n.id, kind: 'upd', sev: edge ? 'high' : 'med', node: n.id, site: n.site, env: prov(n), src: srcFor(n), exp: !!edge, t3: ['Atualização disponível: ' + n.version + ' → ' + n.latest, 'Actualización disponible: ' + n.version + ' → ' + n.latest, 'Update available: ' + n.version + ' → ' + n.latest] });
      var de = days(n.eos); if (de != null && de < 400) add({ key: 'e' + n.id, kind: 'eos', sev: de < 120 ? 'crit' : de < 240 ? 'high' : 'med', node: n.id, site: n.site, env: prov(n), src: 'Orbiscale Lifecycle', exp: !!edge, t3: ['Fim de suporte em ' + de + ' dias (' + n.version + ')', 'Fin de soporte en ' + de + ' días (' + n.version + ')', 'End of support in ' + de + ' days (' + n.version + ')'] });
      var dl = n.lic && days(n.lic.until); if (dl != null && dl < 0) add({ key: 'l' + n.id, kind: 'lic', sev: n.type === 'fw' ? 'high' : 'med', node: n.id, site: n.site, env: prov(n), src: 'Orbiscale Lifecycle', exp: false, t3: ['Licença / suporte vencido há ' + (-dl) + ' dias', 'Licencia / soporte vencido hace ' + (-dl) + ' días', 'Licence / support expired ' + (-dl) + ' days ago'] });
      var rules = CFG[n.type]; if (rules && prov(n) !== 'On-prem') rules.forEach(function (r) { if (hash(n.id + r[0]) % 100 < 45) add({ key: 'c' + n.id + r[0], kind: 'cfg', sev: r[1], node: n.id, site: n.site, env: prov(n), src: srcFor(n), exp: r[0] === 'pub' || r[0] === 'tls', t3: r[2] }); });
      if (prov(n) === 'On-prem' && /Windows Server 2019|2016/.test(n.version || '') || (prov(n) === 'On-prem' && n.type === 'vm' && hash(n.id) % 3 === 0)) add({ key: 'p' + n.id, kind: 'cfg', sev: 'high', node: n.id, site: n.site, env: 'On-prem', src: 'Tenable Nessus', exp: false, t3: CFG.vm[0][2] });
    });
    /* endpoints: one finding per country + management tool, so the list stays readable */
    var eps = K.EPS ? K.EPS() : [], grp = {};
    eps.forEach(function (d) { if (!/noncompliant/i.test(d.compliance || '')) return; var k = (d.cc || '?') + '|' + (d.src || 'Microsoft Intune'); (grp[k] = grp[k] || []).push(d); });
    Object.keys(grp).forEach(function (k) {
      var a = grp[k], cc = k.split('|')[0], src = k.split('|')[1], s0 = K.nodeList().filter(function (n) { return K.countryOf(n) === cc; })[0], high = a.filter(function (d) { return d.risk === 'high' || d.av === 'off'; }).length;
      add({ key: 'ep' + k, kind: 'ep', sev: high ? 'high' : 'med', node: null, site: s0 ? s0.site : null, cc: cc, env: 'Endpoints', src: src, exp: false, n: a.length, srcTool: src, t3: [a.length + ' aparelhos não conformes · ' + cc + (high ? ' · ' + high + ' sem antivírus ou risco alto' : ''), a.length + ' equipos no conformes · ' + cc + (high ? ' · ' + high + ' sin antivirus o riesgo alto' : ''), a.length + ' non-compliant devices · ' + cc + (high ? ' · ' + high + ' without AV or high risk' : '')] });
    });
    var rank = { crit: 0, high: 1, med: 2, low: 3 };
    out.sort(function (a, b) { return rank[a.sev] - rank[b.sev] || (b.exp ? 1 : 0) - (a.exp ? 1 : 0) || b.age - a.age; });
    void now; return out;
  }
  function vulns() { if (!VULN) VULN = buildV(); return VULN; }
  K.vulns = vulns;
  var SEVN = { crit: ['Crítica', 'Crítica', 'Critical'], high: ['Alta', 'Alta', 'High'], med: ['Média', 'Media', 'Medium'], low: ['Baixa', 'Baja', 'Low'] };
  var STN = { open: ['Aberta', 'Abierta', 'Open'], doing: ['Em correção', 'En corrección', 'Fixing'], risk: ['Risco aceito', 'Riesgo aceptado', 'Risk accepted'] };
  function sevPill(s) { return '<em class="v5-sev s-' + s + '">' + esc(T3(SEVN[s])) + '</em>'; }
  function appsOf(id) { return APPS.filter(function (a) { return a.nodes.indexOf(id) >= 0; }); }
  var APPN = {
    erp: ['ERP · finanças, suprimentos e faturamento', 'ERP · finanzas, abastecimiento y facturación', 'ERP · finance, supply and invoicing'],
    orders: ['API de pedidos · e-commerce e parceiros', 'API de pedidos · e-commerce y socios', 'Orders API · e-commerce and partners'],
    idp: ['Identidade · login, MFA e aparelhos', 'Identidad · inicio de sesión, MFA y equipos', 'Identity · sign-in, MFA and devices'],
    crm: ['CRM e portal do cliente', 'CRM y portal del cliente', 'CRM and customer portal'],
    voice: ['Telefonia · Teams Phone e contact center', 'Telefonía · Teams Phone y contact center', 'Telephony · Teams Phone and contact center'],
    mq: ['Hub de integração · MQ e EDI com parceiros', 'Hub de integración · MQ y EDI con socios', 'Integration hub · MQ and partner EDI'],
    lab: ['Laboratório de qualidade · liberação de lotes', 'Laboratorio de calidad · liberación de lotes', 'Quality lab · batch release records'],
    devops: ['Plataforma · CI/CD, IaC e observabilidade', 'Plataforma · CI/CD, IaC y observabilidad', 'Platform · CI/CD, IaC and observability'],
    bi: ['Analytics e BI · relatórios de fechamento', 'Analytics y BI · reportes de cierre', 'Analytics and BI · month-end reports'],
    help: ['Service desk · ITSM e assistente N1', 'Service desk · ITSM y asistente N1', 'Service desk · ITSM and L1 assistant'],
    files: ['Arquivos e impressão · escritórios', 'Archivos e impresión · oficinas', 'Files and printing · offices'],
    ai: ['Previsão de demanda · modelos de IA', 'Previsión de demanda · modelos de IA', 'Demand forecast · AI models']
  };
  function appName(a) { return APPN[a.id] ? T3(APPN[a.id]) : a.name; }

  /* ---------- 2 · shared drawer + simulated drafts ---------- */
  function drawer(h) { if (K.v6drawer) return K.v6drawer(h); }
  function closeDr() { if (K.v6close) K.v6close(); }
  function vguide(id) {
    var v = vulns().filter(function (x) { return x.id === id; })[0]; if (!v) return;
    var n = v.node && node(v.node), s = v.site && site(v.site), li = L() === 'es' ? 1 : L() === 'en' ? 2 : 0;
    var steps = v.fix3 || FIX[v.kind] || FIX.cfg, apps = n ? appsOf(n.id) : [], dem = v.site ? D.demands.filter(function (d) { return d.site === v.site; }) : [];
    var h = '<div class="eyebrow">' + esc(L3('Como atuar', 'Cómo actuar', 'How to act')) + ' · ' + esc(v.id) + '</div><h2>' + esc(T3(v.t3)) + '</h2>' +
      '<div class="v6-kv"><span>' + esc(L3('Severidade', 'Severidad', 'Severity')) + '</span><b>' + sevPill(v.sev) + (v.exp ? ' <em class="v7-exp">🌐 ' + esc(L3('exposto à internet', 'expuesto a internet', 'internet-facing')) + '</em>' : '') + '</b>' +
      '<span>' + esc(L3('Ativo', 'Activo', 'Asset')) + '</span><b>' + (n ? '<a href="#" data-v7node="' + esc(n.id) + '">' + esc(n.name) + '</a> ' + badge(n) : esc(v.n + ' · ' + v.srcTool)) + '</b>' +
      '<span>' + esc(L3('Onde', 'Dónde', 'Where')) + '</span><b>' + esc(s ? s.name : (v.cc || '—')) + '</b>' +
      '<span>' + esc(L3('Detectado por', 'Detectado por', 'Detected by')) + '</span><b>' + esc(v.src) + '</b>' +
      '<span>' + esc(L3('Idade', 'Antigüedad', 'Age')) + '</span><b>' + v.age + ' ' + esc(L3('dias', 'días', 'days')) + '</b>' +
      '<span>' + esc(L3('Dono', 'Dueño', 'Owner')) + '</span><b>' + esc(PEOPLE[v.who] || '—') + '</b>' +
      '<span>' + esc(L3('Status', 'Estado', 'Status')) + '</span><b>' + esc(T3(STN[v.st])) + '</b></div>';
    h += '<h3>' + esc(L3('Por que importa', 'Por qué importa', 'Why it matters')) + '</h3><p class="v7-p">' + esc(T3(WHY[v.kind])) + '</p>';
    h += '<h3>' + esc(L3('Passos', 'Pasos', 'Steps')) + '</h3><ol class="v6-steps">' + steps.map(function (x) { return '<li>' + esc(x[li] || x[0]) + '</li>'; }).join('') + '</ol>';
    if (v.kind === 'upd' || v.kind === 'eos') h += '<div class="v7-warn">⚠ ' + esc(L3('Mudança em produção: rollback definido ANTES, critério de rollback explícito e janela aprovada.', 'Cambio en producción: rollback definido ANTES, criterio de rollback explícito y ventana aprobada.', 'Production change: rollback defined BEFORE, explicit rollback trigger and an approved window.')) + '</div>';
    if (apps.length) h += '<h3>' + esc(L3('Aplicações de negócio afetadas', 'Aplicaciones de negocio afectadas', 'Business applications affected')) + '</h3><div class="v6-list">' + apps.map(function (a) { return '<button type="button" class="v6-li" data-v7app="' + a.id + '"><b>T' + a.tier + '</b> ' + esc(appName(a)) + '</button>'; }).join('') + '</div>';
    if (dem.length) h += '<h3>' + esc(L3('Demandas no mesmo site', 'Demandas en el mismo sitio', 'Work at the same site')) + '</h3><div class="v6-list">' + dem.slice(0, 5).map(function (d) { return '<button type="button" class="v6-li" data-v6guide="' + esc(d.id) + '"><b>' + esc(d.id) + '</b> ' + esc(d.t) + '</button>'; }).join('') + '</div>';
    h += '<div class="v6-acts">' + (v.site ? '<button type="button" class="btn sm pri" data-v6map="' + esc(v.site) + '">◎ ' + esc(L3('Ver no mapa', 'Ver en el mapa', 'Show on map')) + '</button>' : '') +
      (n ? '<button type="button" class="btn sm" data-v7topo="' + esc(n.id) + '">' + esc(L3('Topologia', 'Topología', 'Topology')) + '</button><button type="button" class="btn sm" data-v7inv="' + esc(n.id) + '">' + esc(L3('Inventário', 'Inventario', 'Inventory')) + '</button>' : '') +
      (/upd|eos|lic/.test(v.kind) ? '<button type="button" class="btn sm" data-v7go="life">' + esc(L3('Ciclo de vida', 'Ciclo de vida', 'Lifecycle')) + '</button>' : '') +
      (v.kind === 'ep' ? '<button type="button" class="btn sm pri" data-v7ep="' + esc(v.cc + '|' + v.srcTool) + '">' + esc(L3('Abrir aparelhos', 'Abrir equipos', 'Open devices')) + '</button>' : '') +
      '<button type="button" class="btn sm" data-v7draft="ticket|' + v.id + '">🎫 ITSM</button><button type="button" class="btn sm" data-v7draft="teams|' + v.id + '">💬 Teams</button></div>';
    drawer(h);
  }
  K.v7guide = vguide;
  function draft(kind, id) {
    var v = vulns().filter(function (x) { return x.id === id; })[0]; if (!v) return;
    var n = v.node && node(v.node), to = kind === 'teams' ? 'Teams · #sec-ops' : 'ITSM · Security Ops', title = '[' + T3(SEVN[v.sev]) + '] ' + T3(v.t3) + (n ? ' — ' + n.name : '');
    var body = L3('Ativo', 'Activo', 'Asset') + ': ' + (n ? n.name : v.n + ' · ' + v.srcTool) + '\n' + L3('Detectado por', 'Detectado por', 'Detected by') + ': ' + v.src + '\n' + L3('Passos', 'Pasos', 'Steps') + ':\n' + (v.fix3 || FIX[v.kind] || FIX.cfg).map(function (x, i) { return (i + 1) + '. ' + T3(x.length === 3 ? x : [x[0], x[0], x[0]]); }).join('\n');
    var box = document.createElement('div'); box.className = 'v5-modal'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<div class="v5-mbox"><div class="v5-mh"><b>' + (kind === 'teams' ? '💬 ' + esc(L3('Mensagem para o Teams', 'Mensaje para Teams', 'Teams message')) : '🎫 ' + esc(L3('Novo chamado no ITSM', 'Nuevo ticket en el ITSM', 'New ITSM ticket'))) + '</b><button type="button" class="v5-x" aria-label="×">×</button></div>' +
      '<div class="v5-mr"><span>' + esc(L3('Destino', 'Destino', 'To')) + '</span><b>' + esc(to) + '</b></div><div class="v5-mr"><span>' + esc(L3('Título', 'Título', 'Title')) + '</span><b>' + esc(title) + '</b></div><pre class="v5-pre">' + esc(body) + '</pre>' +
      '<p class="v5-note">' + esc(L3('Demo: nada é enviado. Em produção o envio passa pelo conector do ITSM ou por um webhook aprovado, sempre com revisão humana.', 'Demo: no se envía nada. En producción pasa por el conector del ITSM o un webhook aprobado, siempre con revisión humana.', 'Demo: nothing is sent. In production it goes through the ITSM connector or an approved webhook, always with human review.')) + '</p>' +
      '<div class="v5-mf"><button type="button" class="btn v5-x">' + esc(L3('Cancelar', 'Cancelar', 'Cancel')) + '</button><button type="button" class="btn pri v5-ok">' + esc(L3('Criar (simulação)', 'Crear (simulación)', 'Create (simulation)')) + '</button></div></div>';
    document.body.appendChild(box);
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.v5-x')) box.remove(); });
    box.querySelector('.v5-ok').onclick = function () { box.remove(); K.toast(L3('Rascunho simulado em ', 'Borrador simulado en ', 'Simulated draft in ') + to); };
    box.querySelector('.v5-ok').focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-v7vg],[data-v7node],[data-v7topo],[data-v7inv],[data-v7go],[data-v7ep],[data-v7draft],[data-v7app],[data-v7appinv]'); if (!t) return;
    e.preventDefault();
    var a = function (k) { return t.getAttribute(k); };
    if (a('data-v7vg')) return vguide(a('data-v7vg'));
    if (a('data-v7node')) { closeDr(); return K.openNode(a('data-v7node')); }
    if (a('data-v7topo')) { var id = a('data-v7topo'); closeDr(); K.go('topo'); return setTimeout(function () { try { K.openNode(id); } catch (x) { /* ok */ } }, 380); }
    if (a('data-v7inv')) { closeDr(); K.invFilter({ ids: a('data-v7inv').split(','), idsLabel: a('data-v7lbl') || L3('Selecionados', 'Seleccionados', 'Selected') }); return K.go('inv'); }
    if (a('data-v7go')) { closeDr(); return K.go(a('data-v7go')); }
    if (a('data-v7ep')) { var p = a('data-v7ep').split('|'); closeDr(); if (K.endpFilter) K.endpFilter({ cc: p[0], comp: 'noncompliant', src: p[1], view: 'dev' }); return K.go('endp'); }
    if (a('data-v7draft')) { var q = a('data-v7draft').split('|'); return draft(q[0], q[1]); }
    if (a('data-v7app')) { closeDr(); AF.sel = a('data-v7app'); return K.go('apps'); }
    if (a('data-v7appinv')) { var ap = APPS.filter(function (x) { return x.id === a('data-v7appinv'); })[0]; if (!ap) return; K.invFilter({ ids: ap.nodes.filter(node), idsLabel: appName(ap) }); return K.go('inv'); }
  });

  /* ---------- 3 · SECURITY view ---------- */
  var SF = { q: '', sev: '', env: '', src: '', st: '', exp: false };
  var ENVS = ['Microsoft Azure', 'AWS', 'Google Cloud', 'Oracle Cloud', 'IBM Cloud', 'SaaS', 'On-prem', 'Endpoints'];
  var ENVC = { 'Microsoft Azure': '#2F7FD8', 'AWS': '#D9822B', 'Google Cloud': '#2E9E5B', 'Oracle Cloud': '#C2453A', 'IBM Cloud': '#7B5CE0', 'SaaS': '#0EA5A4', 'On-prem': '#475569', 'Endpoints': '#64748B' };
  function envLabel(e) { return e === 'On-prem' ? 'On-premises' : e === 'Endpoints' ? L3('Endpoints', 'Endpoints', 'Endpoints') : e; }
  K.V.sec = function (el) {
    var all = vulns();
    var h = K.head(L3('Operação', 'Operación', 'Operations'), L3('Segurança', 'Seguridad', 'Security'), esc(L3('Vulnerabilidades e desvios da nuvem, do on-premises e dos endpoints, num lugar só. Cada item diz quem detectou, onde mora e como atuar.', 'Vulnerabilidades y desvíos de la nube, del on-premises y de los endpoints, en un solo lugar. Cada ítem dice quién lo detectó, dónde vive y cómo actuar.', 'Vulnerabilities and drift across cloud, on-premises and endpoints, in one place. Every item says who found it, where it lives and how to act.')) + ' <span class="v7-demo">' + esc(L3('IDs fictícios da demo, não são CVEs.', 'IDs ficticios de la demo, no son CVEs.', 'Demo IDs, not CVEs.')) + '</span>');
    var c = function (f) { return all.filter(f).length; }, eps = K.EPS ? K.EPS() : [];
    var nc = eps.filter(function (d) { return /noncompliant/i.test(d.compliance || ''); }).length, avgAge = Math.round(all.reduce(function (s, v) { return s + v.age; }, 0) / Math.max(1, all.length));
    h += '<div class="v5-kpis v7-k7">' + [
      [c(function (v) { return v.sev === 'crit'; }), L3('Críticas', 'Críticas', 'Critical'), 'crit', 'sev'], [c(function (v) { return v.sev === 'high'; }), L3('Altas', 'Altas', 'High'), 'high', 'sev'],
      [c(function (v) { return v.exp; }), L3('Expostas à internet', 'Expuestas a internet', 'Internet-facing'), '1', 'exp'],
      [c(function (v) { return ENVS.indexOf(v.env) < 6; }), L3('Na nuvem', 'En la nube', 'In the cloud'), 'cloud', 'env'], [c(function (v) { return v.env === 'On-prem'; }), 'On-premises', 'On-prem', 'env'],
      [nc, L3('Aparelhos não conformes', 'Equipos no conformes', 'Non-compliant devices'), 'Endpoints', 'env'], [avgAge + ' ' + L3('dias', 'días', 'days'), L3('Idade média', 'Antigüedad media', 'Average age'), '', '']
    ].map(function (k) { return '<button type="button" class="v5-kpi v7-kb" data-sk="' + k[3] + '" data-sv="' + esc(k[2]) + '"><b>' + k[0] + '</b><span>' + esc(k[1]) + '</span></button>'; }).join('') + '</div>';
    /* integrated tools */
    var tools = {}; all.forEach(function (v) { (tools[v.src] = tools[v.src] || { n: 0, c: 0 }).n++; if (v.sev === 'crit' || v.sev === 'high') tools[v.src].c++; });
    var TS = { 'Microsoft Defender for Cloud': 'Azure', 'AWS Security Hub': 'AWS · Inspector + GuardDuty', 'Security Command Center': 'Google Cloud', 'OCI Cloud Guard': 'Oracle Cloud', 'IBM Security and Compliance Center': 'IBM Cloud', 'Defender for Cloud Apps (SSPM)': 'SaaS', 'Tenable Nessus': L3('servidores e rede on-prem', 'servidores y red on-prem', 'on-prem servers and network'), 'FortiAnalyzer': 'FortiGate · FortiSwitch · FortiAP', 'Orbiscale Lifecycle': L3('versões, EOS e licenças', 'versiones, EOS y licencias', 'versions, EOS and licences'), 'Microsoft Intune': 'Windows · iOS · Android', 'IBM MaaS360': 'iOS · Android', 'Jamf Pro': 'macOS', 'AWS WorkSpaces': 'VDI', 'Azure Virtual Desktop': 'VDI', 'IBM Cloud VSI (VDI)': 'VDI' };
    h += '<section class="panel pad v7-sec"><h2 class="v7-h">' + esc(L3('Ferramentas integradas', 'Herramientas integradas', 'Integrated tools')) + ' <small>' + esc(L3('somente leitura · sincronização simulada', 'solo lectura · sincronización simulada', 'read-only · simulated sync')) + '</small></h2><div class="v7-tools">' +
      Object.keys(tools).sort(function (a, b) { return tools[b].n - tools[a].n; }).map(function (k) { return '<button type="button" class="v7-tool' + (SF.src === k ? ' on' : '') + '" data-ssrc="' + esc(k) + '"><i></i><b>' + esc(k) + '</b><small>' + esc(TS[k] || '') + '</small><span>' + tools[k].n + (tools[k].c ? ' · <em>' + tools[k].c + ' ' + esc(L3('altas+', 'altas+', 'high+')) + '</em>' : '') + '</span></button>'; }).join('') + '</div></section>';
    /* where the risk lives */
    var mx = 1, by = {}; ENVS.forEach(function (e) { by[e] = { crit: 0, high: 0, med: 0, low: 0, t: 0 }; });
    all.forEach(function (v) { var b = by[v.env] || by['On-prem']; b[v.sev]++; b.t++; mx = Math.max(mx, b.t); });
    h += '<section class="panel pad v7-sec"><h2 class="v7-h">' + esc(L3('Onde o risco mora', 'Dónde vive el riesgo', 'Where the risk lives')) + '</h2><div class="v7-bars">' + ENVS.filter(function (e) { return by[e].t; }).map(function (e) {
      var b = by[e]; return '<button type="button" class="v7-bar' + (SF.env === e ? ' on' : '') + '" data-senv="' + esc(e) + '"><span class="v7-bl"><i style="background:' + ENVC[e] + '"></i>' + esc(envLabel(e)) + '</span><span class="v7-bt" style="width:' + (b.t / mx * 100).toFixed(1) + '%">' + ['crit', 'high', 'med', 'low'].map(function (s) { return b[s] ? '<i class="s-' + s + '" style="flex:' + b[s] + '" title="' + esc(T3(SEVN[s])) + ': ' + b[s] + '"></i>' : ''; }).join('') + '</span><b>' + b.t + '</b></button>';
    }).join('') + '</div><div class="v7-leg">' + ['crit', 'high', 'med', 'low'].map(function (s) { return '<span><i class="s-' + s + '"></i>' + esc(T3(SEVN[s])) + '</span>'; }).join('') + '</div></section>';
    /* list */
    var srcs = {}; all.forEach(function (v) { srcs[v.src] = 1; });
    var opt = function (id, cur, list, ph, lab) { return '<select id="' + id + '"><option value="">' + esc(ph) + '</option>' + list.map(function (k) { return '<option value="' + esc(k) + '"' + (cur === k ? ' selected' : '') + '>' + esc(lab ? lab(k) : k) + '</option>'; }).join('') + '</select>'; };
    h += '<div class="panel pad v6-cf"><input type="search" id="sfq" placeholder="' + esc(L3('Buscar ativo, site, título, ferramenta…', 'Buscar activo, sitio, título, herramienta…', 'Search asset, site, title, tool…')) + '" value="' + esc(SF.q) + '">' +
      opt('sfs', SF.sev, ['crit', 'high', 'med', 'low'], L3('Toda severidade', 'Toda severidad', 'Any severity'), function (k) { return T3(SEVN[k]); }) +
      opt('sfe', SF.env, ENVS, L3('Todo ambiente', 'Todo ambiente', 'Any environment'), envLabel) + opt('sft', SF.src, Object.keys(srcs).sort(), L3('Toda ferramenta', 'Toda herramienta', 'Any tool')) +
      opt('sfst', SF.st, ['open', 'doing', 'risk'], L3('Todo status', 'Todo estado', 'Any status'), function (k) { return T3(STN[k]); }) +
      '<label class="v7-chk"><input type="checkbox" id="sfx"' + (SF.exp ? ' checked' : '') + '> 🌐 ' + esc(L3('só expostas', 'solo expuestas', 'internet-facing only')) + '</label><button type="button" class="btn sm" id="sfclr">' + esc(L3('Limpar', 'Limpiar', 'Clear')) + '</button></div><div id="sfb"></div>';
    el.innerHTML = h;
    function rows() {
      var q = (SF.q || '').toLowerCase();
      return all.filter(function (v) {
        if (SF.sev && v.sev !== SF.sev) return false; if (SF.src && v.src !== SF.src) return false; if (SF.st && v.st !== SF.st) return false; if (SF.exp && !v.exp) return false;
        if (SF.env === 'cloud') { if (ENVS.indexOf(v.env) > 5) return false; } else if (SF.env && v.env !== SF.env) return false;
        if (!q) return true; var n = v.node && node(v.node), s = v.site && site(v.site);
        return [T3(v.t3), n && n.name, n && n.vendor, s && s.name, v.src, v.id, v.cc].join(' ').toLowerCase().indexOf(q) >= 0;
      });
    }
    function draw() {
      var r = rows();
      $('sfb').innerHTML = '<div class="v5-tbl"><table><thead><tr><th>' + esc(L3('Sev.', 'Sev.', 'Sev.')) + '</th><th>' + esc(L3('Achado', 'Hallazgo', 'Finding')) + '</th><th>' + esc(L3('Ativo', 'Activo', 'Asset')) + '</th><th>' + esc(L3('Onde', 'Dónde', 'Where')) + '</th><th>' + esc(L3('Ferramenta', 'Herramienta', 'Tool')) + '</th><th>' + esc(L3('Idade', 'Edad', 'Age')) + '</th><th>' + esc(L3('Dono', 'Dueño', 'Owner')) + '</th><th></th></tr></thead><tbody>' +
        r.slice(0, 250).map(function (v) {
          var n = v.node && node(v.node), s = v.site && site(v.site);
          return '<tr data-v7vg="' + v.id + '" class="v7-row st-' + v.st + '"><td>' + sevPill(v.sev) + '</td><td><b>' + esc(T3(v.t3)) + '</b><small class="mono">' + v.id + (v.exp ? ' · 🌐' : '') + ' · ' + esc(T3(STN[v.st])) + '</small></td>' +
            '<td>' + (n ? '<span class="v7-as">' + tile(n, 20) + '<span>' + esc(n.name) + '<small>' + esc([n.vendor, n.model].filter(Boolean).join(' ') || (K.TYPES[n.type] || n.type)) + '</small></span></span>' : '<span class="v7-as">📱<span>' + v.n + ' ' + esc(L3('aparelhos', 'equipos', 'devices')) + '<small>' + esc(v.srcTool) + '</small></span></span>') + '</td>' +
            '<td>' + (n ? badge(n) + ' ' : '<span class="v5-o sm" style="--oc:#64748B">EP</span> ') + esc(s ? s.name : v.cc || '') + '</td><td>' + esc(v.src) + '</td><td class="mono">' + v.age + 'd</td><td>' + esc(PEOPLE[v.who] || '') + '</td><td><button type="button" class="btn sm" data-v7vg="' + v.id + '">' + esc(L3('Como atuar', 'Cómo actuar', 'How to act')) + ' →</button></td></tr>';
        }).join('') + '</tbody></table></div><p class="note">' + r.length + ' / ' + all.length + (r.length > 250 ? ' · ' + esc(L3('mostrando 250', 'mostrando 250', 'showing 250')) : '') + '</p>';
    }
    var qT; $('sfq').oninput = function () { SF.q = this.value; clearTimeout(qT); qT = setTimeout(draw, 140); };
    [['sfs', 'sev'], ['sfe', 'env'], ['sft', 'src'], ['sfst', 'st']].forEach(function (x) { $(x[0]).onchange = function () { SF[x[1]] = this.value; K.V.sec(el); }; });
    $('sfx').onchange = function () { SF.exp = this.checked; K.V.sec(el); };
    $('sfclr').onclick = function () { SF = { q: '', sev: '', env: '', src: '', st: '', exp: false }; K.V.sec(el); };
    [].forEach.call(el.querySelectorAll('[data-ssrc]'), function (b) { b.onclick = function () { var k = b.getAttribute('data-ssrc'); SF.src = SF.src === k ? '' : k; K.V.sec(el); }; });
    [].forEach.call(el.querySelectorAll('[data-senv]'), function (b) { b.onclick = function () { var k = b.getAttribute('data-senv'); SF.env = SF.env === k ? '' : k; K.V.sec(el); }; });
    [].forEach.call(el.querySelectorAll('.v7-kb'), function (b) { b.onclick = function () { var k = b.getAttribute('data-sk'), v = b.getAttribute('data-sv'); if (!k) return; if (k === 'exp') SF.exp = !SF.exp; else if (k === 'sev') SF.sev = SF.sev === v ? '' : v; else SF.env = SF.env === v ? '' : v; K.V.sec(el); }; });
    draw();
  };

  /* ---------- 4 · LIFECYCLE & LICENCES view ---------- */
  var LF = { q: '', vendor: '', f: '', month: '' };
  K.V.life = function (el) {
    var all = K.nodeList().filter(function (n) { return n.vendor && (n.latest || n.lic || n.eos); });
    var upd = hasUpd, eosD = function (n) { return days(n.eos); }, licD = function (n) { return n.lic ? days(n.lic.until) : null; };
    var h = K.head(L3('Gestão', 'Gestión', 'Management'), L3('Ciclo de vida e licenças', 'Ciclo de vida y licencias', 'Lifecycle & licences'), esc(L3('Versão instalada x última publicada pelo fabricante, fim de suporte e renovação de contratos. Planeje antes de virar incidente.', 'Versión instalada vs. última publicada por el fabricante, fin de soporte y renovación de contratos. Planifica antes de que sea incidente.', 'Installed vs latest vendor release, end of support and contract renewals. Plan before it becomes an incident.')) + ' <span class="v7-demo">' + esc(L3('Versões e datas da demo são fictícias.', 'Versiones y fechas de la demo son ficticias.', 'Demo versions and dates are fictional.')) + '</span>');
    var k1 = all.filter(upd).length, k2 = all.filter(function (n) { var d = eosD(n); return d != null && d < 365; }).length, k3 = all.filter(function (n) { var d = licD(n); return d != null && d < 0; }).length, k4 = all.filter(function (n) { var d = licD(n); return d != null && d >= 0 && d <= 90; }).length;
    h += '<div class="v5-kpis">' + [[k1, L3('Atualização disponível', 'Actualización disponible', 'Update available'), 'upd'], [k2, L3('Fim de suporte em 12 meses', 'Fin de soporte en 12 meses', 'End of support within 12 months'), 'eos'], [k3, L3('Licenças vencidas', 'Licencias vencidas', 'Expired licences'), 'exp'], [k4, L3('Vencem em 90 dias', 'Vencen en 90 días', 'Expiring in 90 days'), 'l90'], [all.length, L3('Ativos com ciclo de vida', 'Activos con ciclo de vida', 'Assets tracked'), '']]
      .map(function (k) { return '<button type="button" class="v5-kpi v7-kb' + (LF.f === k[2] && k[2] ? ' on' : '') + '" data-lf="' + k[2] + '"><b>' + k[0] + '</b><span>' + esc(k[1]) + '</span></button>'; }).join('') + '</div>';
    /* next 12 months: renewals and end-of-support per month */
    var mon = [], d0 = new Date(); for (var i = 0; i < 12; i++) { var d = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth() + i, 1)); mon.push(d.toISOString().slice(0, 7)); }
    var cnt = {}; mon.forEach(function (m) { cnt[m] = { l: 0, e: 0 }; });
    all.forEach(function (n) { if (n.lic && cnt[n.lic.until.slice(0, 7)]) cnt[n.lic.until.slice(0, 7)].l++; if (n.eos && cnt[n.eos.slice(0, 7)]) cnt[n.eos.slice(0, 7)].e++; });
    var mx = 1; mon.forEach(function (m) { mx = Math.max(mx, cnt[m].l + cnt[m].e); });
    var mname = function (m) { try { return new Date(m + '-15').toLocaleDateString(L() === 'en' ? 'en-GB' : L() === 'es' ? 'es-ES' : 'pt-BR', { month: 'short', year: '2-digit' }); } catch (e) { return m; } };
    h += '<section class="panel pad v7-sec"><h2 class="v7-h">' + esc(L3('Próximos 12 meses', 'Próximos 12 meses', 'Next 12 months')) + ' <small>' + esc(L3('clique num mês para filtrar', 'haz clic en un mes para filtrar', 'click a month to filter')) + '</small></h2><div class="v7-cal">' +
      mon.map(function (m) { var c = cnt[m]; return '<button type="button" class="v7-mo' + (LF.month === m ? ' on' : '') + '" data-lm="' + m + '"><span class="v7-mb"><i class="lic" style="height:' + (c.l / mx * 100) + '%"></i><i class="eos" style="height:' + (c.e / mx * 100) + '%"></i></span><b>' + (c.l + c.e || '') + '</b><small>' + esc(mname(m)) + '</small></button>'; }).join('') +
      '</div><div class="v7-leg"><span><i class="lic"></i>' + esc(L3('Renovação de licença / suporte', 'Renovación de licencia / soporte', 'Licence / support renewal')) + '</span><span><i class="eos"></i>' + esc(L3('Fim de suporte', 'Fin de soporte', 'End of support')) + '</span></div></section>';
    var vend = {}; all.forEach(function (n) { var v = vend[n.vendor] = vend[n.vendor] || { t: 0, u: 0 }; v.t++; if (upd(n)) v.u++; });
    h += '<section class="panel pad v7-sec"><h2 class="v7-h">' + esc(L3('Por fabricante', 'Por fabricante', 'By vendor')) + '</h2><div class="v7-vend">' + Object.keys(vend).sort(function (a, b) { return vend[b].u - vend[a].u || vend[b].t - vend[a].t; }).map(function (k) { return '<button type="button" class="v7-vc' + (LF.vendor === k ? ' on' : '') + '" data-lv="' + esc(k) + '"><b>' + esc(k) + '</b><span>' + vend[k].t + (vend[k].u ? ' · <em>↑' + vend[k].u + '</em>' : '') + '</span></button>'; }).join('') + '</div></section>';
    h += '<div class="panel pad v6-cf"><input type="search" id="lfq" placeholder="' + esc(L3('Buscar ativo, modelo, versão, site…', 'Buscar activo, modelo, versión, sitio…', 'Search asset, model, version, site…')) + '" value="' + esc(LF.q) + '"><button type="button" class="btn sm" id="lfclr">' + esc(L3('Limpar filtros', 'Limpiar filtros', 'Clear filters')) + '</button><button type="button" class="btn sm" id="lfx">⬇ CSV</button></div><div id="lfb"></div>';
    el.innerHTML = h;
    function rows() {
      var q = (LF.q || '').toLowerCase();
      return all.filter(function (n) {
        if (LF.vendor && n.vendor !== LF.vendor) return false;
        if (LF.f === 'upd' && !upd(n)) return false; if (LF.f === 'eos') { var e = eosD(n); if (e == null || e >= 365) return false; }
        if (LF.f === 'exp') { var x = licD(n); if (x == null || x >= 0) return false; } if (LF.f === 'l90') { var y = licD(n); if (y == null || y < 0 || y > 90) return false; }
        if (LF.month && !((n.lic && n.lic.until.slice(0, 7) === LF.month) || (n.eos && n.eos.slice(0, 7) === LF.month))) return false;
        var s = K.siteOf(n); return !q || [n.name, n.vendor, n.model, n.version, n.latest, s && s.name].join(' ').toLowerCase().indexOf(q) >= 0;
      }).sort(function (a, b) { var sa = (upd(a) ? 0 : 1) + ((eosD(a) != null && eosD(a) < 365) ? -2 : 0) + ((licD(a) != null && licD(a) < 0) ? -1 : 0), sb = (upd(b) ? 0 : 1) + ((eosD(b) != null && eosD(b) < 365) ? -2 : 0) + ((licD(b) != null && licD(b) < 0) ? -1 : 0); return sa - sb || a.name.localeCompare(b.name); });
    }
    function licCell(n) { if (!n.lic) return '—'; var d = licD(n), cls = d < 0 ? 'bad' : d <= 90 ? 'warn' : 'ok'; return '<span class="v7-lic ' + cls + '">' + esc(fmtD(n.lic.until)) + '</span><small>' + esc(n.lic.kind) + (n.lic.seats ? ' · ' + n.lic.seats + ' ' + esc(L3('licenças', 'licencias', 'seats')) : '') + '</small>'; }
    function draw() {
      var r = rows();
      $('lfb').innerHTML = '<div class="v5-tbl"><table><thead><tr><th></th><th>' + esc(L3('Ativo', 'Activo', 'Asset')) + '</th><th>' + esc(L3('Fabricante / modelo', 'Fabricante / modelo', 'Vendor / model')) + '</th><th>' + esc(L3('Instalada', 'Instalada', 'Installed')) + '</th><th>' + esc(L3('Última publicada', 'Última publicada', 'Latest release')) + '</th><th>' + esc(L3('Fim de suporte', 'Fin de soporte', 'End of support')) + '</th><th>' + esc(L3('Licença / contrato', 'Licencia / contrato', 'Licence / contract')) + '</th><th>' + esc(L3('Site', 'Sitio', 'Site')) + '</th></tr></thead><tbody>' +
        r.map(function (n) { var s = K.siteOf(n), e = eosD(n); return '<tr data-v7node="' + esc(n.id) + '" class="v7-row"><td>' + tile(n, 20) + '</td><td><b>' + esc(n.name) + '</b><small>' + esc(K.TYPES[n.type] || n.type) + '</small></td><td>' + esc(n.vendor) + '<small>' + esc(n.model || '') + '</small></td><td class="mono">' + esc(n.version || '—') + '</td><td class="mono">' + (upd(n) ? '<em class="v6-upd">↑ ' + esc(n.latest) + '</em>' : n.latest ? '<span class="v7-okv">✓ ' + esc(L3('em dia', 'al día', 'current')) + '</span>' : '—') + '</td><td>' + (e != null ? '<span class="v7-lic ' + (e < 180 ? 'bad' : e < 365 ? 'warn' : 'ok') + '">' + esc(fmtD(n.eos)) + '</span><small>' + e + ' ' + esc(L3('dias', 'días', 'days')) + '</small>' : '—') + '</td><td>' + licCell(n) + '</td><td>' + badge(n) + ' ' + esc(s ? s.name : '') + '</td></tr>'; }).join('') +
        '</tbody></table></div><p class="note">' + r.length + ' / ' + all.length + '</p>';
    }
    var qT; $('lfq').oninput = function () { LF.q = this.value; clearTimeout(qT); qT = setTimeout(draw, 140); };
    $('lfclr').onclick = function () { LF = { q: '', vendor: '', f: '', month: '' }; K.V.life(el); };
    [].forEach.call(el.querySelectorAll('[data-lf]'), function (b) { b.onclick = function () { var k = b.getAttribute('data-lf'); LF.f = LF.f === k ? '' : k; K.V.life(el); }; });
    [].forEach.call(el.querySelectorAll('[data-lm]'), function (b) { b.onclick = function () { var k = b.getAttribute('data-lm'); LF.month = LF.month === k ? '' : k; K.V.life(el); }; });
    [].forEach.call(el.querySelectorAll('[data-lv]'), function (b) { b.onclick = function () { var k = b.getAttribute('data-lv'); LF.vendor = LF.vendor === k ? '' : k; K.V.life(el); }; });
    $('lfx').onclick = function () {
      var csv = ['asset,type,vendor,model,installed,latest,update_available,end_of_support,licence,licence_until,site'].concat(rows().map(function (n) { var s = K.siteOf(n); return [n.name, n.type, n.vendor, n.model, n.version, n.latest, upd(n) ? 'yes' : 'no', n.eos || '', n.lic ? n.lic.kind : '', n.lic ? n.lic.until : '', s ? s.name : ''].map(function (v) { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(','); })).join('\n');
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'orbiscale-lifecycle.csv'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    };
    draw();
  };

  /* ---------- 5 · BUSINESS APPLICATIONS view ---------- */
  var AF = { sel: '' };
  var LAYER = [['edge', ['Entrada', 'Entrada', 'Entry'], { lb: 1, apigw: 1, cdn: 1, afw: 1, fw: 1, vpngw: 1, sbc: 1 }], ['app', ['Aplicação', 'Aplicación', 'Application'], { app: 1, vm: 1, k8s: 1, ctr: 1, fn: 1, bot: 1, srv: 1, saas: 1, pbx: 1, iac: 1, mon: 1 }], ['data', ['Dados', 'Datos', 'Data'], { db: 1, obj: 1, stor: 1, kv: 1 }], ['infra', ['Infra e proteção', 'Infra y protección', 'Infra & protection'], { hyp: 1, bkp: 1, dr: 1, vnet: 1, nsg: 1, sw: 1, sec: 1 }]];
  function layerOf(n) { for (var i = 0; i < LAYER.length; i++) if (LAYER[i][2][n.type]) return LAYER[i][0]; return 'app'; }
  function appHealth(a) {
    var w = 'up', ns = a.nodes.filter(node); ns.forEach(function (id) { var s = K.stOf(id).st; if (s === 'down') w = 'down'; else if (s === 'deg' && w !== 'down') w = 'deg'; });
    return ns.length ? w : 'unk';
  }
  var HN = { up: ['Saudável', 'Saludable', 'Healthy'], deg: ['Degradada', 'Degradada', 'Degraded'], down: ['Fora do ar', 'Caída', 'Down'], unk: ['Sem dados', 'Sin datos', 'No data'] };
  K.V.apps = function (el) {
    var per = ls('osc.persona') || 'mgr', V = vulns(), live = APPS.filter(function (a) { return a.nodes.some(node); });
    var h = K.head(L3('Conhecimento', 'Conocimiento', 'Knowledge'), L3('Aplicações de negócio', 'Aplicaciones de negocio', 'Business applications'), esc(L3('Onde cada sistema do negócio roda, do que depende e o que está em risco. Clique numa aplicação para ver a cadeia completa.', 'Dónde corre cada sistema del negocio, de qué depende y qué está en riesgo. Haz clic en una aplicación para ver la cadena completa.', 'Where each business system runs, what it depends on and what is at risk. Click an application to see the whole chain.')));
    if (!live.length) { el.innerHTML = h + '<div class="panel pad">' + esc(L3('Este cenário não tem aplicações mapeadas.', 'Este escenario no tiene aplicaciones mapeadas.', 'This scenario has no mapped applications.')) + '</div>'; return; }
    if (!AF.sel || !live.some(function (a) { return a.id === AF.sel; })) AF.sel = live[0].id;
    h += '<div class="v7-apps">' + live.map(function (a) {
      var ns = a.nodes.filter(node), hv = appHealth(a), vv = V.filter(function (v) { return v.node && ns.indexOf(v.node) >= 0; }), hi = vv.filter(function (v) { return v.sev === 'crit' || v.sev === 'high'; }).length, envs = {};
      ns.forEach(function (id) { envs[prov(node(id))] = 1; });
      return '<button type="button" class="v7-app' + (AF.sel === a.id ? ' on' : '') + '" data-asel="' + a.id + '"><span class="v7-at"><em class="v7-tier t' + a.tier + '">T' + a.tier + '</em><i class="v7-hd ' + hv + '" title="' + esc(T3(HN[hv])) + '"></i></span><b>' + esc(appName(a)) + '</b><span class="v7-am">' + esc(a.owner) + ' · RTO ' + esc(a.rto) + ' · RPO ' + esc(a.rpo) + '</span><span class="v7-ae">' + Object.keys(envs).map(function (e) { return '<i style="--oc:' + (ENVC[e] || '#475569') + '">' + esc(e === 'Microsoft Azure' ? 'Azure' : e === 'Google Cloud' ? 'GCP' : e === 'Oracle Cloud' ? 'OCI' : e === 'IBM Cloud' ? 'IBM' : e) + '</i>'; }).join('') + '</span><span class="v7-an">' + ns.length + ' ' + esc(L3('ativos', 'activos', 'assets')) + (vv.length ? ' · <em class="' + (hi ? 'hi' : '') + '">🛡 ' + vv.length + '</em>' : '') + '</span></button>';
    }).join('') + '</div>';
    var a = live.filter(function (x) { return x.id === AF.sel; })[0], ns = a.nodes.filter(node), vv = V.filter(function (v) { return v.node && ns.indexOf(v.node) >= 0; }), cost = ns.reduce(function (s, id) { return s + (node(id).cost || 0); }, 0), sites = {};
    ns.forEach(function (id) { sites[node(id).site] = 1; });
    h += '<section class="panel pad v7-sec v7-chain"><div class="v7-ch"><div><div class="eyebrow">' + esc(L3('Cadeia da aplicação', 'Cadena de la aplicación', 'Application chain')) + ' · T' + a.tier + '</div><h2>' + esc(appName(a)) + '</h2><p class="v7-p">' + esc(L3('Usuários', 'Usuarios', 'Users')) + ': ' + esc(a.users) + ' · ' + esc(L3('Sites', 'Sitios', 'Sites')) + ': ' + Object.keys(sites).map(function (s) { var x = site(s); return x ? x.name : s; }).map(esc).join(', ') + (cost && per !== 'analyst' ? ' · ' + esc(L3('Custo mensal', 'Costo mensual', 'Monthly cost')) + ': <b>' + money(cost) + '</b>' : '') + '</p></div>' +
      '<div class="v6-acts"><button type="button" class="btn sm pri" data-v6map="' + esc(Object.keys(sites)[0]) + '">◎ ' + esc(L3('Ver no mapa', 'Ver en el mapa', 'Show on map')) + '</button><button type="button" class="btn sm" data-v7appinv="' + a.id + '">' + esc(L3('Inventário', 'Inventario', 'Inventory')) + '</button></div></div>' +
      '<div class="v7-lanes">' + LAYER.map(function (l) {
        var items = ns.filter(function (id) { return layerOf(node(id)) === l[0]; }); if (!items.length) return '';
        return '<div class="v7-lane"><h3>' + esc(T3(l[1])) + '</h3>' + items.map(function (id) { var n = node(id), st = K.stOf(id).st, nv = vv.filter(function (v) { return v.node === id; }); return '<button type="button" class="v7-ln st-' + st + '" data-v7node="' + esc(id) + '">' + tile(n, 22) + '<span><b>' + esc(n.name) + '</b><small>' + esc((K.siteOf(n) || {}).name || '') + '</small></span>' + badge(n) + (nv.length ? '<em class="v7-vn" data-v7vg="' + nv[0].id + '" title="' + esc(T3(nv[0].t3)) + '">🛡' + nv.length + '</em>' : '') + '</button>'; }).join('') + '</div>';
      }).join('<span class="v7-arrow">→</span>') + '</div>' +
      (vv.length ? '<h3 class="v7-h3">🛡 ' + esc(L3('Riscos nesta aplicação', 'Riesgos en esta aplicación', 'Risks in this application')) + '</h3><div class="v6-list">' + vv.slice(0, 8).map(function (v) { return '<button type="button" class="v6-li" data-v7vg="' + v.id + '">' + sevPill(v.sev) + ' <b>' + v.id + '</b> ' + esc(T3(v.t3)) + ' — ' + esc(node(v.node).name) + '</button>'; }).join('') + '</div>' : '<p class="v7-p">✓ ' + esc(L3('Nenhum risco aberto nesta aplicação.', 'Ningún riesgo abierto en esta aplicación.', 'No open risks in this application.')) + '</p>') + '</section>';
    el.innerHTML = h;
    [].forEach.call(el.querySelectorAll('[data-asel]'), function (b) { b.onclick = function () { AF.sel = b.getAttribute('data-asel'); K.V.apps(el); var c = el.querySelector('.v7-chain'); if (c && c.scrollIntoView) c.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }; });
  };

  /* ---------- 6 · endpoints: management tools strip on top of the existing view ---------- */
  var endp0 = K.V.endp;
  if (endp0) K.V.endp = function (el) {
    endp0(el);
    var eps = K.EPS ? K.EPS() : []; if (!eps.length) return;
    var by = {}; eps.forEach(function (d) { var k = d.src || 'Microsoft Intune', b = by[k] = by[k] || { t: 0, ok: 0, nc: 0, vdi: 0 }; b.t++; if (/^compliant/i.test(d.compliance || '')) b.ok++; if (/noncompliant/i.test(d.compliance || '')) b.nc++; if (d.vdi) b.vdi++; });
    var KIND = { 'Microsoft Intune': 'MDM · Windows, iOS, Android', 'IBM MaaS360': 'MDM · iOS, Android', 'Jamf Pro': 'MDM · macOS', 'AWS WorkSpaces': 'VDI · AWS', 'Azure Virtual Desktop': 'VDI · Azure', 'IBM Cloud VSI (VDI)': 'VDI · IBM Cloud' };
    var box = document.createElement('section'); box.className = 'panel pad v7-sec v7-epsrc';
    box.innerHTML = '<h2 class="v7-h">' + esc(L3('Ferramentas de gestão', 'Herramientas de gestión', 'Management tools')) + ' <small>' + esc(L3('clique para filtrar · % conforme', 'haz clic para filtrar · % conforme', 'click to filter · % compliant')) + '</small></h2><div class="v7-tools">' +
      Object.keys(by).sort(function (a, b) { return by[b].t - by[a].t; }).map(function (k) { var b = by[k], pc = Math.round(b.ok / b.t * 100); return '<button type="button" class="v7-tool" data-epsrc="' + esc(k) + '"><i style="background:' + (pc >= 85 ? 'var(--ok)' : pc >= 70 ? 'var(--warn)' : 'var(--crit)') + '"></i><b>' + esc(k) + '</b><small>' + esc(KIND[k] || '') + '</small><span>' + b.t + ' · ' + pc + '%' + (b.nc ? ' · <em>' + b.nc + ' ' + esc(L3('não conf.', 'no conf.', 'non-comp.')) + '</em>' : '') + '</span></button>'; }).join('') +
      '</div><p class="v7-demo">' + esc(L3('Demo: aparelhos e pessoas gerados (fictícios). Em produção cada ferramenta entra por API somente leitura (Graph, MaaS360, Jamf, AWS, IBM Cloud).', 'Demo: equipos y personas generados (ficticios). En producción cada herramienta entra por API de solo lectura (Graph, MaaS360, Jamf, AWS, IBM Cloud).', 'Demo: generated devices and people (fictional). In production each tool comes in through a read-only API (Graph, MaaS360, Jamf, AWS, IBM Cloud).')) + '</p>';
    var head = el.querySelector('.vhead'); if (head) head.parentNode.insertBefore(box, head.nextSibling);
    [].forEach.call(box.querySelectorAll('[data-epsrc]'), function (b) { b.onclick = function () { if (K.endpFilter) K.endpFilter({ src: b.getAttribute('data-epsrc'), view: 'dev' }); K.V.endp(el); }; });
  };

  /* ---------- 7 · VOICE INTAKE: audio / WhatsApp message → classified demand on the map ---------- */
  var SAMPLES = {
    pt: [['0:14', 'Oi, aqui é a Carla de Lima. A VPN do escritório caiu de novo desde as nove, ninguém consegue acessar o ERP. É urgente, hoje tem fechamento.'], ['0:09', 'Bom dia, sou do financeiro em Buenos Aires. Preciso de acesso ao Power BI para um colega novo que começa segunda.'], ['0:11', 'Pessoal, a impressora do terceiro andar em São Paulo está offline de novo, já reiniciei e nada.'], ['0:12', 'O Wi-Fi das salas de reunião em Austin cai toda vez que tem call no Teams.']],
    es: [['0:13', 'Hola, soy Carla de Lima. La VPN de la oficina se cayó otra vez desde las nueve, nadie puede entrar al ERP. Es urgente, hoy tenemos cierre.'], ['0:09', 'Buen día, soy de finanzas en Buenos Aires. Necesito acceso a Power BI para un compañero nuevo que empieza el lunes.'], ['0:10', 'Chicos, la impresora del tercer piso en São Paulo está offline otra vez, ya la reinicié y nada.'], ['0:12', 'El Wi-Fi de las salas de reunión en Austin se cae cada vez que hay una llamada de Teams.']],
    en: [['0:12', 'Hi, this is Carla from Lima. The office VPN went down again since nine, nobody can reach the ERP. It is urgent, we close the month today.'], ['0:08', 'Morning, finance in Buenos Aires here. I need Power BI access for a new colleague who starts on Monday.'], ['0:10', 'Folks, the third-floor printer in São Paulo is offline again, I already restarted it and nothing.'], ['0:11', 'The meeting-room Wi-Fi in Austin drops every time there is a Teams call.']]
  };
  var CITY = [['lima', 'pe-lima'], ['buenos aires', 'ar-bsas'], ['pilar', 'ar-pilar'], ['são paulo|sao paulo', 'br-sp-hq'], ['campinas', 'br-campinas'], ['bogot', 'co-bogota'], ['santiago', 'cl-santiago'], ['méxico|mexico|cdmx', 'mx-cdmx'], ['quito', 'ec-quito'], ['montevid', 'uy-mvd'], ['montr', 'ca-mtl'], ['austin', 'us-austin'], ['new york|nova york|nueva york', 'us-newyork'], ['london|londres', 'gb-london'], ['frankfurt', 'de-frankfurt'], ['singap', 'sg-singapore'], ['tokyo|tóquio|tokio', 'jp-tokyo'], ['sydney', 'au-sydney'], ['paris', 'fr-paris'], ['amsterd', 'nl-amsterdam'], ['madrid', 'es-madrid'], ['hong kong', 'hk-hongkong'], ['dubai', 'ae-dubai'], ['johannes|joanesburgo', 'za-johannesburg'], ['bengal|bangal', 'in-bengaluru']];
  var ASSET = [['vpn|firewall|fortigate', ['fw', 'vpngw'], 'net'], ['wi-?fi|wireless|wifi', ['ap'], 'net'], ['switch', ['sw'], 'net'], ['internet|link|enlace|conex', ['isp'], 'net'], ['impressora|impresora|printer', ['print'], 'sd'], ['telefone|teléfono|phone|ramal|sip|chamada perdida', ['sbc', 'pbx'], 'voice'], ['servidor|server', ['srv', 'hyp', 'vm'], 'infra']];
  var APPK = [['erp', 'erp'], ['power ?bi|relat[óo]rio|report', 'bi'], ['crm|portal', 'crm'], ['pedido|order', 'orders'], ['senha|contraseña|password|mfa|login|acesso ao e-?mail', 'idp'], ['teams phone|telefone|teléfono', 'voice']];
  function rx(s) { return new RegExp(s, 'i'); }
  function classify(text) {
    var t = (text || '').toLowerCase(), out = { site: '', node: '', app: '', type: 'question', sev: 'P2', fam: 'sd', mood: 'neutral', conf: 0 };
    CITY.some(function (c) { if (rx(c[0]).test(t) && site(c[1])) { out.site = c[1]; return true; } return false; });
    var am = null; ASSET.some(function (a) { var m = t.match(rx(a[0])); if (m) { am = a; out.term = m[0]; return true; } return false; });
    if (am) {
      out.fam = am[2];
      var cand = K.nodeList().filter(function (n) { return (!out.site || n.site === out.site) && (am[1].indexOf(n.type) >= 0 || (am[1][0] === 'print' && /print/i.test(n.name + ' ' + (n.role || '')))); });
      if (cand[0]) { out.node = cand[0].id; if (!out.site) out.site = cand[0].site; }
    }
    APPK.some(function (a) { if (rx(a[0]).test(t)) { out.app = a[1]; return true; } return false; });
    if (/ca[ií]u|caiu|cay[oó]|fora do ar|offline|down|não funciona|no funciona|not working|lento|slow|erro|error|travou|drops|se cae|cai /.test(t)) out.type = 'incident';
    else if (/acesso|acceso|access|preciso|necesito|need|novo|nuevo|new|instalar|install/.test(t)) out.type = 'request';
    if (/urgente|urgent|parad|ningu[ée]m|nadie|nobody|todos|everyone|fechamento|cierre|close the month/.test(t)) out.sev = 'P0'; else if (out.type === 'incident') out.sev = 'P1'; else out.sev = 'P2';
    if (/de novo|otra vez|again|sempre|siempre|always|toda vez|cada vez|every time|!!/.test(t)) out.mood = 'frustrated';
    if (out.app === 'idp' || out.app === 'bi' || out.app === 'crm') out.fam = out.fam === 'sd' ? 'app' : out.fam;
    out.conf = Math.round(([out.site, out.node || out.app, out.type !== 'question'].filter(Boolean).length / 3) * 100);
    var first = (text || '').split(/[.!?]/).filter(function (x) { return x.trim().length > 12; })[1] || (text || '').split(/[.!?]/)[0] || '';
    out.summary = first.trim().slice(0, 96);
    return out;
  }
  var QUEUE = { net: ['Rede · NOC', 'Red · NOC', 'Network · NOC'], voice: ['Telefonia', 'Telefonía', 'Telephony'], infra: ['Infra · servidores', 'Infra · servidores', 'Infra · servers'], app: ['Aplicações', 'Aplicaciones', 'Applications'], sd: ['Service desk N1', 'Service desk N1', 'Service desk L1'] };
  var OWN = { net: 'alex', voice: 'helena', infra: 'gabriel', app: 'julia', sd: 'igor' };
  var TYN = { incident: ['Incidente', 'Incidente', 'Incident'], request: ['Requisição', 'Solicitud', 'Request'], question: ['Dúvida', 'Consulta', 'Question'] };
  var SLA = { P0: ['30 minutos', '30 minutos', '30 minutes'], P1: ['2 horas', '2 horas', '2 hours'], P2: ['1 dia útil', '1 día hábil', '1 business day'] };
  function loadVoice() { try { return JSON.parse(ls('osc.voice7') || '[]'); } catch (e) { return []; } }
  loadVoice().forEach(function (d) { if (!D.demands.some(function (x) { return x.id === d.id; })) D.demands.unshift(d); });
  function voiceModal() {
    var l = L(), box = document.createElement('div'); box.className = 'v5-modal'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var siteOpts = Object.keys(SN.sites).filter(function (k) { return site(k); }).map(function (k) { return '<option value="' + esc(k) + '">' + esc(SN.sites[k].name) + '</option>'; }).join('');
    box.innerHTML = '<div class="v5-mbox v7-vbox"><div class="v5-mh"><b>🎙 ' + esc(L3('Nova demanda por voz', 'Nueva demanda por voz', 'New work item by voice')) + '</b><button type="button" class="v5-x" aria-label="×">×</button></div>' +
      '<div class="v7-tabs"><button type="button" data-vt="wa" aria-pressed="true">💬 ' + esc(L3('Exemplos WhatsApp', 'Ejemplos WhatsApp', 'WhatsApp samples')) + '</button><button type="button" data-vt="mic" aria-pressed="false">🎙 ' + esc(L3('Falar', 'Hablar', 'Speak')) + '</button><button type="button" data-vt="kb" aria-pressed="false">⌨ ' + esc(L3('Digitar', 'Escribir', 'Type')) + '</button></div>' +
      '<div class="v7-tp" data-vp="wa"><div class="v7-wa">' + (SAMPLES[l] || SAMPLES.pt).map(function (s, i) { return '<button type="button" class="v7-bub" data-vs="' + i + '"><span class="v7-play">▶</span><span class="v7-wave">' + new Array(22).join('<i></i>') + '</span><small>' + s[0] + '</small></button>'; }).join('') + '</div></div>' +
      '<div class="v7-tp" data-vp="mic" hidden>' + (SR ? '<button type="button" class="btn pri" id="v7rec">● ' + esc(L3('Começar a falar', 'Empezar a hablar', 'Start speaking')) + '</button><p class="v5-note">' + esc(L3('O reconhecimento de voz do navegador pode enviar o áudio ao serviço de fala do fornecedor do navegador (Chrome/Edge). Nada é enviado ao Orbiscale nem gravado.', 'El reconocimiento de voz del navegador puede enviar el audio al servicio de voz del proveedor del navegador (Chrome/Edge). No se envía nada a Orbiscale ni se graba.', 'The browser speech recognition may send audio to the browser vendor’s speech service (Chrome/Edge). Nothing is sent to Orbiscale or stored.')) + '</p>' : '<p class="v5-note">' + esc(L3('Este navegador não oferece reconhecimento de voz. Use os exemplos ou digite.', 'Este navegador no ofrece reconocimiento de voz. Usa los ejemplos o escribe.', 'This browser has no speech recognition. Use the samples or type.')) + '</p>') + '</div>' +
      '<label class="v7-lbl">' + esc(L3('Transcrição', 'Transcripción', 'Transcript')) + '</label><textarea id="v7tx" rows="3" placeholder="' + esc(L3('A transcrição aparece aqui (dá para corrigir)…', 'La transcripción aparece aquí (se puede corregir)…', 'The transcript shows up here (you can edit it)…')) + '"></textarea>' +
      '<div class="v5-mf" style="justify-content:flex-start"><button type="button" class="btn pri" id="v7an">' + esc(L3('Analisar', 'Analizar', 'Analyse')) + '</button></div><div id="v7out"></div>' +
      '<p class="v5-note">' + esc(L3('Demo 100% no navegador, com regras simples no lugar do modelo. Na versão real: WhatsApp Business Platform → transcrição (ex.: Whisper ou Azure AI Speech) → LLM com rubrica → revisão humana. Consentimento LGPD antes do primeiro áudio. Veja docs/voice-intake.md.', 'Demo 100% en el navegador, con reglas simples en lugar del modelo. En la versión real: WhatsApp Business Platform → transcripción (ej.: Whisper o Azure AI Speech) → LLM con rúbrica → revisión humana. Consentimiento LGPD antes del primer audio. Ver docs/voice-intake.md.', 'Demo runs 100% in the browser, with simple rules instead of the model. The real version: WhatsApp Business Platform → transcription (e.g. Whisper or Azure AI Speech) → LLM with a rubric → human review. Privacy consent before the first audio. See docs/voice-intake.md.')) + '</p></div>';
    document.body.appendChild(box);
    var tx = box.querySelector('#v7tx'), out = box.querySelector('#v7out'), rec = null, typing = null;
    function close() { try { if (rec) rec.stop(); } catch (e) { /* ok */ } clearInterval(typing); box.remove(); }
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.closest('.v5-x')) return close();
      var tb = e.target.closest('[data-vt]'); if (tb) { [].forEach.call(box.querySelectorAll('[data-vt]'), function (b) { b.setAttribute('aria-pressed', String(b === tb)); }); [].forEach.call(box.querySelectorAll('[data-vp]'), function (p) { p.hidden = p.getAttribute('data-vp') !== tb.getAttribute('data-vt'); }); if (tb.getAttribute('data-vt') === 'kb') tx.focus(); return; }
      var sb = e.target.closest('[data-vs]'); if (sb) {
        var s = (SAMPLES[l] || SAMPLES.pt)[+sb.getAttribute('data-vs')][1], i = 0; clearInterval(typing); tx.value = ''; out.innerHTML = '';
        [].forEach.call(box.querySelectorAll('.v7-bub'), function (b) { b.classList.toggle('on', b === sb); });
        typing = setInterval(function () { i += 3; tx.value = s.slice(0, i); if (i >= s.length) { clearInterval(typing); analyse(); } }, 18);
      }
    });
    var rb = box.querySelector('#v7rec');
    if (rb) rb.onclick = function () {
      if (rec) { rec.stop(); return; }
      rec = new SR(); rec.lang = l === 'es' ? 'es-ES' : l === 'en' ? 'en-US' : 'pt-BR'; rec.interimResults = true; rec.continuous = true;
      var base = tx.value ? tx.value + ' ' : '';
      rec.onresult = function (ev) { var s = ''; for (var i = 0; i < ev.results.length; i++) s += ev.results[i][0].transcript; tx.value = base + s; };
      rec.onend = function () { rec = null; rb.textContent = '● ' + L3('Começar a falar', 'Empezar a hablar', 'Start speaking'); rb.classList.remove('rec'); if (tx.value.trim()) analyse(); };
      rec.onerror = function (ev) { K.toast(L3('Microfone indisponível: ', 'Micrófono no disponible: ', 'Microphone unavailable: ') + (ev.error || '')); };
      try { rec.start(); rb.textContent = '■ ' + L3('Parar', 'Detener', 'Stop'); rb.classList.add('rec'); } catch (e) { rec = null; }
    };
    box.querySelector('#v7an').onclick = analyse;
    function analyse() {
      var text = tx.value.trim(); if (!text) { tx.focus(); return; }
      var c = classify(text), n = c.node && node(c.node), ap = APPS.filter(function (a) { return a.id === c.app; })[0], s = c.site && site(c.site);
      var id = 'VOZ-' + (100 + loadVoice().length + 1);
      var reply = L3('Oi! Recebemos sua mensagem', '¡Hola! Recibimos tu mensaje', 'Hi! We got your message') + (c.term ? L3(' sobre ', ' sobre ', ' about ') + (/^vpn$|^wi-?fi$/i.test(c.term) ? c.term.toUpperCase().replace('WIFI', 'WI-FI') : c.term) : ap ? L3(' sobre ', ' sobre ', ' about ') + appName(ap) : '') + (s ? L3(' em ', ' en ', ' at ') + s.name : '') + '. ' + L3('Abrimos o chamado ', 'Abrimos el ticket ', 'We opened ticket ') + id + ' (' + c.sev + '). ' + L3('Próxima atualização em até ', 'Próxima actualización en hasta ', 'Next update within ') + T3(SLA[c.sev]) + '.';
      var json = { id: id, channel: 'whatsapp', type: c.type, priority: c.sev, site: c.site || null, asset: c.node || null, app: c.app || null, queue: T3(QUEUE[c.fam]), sentiment: c.mood, confidence: c.conf / 100, needs_human_review: true };
      out.innerHTML = '<div class="v7-res"><div class="v7-rg"><label>' + esc(L3('Tipo', 'Tipo', 'Type')) + '<select id="v7ty">' + Object.keys(TYN).map(function (k) { return '<option value="' + k + '"' + (k === c.type ? ' selected' : '') + '>' + esc(T3(TYN[k])) + '</option>'; }).join('') + '</select></label>' +
        '<label>' + esc(L3('Prioridade', 'Prioridad', 'Priority')) + '<select id="v7pr">' + ['P0', 'P1', 'P2'].map(function (k) { return '<option' + (k === c.sev ? ' selected' : '') + '>' + k + '</option>'; }).join('') + '</select></label>' +
        '<label>' + esc(L3('Site', 'Sitio', 'Site')) + '<select id="v7si"><option value="">—</option>' + siteOpts + '</select></label>' +
        '<label>' + esc(L3('Resumo', 'Resumen', 'Summary')) + '<input id="v7su" value="' + esc(c.summary) + '"></label></div>' +
        '<div class="v7-rk"><span>' + esc(L3('Ativo sugerido', 'Activo sugerido', 'Suggested asset')) + '</span><b>' + (n ? tile(n, 18) + ' ' + esc(n.name) : '—') + '</b><span>' + esc(L3('Aplicação', 'Aplicación', 'Application')) + '</span><b>' + (ap ? esc(appName(ap)) : '—') + '</b><span>' + esc(L3('Fila', 'Cola', 'Queue')) + '</span><b>' + esc(T3(QUEUE[c.fam])) + ' · ' + esc(PEOPLE[OWN[c.fam]] || '') + '</b><span>' + esc(L3('Humor', 'Ánimo', 'Mood')) + '</span><b>' + (c.mood === 'frustrated' ? '😤 ' + esc(L3('frustrado (reincidência)', 'frustrado (reincidencia)', 'frustrated (repeat issue)')) : '🙂 ' + esc(L3('neutro', 'neutro', 'neutral'))) + '</b><span>' + esc(L3('Confiança', 'Confianza', 'Confidence')) + '</span><b><span class="v7-cf"><i style="width:' + c.conf + '%"></i></span> ' + c.conf + '%</b></div>' +
        '<label class="v7-lbl">' + esc(L3('Resposta sugerida para o WhatsApp', 'Respuesta sugerida para WhatsApp', 'Suggested WhatsApp reply')) + '</label><div class="v7-reply">' + esc(reply) + '</div>' +
        '<details class="v7-json"><summary>JSON</summary><pre class="v5-pre">' + esc(JSON.stringify(json, null, 2)) + '</pre></details>' +
        '<div class="v5-mf"><button type="button" class="btn" id="v7clr">' + esc(L3('Apagar demandas de voz da demo', 'Borrar demandas de voz de la demo', 'Clear demo voice items')) + '</button><button type="button" class="btn pri" id="v7ok">' + esc(L3('Criar demanda (rascunho)', 'Crear demanda (borrador)', 'Create work item (draft)')) + '</button></div></div>';
      if (c.site) out.querySelector('#v7si').value = c.site;
      out.querySelector('#v7clr').onclick = function () { var ids = loadVoice().map(function (d) { return d.id; }); ls('osc.voice7', '[]'); for (var i = D.demands.length - 1; i >= 0; i--) if (ids.indexOf(D.demands[i].id) >= 0) D.demands.splice(i, 1); VULN = null; K.toast(L3('Demandas de voz removidas.', 'Demandas de voz eliminadas.', 'Voice items removed.')); close(); K.render(); };
      out.querySelector('#v7ok').onclick = function () {
        var sid = out.querySelector('#v7si').value; if (!sid) { out.querySelector('#v7si').focus(); K.toast(L3('Escolha o site.', 'Elige el sitio.', 'Pick the site.')); return; }
        var d = { id: id, ch: 'voice', origin: 'WhatsApp · ' + L3('áudio', 'audio', 'voice note') + ' (demo)', site: sid, node: c.node && node(c.node) && node(c.node).site === sid ? c.node : undefined, who: OWN[c.fam] || 'igor', sev: out.querySelector('#v7pr').value, age: 0, st: 'open', t: out.querySelector('#v7su').value || text.slice(0, 90), voice: true, kind: out.querySelector('#v7ty').value, tx: text };
        var list = loadVoice(); list.push(d); ls('osc.voice7', JSON.stringify(list.slice(-20))); D.demands.unshift(d);
        close(); K.toast(L3('Demanda ', 'Demanda ', 'Work item ') + id + L3(' criada — veja o pin no mapa.', ' creada — mira el pin en el mapa.', ' created — see the pin on the map.'));
        K.go('dem', 'id:' + id);
      };
    }
  }
  K.voiceIntake = voiceModal;
  var dem1 = K.V.dem;
  K.V.dem = function (el) {
    dem1(el);
    var act = el.querySelector('.vhead .act'), b = '<button type="button" class="btn pri" data-v7voice>🎙 ' + esc(L3('Nova demanda por voz', 'Nueva demanda por voz', 'New item by voice')) + '</button>';
    if (act) { if (!act.querySelector('[data-v7voice]')) act.insertAdjacentHTML('afterbegin', b); }
    else { var hd = el.querySelector('.vhead'); if (hd) hd.insertAdjacentHTML('beforeend', '<div class="act">' + b + '</div>'); }
  };
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-v7voice]')) { e.preventDefault(); voiceModal(); } });

  (function () { var hv = (location.hash || '').slice(1); if (hv === 'sec' || hv === 'life' || hv === 'apps') setTimeout(function () { K.go(hv); }, 80); if (/[?&]voice\b/.test(location.search)) setTimeout(function () { K.go('dem'); setTimeout(voiceModal, 300); }, 120); })();
})();
