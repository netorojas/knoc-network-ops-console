/*!
 * Orbiscale · v5 modules: multicloud origin badges, Demands on the map, FinOps (Enterprise module with persona RBAC)
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). SPDX-License-Identifier: AGPL-3.0-or-later
 * Commercial licence: see COMMERCIAL.md. Demo data is fictional; nothing here sends data anywhere.
 */
(function () {
  'use strict';
  var K = window.KNOC, D = window.ORB_V5; if (!K || !D) return;

  /* ---------- tiny helpers ---------- */
  function L() { try { return K.getL(); } catch (e) { return 'pt'; } }
  function L3(pt, es, en) { var l = L(); return l === 'es' ? es : l === 'en' ? en : pt; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function money(v, short) {
    v = Math.round(v || 0);
    if (short && v >= 1000) return 'US$ ' + (v / 1000).toFixed(v >= 100000 ? 0 : 1).replace('.', L() === 'en' ? '.' : ',') + 'k';
    return 'US$ ' + v.toLocaleString(L() === 'en' ? 'en-US' : 'pt-BR');
  }
  function site(id) { return K.siteOf({ site: id }); }
  function nodes() { return K.nodeList(); }
  function node(id) { return nodes().filter(function (n) { return n.id === id; })[0] || null; }

  /* ---------- origin: on-prem vs which cloud ---------- */
  var PROV = {
    'Microsoft Azure': { k: 'AZURE', c: '#2F7FD8' }, 'AWS': { k: 'AWS', c: '#D9822B' }, 'Google Cloud': { k: 'GCP', c: '#2E9E5B' },
    'Oracle Cloud': { k: 'OCI', c: '#C2453A' }, 'IBM Cloud': { k: 'IBM', c: '#7B5CE0' }, 'SaaS': { k: 'SAAS', c: '#0EA5A4' }, 'On-prem': { k: 'ON-PREM', c: '#64748B' }
  };
  var PORDER = ['Microsoft Azure', 'AWS', 'Google Cloud', 'Oracle Cloud', 'IBM Cloud', 'SaaS', 'On-prem'];
  function provOfSite(s) { if (!s) return 'SaaS'; if (s.kind !== 'cloud') return 'On-prem'; return s.provider || 'Microsoft Azure'; }
  function provOfNode(n) { if (n.type === 'saas') return 'SaaS'; return provOfSite(K.siteOf(n)); }
  function badge(p, small) { var m = PROV[p] || PROV['On-prem']; return '<span class="v5-o' + (small ? ' sm' : '') + '" style="--oc:' + m.c + '">' + esc(m.k) + '</span>'; }
  K.provOf = provOfNode; K.originBadge = function (n) { return badge(provOfNode(n), 1); };
  K.originTag = function (it) {
    var p = it.lay === 'saas' ? 'SaaS' : provOfSite(it.site || site(it.go));
    return '<span class="lv-k v5-o" style="--oc:' + (PROV[p] || PROV['On-prem']).c + '">' + esc((PROV[p] || PROV['On-prem']).k) + '</span>';
  };
  /* more readable type names for cloud network objects */
  var TX = { nsg: 'NSG / Security group', afw: 'Cloud firewall', vpngw: 'VPN / Transit gateway', vnet: 'VNet / VPC / VCN', sub: 'Subnet', lb: 'Load balancer' };
  Object.keys(TX).forEach(function (k) { if (K.TYPES && !K.TYPES[k]) K.TYPES[k] = TX[k]; });

  /* ---------- demands ---------- */
  var CH = {
    ticket: { i: '🎫', pt: 'Chamados', es: 'Tickets', en: 'Tickets' }, project: { i: '📁', pt: 'Projetos', es: 'Proyectos', en: 'Projects' },
    email: { i: '✉', pt: 'E-mails', es: 'Correos', en: 'E-mails' }, meeting: { i: '📅', pt: 'Reuniões', es: 'Reuniones', en: 'Meetings' },
    teams: { i: '💬', pt: 'Teams', es: 'Teams', en: 'Teams' }, change: { i: '🔁', pt: 'Mudanças · CAB', es: 'Cambios · CAB', en: 'Changes · CAB' },
    alert: { i: '⚡', pt: 'Alertas', es: 'Alertas', en: 'Alerts' }, finding: { i: '🛡', pt: 'Segurança', es: 'Seguridad', en: 'Security' }
  };
  var CORD = ['ticket', 'project', 'email', 'meeting', 'teams', 'change', 'alert', 'finding'];
  function chName(k) { var c = CH[k]; return c ? c[L()] || c.pt : k; }
  function liveDemands() { return D.demands.filter(function (d) { return site(d.site); }); }
  function liveFindings() { return D.findings.filter(function (f) { return site(f.site); }); }
  function stName(s) { return { open: L3('aberto', 'abierto', 'open'), doing: L3('em andamento', 'en curso', 'in progress'), blocked: L3('travado', 'bloqueado', 'blocked') }[s] || s; }
  var SEV = {}; ['crit', 'high', 'med', 'low'].forEach(function (k) { Object.defineProperty(SEV, k, { get: function () { return { crit: L3('CRÍTICO', 'CRÍTICO', 'CRITICAL'), high: L3('ALTO', 'ALTO', 'HIGH'), med: L3('MÉDIO', 'MEDIO', 'MEDIUM'), low: L3('BAIXO', 'BAJO', 'LOW') }[k]; } }); });
  function avatar(who) {
    var nm = D.people[who] || who, ini = nm.replace(/\(.*\)/, '').trim().split(/\s+/).map(function (x) { return x[0]; }).join('').slice(0, 2).toUpperCase(), h = 0;
    for (var i = 0; i < who.length; i++) h = (h * 31 + who.charCodeAt(i)) % 360;
    return '<span class="v5-av" style="--ah:' + h + '" title="' + esc(nm) + '">' + esc(ini) + '</span>';
  }

  /* map card strip: what lives at this site */
  K.cardExtra = function (it) {
    var ids = [it.id]; if (it.go) ids.push(it.go);
    var ds = liveDemands().filter(function (d) { return ids.indexOf(d.site) >= 0; }), fs = liveFindings().filter(function (f) { return ids.indexOf(f.site) >= 0; });
    if (!ds.length && !fs.length) return '';
    var c = {}; ds.forEach(function (d) { c[d.ch] = (c[d.ch] || 0) + 1; }); if (fs.length) c.finding = fs.length;
    return '<button type="button" class="v5-strip" data-go="dem" data-arg="site:' + esc(it.go || it.id) + '" title="' + esc(L3('Demandas que moram aqui — abrir', 'Demandas que viven aquí — abrir', 'Work that lives here — open')) + '">' +
      CORD.filter(function (k) { return c[k]; }).map(function (k) { return '<span class="' + (k === 'finding' ? 'f' : '') + '">' + CH[k].i + ' ' + c[k] + '</span>'; }).join('') + '</button>';
  };

  /* ---------- routing args + deep links ---------- */
  var V5 = { arg: null };
  var go1 = K.go; K.go = function (v, a) { if (v === 'dem' || v === 'finops') V5.arg = a || null; return go1.apply(this, arguments); };
  function showOnMap(siteId) { K.go('map'); setTimeout(function () { try { K.MAP.selItem(siteId); } catch (e) { /* item may be pruned in this scenario */ } }, 420); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-v5]'); if (!b) return;
    var a = b.getAttribute('data-v5'), v = b.getAttribute('data-v');
    if (a === 'map') { e.preventDefault(); showOnMap(v); }
    else if (a === 'node') { e.preventDefault(); K.openNode(v); }
    else if (a === 'topo') { e.preventDefault(); K.go('topo', v); }
    else if (a === 'ch') { V5.ch = v; K.render(); }
    else if (a === 'tab') { V5.tab = v; K.render(); }
    else if (a === 'clr') { V5.arg = null; V5.ch = ''; K.render(); }
    else if (a === 'persona') { ls('osc.persona', v); K.render(); }
    else if (a === 'ticket' || a === 'teams') { e.preventDefault(); draft(a, v); }
  });
  (function () { var m = location.search.match(/[?&]dem=([A-Za-z0-9-]+)/); var hv = (location.hash || '').slice(1); if (m) setTimeout(function () { K.go('dem', 'id:' + m[1]); }, 60); else if (hv === 'dem' || hv === 'finops') setTimeout(function () { K.go(hv); }, 60); })();

  /* ---------- simulated ITSM / Teams draft (nothing is sent) ---------- */
  function draft(kind, id) {
    var f = D.findings.filter(function (x) { return x.id === id; })[0], r = D.recs.filter(function (x) { return x.id === id; })[0], n, title, body, to;
    if (f) { n = node(f.node); title = '[' + (SEV[f.sev] || f.sev) + '] ' + f.ctl + ' — ' + (n ? n.name : f.node); body = L3('Recurso', 'Recurso', 'Resource') + ': ' + (n ? n.name + ' (' + (site(f.site) || {}).name + ')' : f.node) + '\n' + L3('Origem', 'Origen', 'Origin') + ': Orbiscale Discovery (read-only)\n' + L3('Sugestão', 'Sugerencia', 'Suggestion') + ': ' + f.fix; to = kind === 'teams' ? f.tm : f.q; }
    else if (r) { n = r.node && node(r.node); title = 'FinOps · ' + r.t; body = (n ? L3('Recurso', 'Recurso', 'Resource') + ': ' + n.name + '\n' : '') + L3('Economia estimada', 'Ahorro estimado', 'Estimated saving') + ': ' + money(r.save) + '/' + L3('mês', 'mes', 'month') + '\n' + L3('Esforço', 'Esfuerzo', 'Effort') + ': ' + r.eff; to = kind === 'teams' ? 'Teams · #finops' : 'ITSM · Cloud Ops'; }
    else return;
    var box = document.createElement('div'); box.className = 'v5-modal'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<div class="v5-mbox"><div class="v5-mh"><b>' + (kind === 'teams' ? '💬 ' + L3('Mensagem para o Teams', 'Mensaje para Teams', 'Teams message') : '🎫 ' + L3('Novo chamado no ITSM', 'Nuevo ticket en el ITSM', 'New ITSM ticket')) + '</b><button type="button" class="v5-x" aria-label="×">×</button></div>' +
      '<div class="v5-mr"><span>' + L3('Destino', 'Destino', 'To') + '</span><b>' + esc(to) + '</b></div><div class="v5-mr"><span>' + L3('Título', 'Título', 'Title') + '</span><b>' + esc(title) + '</b></div>' +
      '<pre class="v5-pre">' + esc(body) + '</pre><p class="v5-note">' + esc(L3('Demo: nada é enviado. Em produção o Orbiscale usa o conector do ITSM (ServiceNow, ManageEngine, Jira) ou um webhook do Teams aprovado pelo time, sempre com revisão humana antes de abrir.', 'Demo: no se envía nada. En producción Orbiscale usa el conector del ITSM (ServiceNow, ManageEngine, Jira) o un webhook de Teams aprobado por el equipo, siempre con revisión humana antes de crear.', 'Demo: nothing is sent. In production Orbiscale uses the ITSM connector (ServiceNow, ManageEngine, Jira) or a team-approved Teams webhook, always with human review before creating.')) + '</p>' +
      '<div class="v5-mf"><button type="button" class="btn v5-x">' + L3('Cancelar', 'Cancelar', 'Cancel') + '</button><button type="button" class="btn pri v5-ok">' + (kind === 'teams' ? L3('Enviar (simulação)', 'Enviar (simulación)', 'Send (simulation)') : L3('Criar (simulação)', 'Crear (simulación)', 'Create (simulation)')) + '</button></div></div>';
    document.body.appendChild(box);
    var close = function () { box.remove(); };
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.v5-x')) close(); });
    box.querySelector('.v5-ok').onclick = function () {
      var st = JSON.parse(ls('osc.v5done') || '{}'); st[id + ':' + kind] = Date.now(); ls('osc.v5done', JSON.stringify(st)); close();
      K.toast(kind === 'teams' ? L3('Mensagem simulada para ', 'Mensaje simulado para ', 'Simulated message to ') + to : L3('Chamado simulado em ', 'Ticket simulado en ', 'Simulated ticket in ') + to); K.render();
    };
    box.querySelector('.v5-ok').focus();
  }
  function done(id, kind) { try { return !!JSON.parse(ls('osc.v5done') || '{}')[id + ':' + kind]; } catch (e) { return false; } }

  /* ====================================================================
     DEMANDS VIEW
     ==================================================================== */
  K.V.dem = function (el) {
    var arg = V5.arg || '', fSite = arg.indexOf('site:') === 0 ? arg.slice(5) : '', fId = arg.indexOf('id:') === 0 ? arg.slice(3) : '', tab = V5.tab || 'dem', ch = V5.ch || '';
    var all = liveDemands(), fin = liveFindings();
    var h = K.head(L3('Operação', 'Operación', 'Operations'), L3('Demandas no mapa', 'Demandas en el mapa', 'Work on the map'),
      esc(L3('Onde cada chamado, projeto, e-mail, reunião, conversa do Teams, mudança e alerta nasce — e em qual site ou recurso ele mora. Clique para ver no mapa ou abrir no Infra Backlog.',
        'Dónde nace cada ticket, proyecto, correo, reunión, chat de Teams, cambio y alerta — y en qué sitio o recurso vive. Haz clic para verlo en el mapa o abrirlo en Infra Backlog.',
        'Where every ticket, project, e-mail, meeting, Teams thread, change and alert is born — and which site or resource it lives on. Click to see it on the map or open it in Infra Backlog.')),
      '<a class="btn" href="../infra-backlog-dashboard/" target="_blank" rel="noopener">Infra Backlog ↗</a>');
    h += '<div class="v5-tabs" role="tablist"><button type="button" role="tab" data-v5="tab" data-v="dem" aria-selected="' + (tab === 'dem') + '">' + L3('Demandas', 'Demandas', 'Work items') + ' <b>' + all.length + '</b></button><button type="button" role="tab" data-v5="tab" data-v="sec" aria-selected="' + (tab === 'sec') + '">🛡 ' + L3('Achados de segurança do discovery', 'Hallazgos de seguridad del discovery', 'Security findings from discovery') + ' <b>' + fin.length + '</b></button></div>';
    if (tab === 'sec') { el.innerHTML = h + secTab(fin); return; }

    /* where it is born */
    var byCh = {}; all.forEach(function (d) { byCh[d.ch] = (byCh[d.ch] || 0) + 1; });
    h += '<div class="v5-grid2"><section class="panel pad"><div class="eyebrow">' + L3('Onde nasce', 'Dónde nace', 'Where it is born') + '</div><div class="v5-stack">' +
      CORD.filter(function (k) { return byCh[k]; }).map(function (k, i) { return '<i class="c' + i + '" style="flex:' + byCh[k] + '" title="' + esc(chName(k) + ': ' + byCh[k]) + '"></i>'; }).join('') + '</div><div class="v5-chips">' +
      '<button type="button" data-v5="ch" data-v="" aria-pressed="' + !ch + '">' + L3('Todos', 'Todos', 'All') + ' <b>' + all.length + '</b></button>' +
      CORD.filter(function (k) { return byCh[k]; }).map(function (k, i) { return '<button type="button" data-v5="ch" data-v="' + k + '" aria-pressed="' + (ch === k) + '"><i class="dot c' + i + '"></i>' + CH[k].i + ' ' + esc(chName(k)) + ' <b>' + byCh[k] + '</b></button>'; }).join('') + '</div></section>';
    /* where it lives */
    var bySite = {}; all.forEach(function (d) { bySite[d.site] = (bySite[d.site] || 0) + 1; }); fin.forEach(function (f) { bySite[f.site] = (bySite[f.site] || 0) + 1; });
    var hot = Object.keys(bySite).sort(function (a, b) { return bySite[b] - bySite[a]; }).slice(0, 6), mx = bySite[hot[0]] || 1;
    h += '<section class="panel pad"><div class="eyebrow">' + L3('Onde mora (sites e nuvens com mais demandas)', 'Dónde vive (sitios y nubes con más demandas)', 'Where it lives (busiest sites and clouds)') + '</div>' + hot.map(function (id) {
      var s = site(id); return '<button type="button" class="v5-hot" data-go="dem" data-arg="site:' + esc(id) + '" aria-pressed="' + (fSite === id) + '">' + badge(provOfSite(s), 1) + '<span class="nm">' + esc(s.short || s.name) + '</span><span class="bar"><i style="width:' + (bySite[id] / mx * 100) + '%"></i></span><b>' + bySite[id] + '</b></button>';
    }).join('') + '</section></div>';
    /* team load */
    var byWho = {}; all.forEach(function (d) { byWho[d.who] = (byWho[d.who] || 0) + 1; });
    h += '<div class="v5-team">' + Object.keys(byWho).sort(function (a, b) { return byWho[b] - byWho[a]; }).map(function (w) { return '<span>' + avatar(w) + '<b>' + byWho[w] + '</b></span>'; }).join('') + '<small>' + esc(L3('carga por analista (avatares gerados, pessoas fictícias)', 'carga por analista (avatares generados, personas ficticias)', 'load per analyst (generated avatars, fictional people)')) + '</small></div>';

    var list = all.filter(function (d) { return (!ch || d.ch === ch) && (!fSite || d.site === fSite) && (!fId || d.id === fId); });
    if (fSite || fId) { var s0 = fSite && site(fSite); h += '<div class="v5-flt">' + esc(L3('Filtro', 'Filtro', 'Filter')) + ': <b>' + esc(fId || (s0 && s0.name) || fSite) + '</b> <button type="button" class="btn sm" data-v5="clr">× ' + L3('limpar', 'limpiar', 'clear') + '</button></div>'; }
    var sevOrd = { P0: 0, P1: 1, P2: 2 };
    list.sort(function (a, b) { return (sevOrd[a.sev] - sevOrd[b.sev]) || (a.age - b.age); });
    h += '<div class="v5-list">' + (list.length ? list.map(function (d) {
      var s = site(d.site), n = d.node && node(d.node);
      return '<article class="v5-card ' + (d.id === fId ? 'hl' : '') + '"><div class="v5-ci">' + CH[d.ch].i + '</div><div class="v5-cb"><div class="v5-ct"><span class="v5-id">' + esc(d.id) + '</span><span class="v5-sev ' + d.sev + '">' + d.sev + '</span>' + esc(d.t) + '</div>' +
        '<div class="v5-cm"><span>' + esc(L3('Nasceu em', 'Nació en', 'Born in')) + ' <b>' + esc(d.origin) + '</b></span><span>' + esc(L3('Mora em', 'Vive en', 'Lives at')) + ' ' + badge(provOfSite(s), 1) + ' <b>' + esc(s.short || s.name) + '</b>' + (n ? ' · <a href="#" data-v5="node" data-v="' + esc(n.id) + '">' + esc(n.name) + '</a>' : '') + '</span>' +
        '<span>' + avatar(d.who) + ' ' + esc(D.people[d.who] || d.who) + '</span><span class="st ' + d.st + '">' + esc(stName(d.st)) + '</span><span>' + (d.age ? d.age + ' ' + L3('dias', 'días', 'days') : L3('hoje', 'hoy', 'today')) + '</span></div></div>' +
        '<div class="v5-ca"><button type="button" class="btn sm" data-v5="map" data-v="' + esc(d.site) + '">◎ ' + L3('Mapa', 'Mapa', 'Map') + '</button>' + (n ? '<button type="button" class="btn sm" data-v5="topo" data-v="' + esc(n.id) + '">' + L3('Topologia', 'Topología', 'Topology') + '</button>' : '') +
        (d.bl ? '<a class="btn sm" target="_blank" rel="noopener" href="../infra-backlog-dashboard/?q=' + encodeURIComponent(d.bl) + '">Backlog ↗</a>' : '') + '</div></article>';
    }).join('') : '<div class="empty">' + esc(L3('Nada com esse filtro.', 'Nada con ese filtro.', 'Nothing with this filter.')) + '</div>') + '</div>';
    h += '<p class="note">' + esc(L3('Como chega aqui: o Infra Backlog lê e-mail, Teams, a Daily e o ITSM; cada item ganha o site ou o recurso que ele afeta. O Orbiscale só lê — nada muda no ITSM sem aprovação.', 'Cómo llega aquí: Infra Backlog lee correo, Teams, la Daily y el ITSM; cada ítem recibe el sitio o recurso que afecta. Orbiscale solo lee — nada cambia en el ITSM sin aprobación.', 'How it gets here: Infra Backlog reads e-mail, Teams, the Daily and the ITSM; each item is tagged with the site or resource it affects. Orbiscale is read-only — nothing changes in the ITSM without approval.')) + '</p>';
    el.innerHTML = h;
  };

  function secTab(fin) {
    var ord = { crit: 0, high: 1, med: 2, low: 3 };
    fin = fin.slice().sort(function (a, b) { return ord[a.sev] - ord[b.sev]; });
    var c = { crit: 0, high: 0, med: 0, low: 0 }; fin.forEach(function (f) { c[f.sev]++; });
    var h = '<div class="v5-kpis">' + ['crit', 'high', 'med', 'low'].map(function (k) { return '<div class="v5-kpi s-' + k + '"><b>' + c[k] + '</b><span>' + esc(SEV[k]) + '</span></div>'; }).join('') +
      '<div class="v5-kpi"><b>' + fin.filter(function (f) { return done(f.id, 'ticket'); }).length + '/' + fin.length + '</b><span>' + esc(L3('já viraram chamado', 'ya son ticket', 'already ticketed')) + '</span></div></div>';
    h += '<div class="v5-list">' + fin.map(function (f) {
      var n = node(f.node), s = site(f.site);
      return '<article class="v5-card"><div class="v5-ci s-' + f.sev + '">🛡</div><div class="v5-cb"><div class="v5-ct"><span class="v5-id">' + esc(f.id) + '</span><span class="v5-sev s-' + f.sev + '">' + esc(SEV[f.sev]) + '</span>' + esc(f.ctl) + '</div>' +
        '<div class="v5-cm"><span>' + badge(provOfSite(s), 1) + ' <b>' + esc(s.short || s.name) + '</b>' + (n ? ' · <a href="#" data-v5="node" data-v="' + esc(n.id) + '">' + esc(n.name) + '</a>' : '') + '</span><span>' + esc(L3('Sugestão', 'Sugerencia', 'Suggestion')) + ': ' + esc(f.fix) + '</span></div>' +
        '<div class="v5-cm"><span>→ ' + esc(f.q) + '</span><span>→ ' + esc(f.tm) + '</span></div></div>' +
        '<div class="v5-ca"><button type="button" class="btn sm' + (done(f.id, 'ticket') ? ' ok' : ' pri') + '" data-v5="ticket" data-v="' + f.id + '">' + (done(f.id, 'ticket') ? '✓ ' : '🎫 ') + L3('Criar chamado', 'Crear ticket', 'Create ticket') + '</button>' +
        '<button type="button" class="btn sm' + (done(f.id, 'teams') ? ' ok' : '') + '" data-v5="teams" data-v="' + f.id + '">' + (done(f.id, 'teams') ? '✓ ' : '💬 ') + L3('Avisar no Teams', 'Avisar en Teams', 'Post to Teams') + '</button><button type="button" class="btn sm" data-v5="map" data-v="' + esc(f.site) + '">◎ ' + L3('Mapa', 'Mapa', 'Map') + '</button></div></article>';
    }).join('') + '</div>';
    h += '<p class="note">' + esc(L3('Os achados vêm do discovery somente leitura (regras de NSG/SG, storage público, cofres, Kubernetes, firmware). O Orbiscale sugere o chamado e a mensagem; quem decide abrir é o time.', 'Los hallazgos vienen del discovery de solo lectura (reglas NSG/SG, storage público, bóvedas, Kubernetes, firmware). Orbiscale sugiere el ticket y el mensaje; quien decide es el equipo.', 'Findings come from read-only discovery (NSG/SG rules, public storage, vaults, Kubernetes, firmware). Orbiscale suggests the ticket and the message; the team decides.')) + '</p>';
    return h;
  }

  /* ====================================================================
     CLOUD & TENANTS: multicloud overview on top of the existing view
     ==================================================================== */
  var cloud0 = K.V.cloud;
  K.V.cloud = function (el) {
    cloud0(el);
    var ns = nodes(), by = {};
    ns.forEach(function (n) { var p = provOfNode(n); if (p === 'On-prem') return; (by[p] = by[p] || []).push(n); });
    var ab = { vm: 'VM', k8s: 'K8S', db: 'DB', obj: 'BLOB/S3', kv: 'KEYS', nsg: 'NSG/SG', vpngw: 'VPN', vnet: 'NET', sub: 'SUBNET', lb: 'LB', app: 'APP', fn: 'FN', bot: 'AI', bkp: 'BKP', dr: 'DR', cdn: 'CDN', afw: 'FW', apigw: 'API', saas: 'SAAS', iac: 'IAC', mon: 'MON', stor: 'DISK', sec: 'SIEM', coll: 'LOG', sbc: 'SBC', isp: 'GW' };
    var h = '<section class="blk v5-mc"><h2>' + esc(L3('Multicloud — tudo que o discovery encontrou', 'Multinube — todo lo que encontró el discovery', 'Multicloud — everything discovery found')) + '</h2><div class="v5-pgrid">' +
      PORDER.filter(function (p) { return by[p]; }).map(function (p) {
        var list = by[p], regs = {}, t = {}; list.forEach(function (n) { var s = K.siteOf(n); if (s) regs[s.short || s.name] = 1; t[n.type] = (t[n.type] || 0) + 1; });
        var fnd = liveFindings().filter(function (f) { return provOfSite(site(f.site)) === p; }).length;
        return '<div class="v5-pc" style="--oc:' + PROV[p].c + '"><div class="v5-ph">' + badge(p) + '<b>' + esc(p) + '</b><span>' + list.length + ' ' + L3('recursos', 'recursos', 'resources') + '</span></div>' +
          '<div class="v5-regs">' + Object.keys(regs).map(esc).join(' · ') + '</div><div class="v5-types">' + Object.keys(t).sort(function (a, b) { return t[b] - t[a]; }).map(function (k) { return '<span>' + esc(ab[k] || k.toUpperCase()) + ' <b>' + t[k] + '</b></span>'; }).join('') + '</div>' +
          (fnd ? '<button type="button" class="v5-fl" data-go="dem" data-arg="">🛡 ' + fnd + ' ' + L3('achado(s) de segurança', 'hallazgo(s) de seguridad', 'security finding(s)') + '</button>' : '') +
          (PROV[p].k !== 'SAAS' ? '<button type="button" class="btn sm" data-go="topo" data-arg="cc:P:' + esc(p) + '">' + L3('Topologia', 'Topología', 'Topology') + ' →</button>' : '') + '</div>';
      }).join('') + '</div>';
    /* network design: how each cloud reaches the company */
    var gws = ns.filter(function (n) { return n.type === 'vpngw' || (n.type === 'isp' && provOfNode(n) !== 'On-prem'); });
    h += '<h2 style="margin-top:18px">' + esc(L3('Desenho de rede — como cada nuvem chega na empresa', 'Diseño de red — cómo cada nube llega a la empresa', 'Network design — how each cloud reaches the company')) + '</h2><div class="v5-tbl"><table><thead><tr><th>' + L3('Origem', 'Origen', 'Origin') + '</th><th>Gateway</th><th>' + L3('Função', 'Función', 'Role') + '</th><th>' + L3('Rede', 'Red', 'Network') + '</th></tr></thead><tbody>' +
      gws.map(function (n) { var s = K.siteOf(n), vn = ns.filter(function (x) { return x.site === n.site && x.type === 'vnet'; })[0]; return '<tr><td>' + badge(provOfNode(n), 1) + ' ' + esc(s ? s.short || s.name : '') + '</td><td><a href="#" data-v5="node" data-v="' + esc(n.id) + '">' + esc(n.name) + '</a></td><td>' + esc(n.role || '') + '</td><td class="mono">' + esc(vn ? vn.name : '—') + '</td></tr>'; }).join('') + '</tbody></table></div>';
    /* NSG / SG / security list rules */
    var sg = ns.filter(function (n) { return n.type === 'nsg' && n.rules; });
    h += '<h2 style="margin-top:18px">' + esc(L3('Regras de rede (NSG · Security groups · Security lists · VPC firewall)', 'Reglas de red (NSG · Security groups · Security lists · VPC firewall)', 'Network rules (NSG · Security groups · Security lists · VPC firewall)')) + '</h2><div class="v5-tbl"><table><thead><tr><th>' + L3('Origem', 'Origen', 'Origin') + '</th><th>' + L3('Objeto', 'Objeto', 'Object') + '</th><th>' + L3('Prior.', 'Prior.', 'Prio') + '</th><th>' + L3('Dir.', 'Dir.', 'Dir') + '</th><th>' + L3('Porta', 'Puerto', 'Port') + '</th><th>' + L3('Origem do tráfego', 'Origen del tráfico', 'Traffic source') + '</th><th>' + L3('Ação', 'Acción', 'Action') + '</th></tr></thead><tbody>' +
      sg.map(function (n) { return n.rules.map(function (r, i) { var bad = /FINDING/.test(r.note); return '<tr class="' + (bad ? 'bad' : '') + '">' + (i ? '<td></td><td></td>' : '<td>' + badge(provOfNode(n), 1) + '</td><td><a href="#" data-v5="node" data-v="' + esc(n.id) + '">' + esc(n.name) + '</a></td>') + '<td class="mono">' + r.pri + '</td><td>' + (r.dir === 'in' ? '⇣ in' : '⇡ out') + '</td><td class="mono">' + esc(r.port) + '</td><td class="mono">' + esc(r.src) + '</td><td><span class="v5-act ' + r.act + '">' + esc(r.act) + '</span>' + (bad ? ' <span class="v5-sev s-crit">🛡 ' + esc(L3('achado', 'hallazgo', 'finding')) + '</span>' : '') + '</td></tr>'; }).join(''); }).join('') + '</tbody></table></div>' +
      '<p class="note">' + esc(L3('Lido pelas APIs de cada nuvem com papel somente leitura (Reader / SecurityAudit / Viewer). Segredos aparecem só como nome e referência do cofre, nunca o valor. Custos ficam no módulo FinOps.', 'Leído por las APIs de cada nube con rol de solo lectura (Reader / SecurityAudit / Viewer). Los secretos aparecen solo como nombre y referencia de la bóveda, nunca el valor. Los costos quedan en el módulo FinOps.', 'Read from each cloud API with a read-only role (Reader / SecurityAudit / Viewer). Secrets only appear as a name and vault reference, never the value. Costs live in the FinOps module.')) + '</p></section>';
    var hd = el.querySelector('.vhead'); if (hd) hd.insertAdjacentHTML('afterend', h); else el.insertAdjacentHTML('afterbegin', h);
    var p = hd && hd.querySelector('p'); if (p) p.textContent = L3('Inventário multicloud (Azure, AWS, Google Cloud, Oracle, IBM e SaaS), desenho de rede, regras de segurança e atalhos para os portais.', 'Inventario multinube (Azure, AWS, Google Cloud, Oracle, IBM y SaaS), diseño de red, reglas de seguridad y accesos a los portales.', 'Multicloud inventory (Azure, AWS, Google Cloud, Oracle, IBM and SaaS), network design, security rules and portal shortcuts.');
  };

  /* ====================================================================
     FINOPS (Enterprise module) — persona-based visibility
     ==================================================================== */
  var PERS = ['exec', 'mgr', 'coord', 'analyst'];
  function persName(p) { return { exec: L3('Executivo', 'Ejecutivo', 'Executive'), mgr: L3('Gerente', 'Gerente', 'Manager'), coord: L3('Coordenador', 'Coordinador', 'Coordinator'), analyst: L3('Analista', 'Analista', 'Analyst') }[p]; }
  function costModel() {
    var ns = nodes().filter(function (n) { return n.cost; }), tot = {}, bySite = {};
    ns.forEach(function (n) { var p = provOfNode(n); tot[p] = (tot[p] || 0) + n.cost; bySite[n.site] = (bySite[n.site] || 0) + n.cost; });
    var trend = {}, budget = {};
    Object.keys(tot).forEach(function (p) {
      var base = D.trend[p] || D.trend['SaaS'], last = base[base.length - 1];
      trend[p] = base.map(function (v) { return Math.round(v / last * tot[p]); });
      budget[p] = Math.round((D.budget[p] || last) / last * tot[p]);
    });
    var sum = function (o) { return Object.keys(o).reduce(function (a, k) { return a + o[k]; }, 0); };
    var oB = sum(D.budget), oL = Object.keys(D.trend).reduce(function (a, p) { return a + D.trend[p][11]; }, 0), f = (oB / oL) * sum(tot) / (sum(budget) || 1);
    Object.keys(budget).forEach(function (p) { budget[p] = Math.round(budget[p] * f); });
    var total = sum(tot), prev = Object.keys(trend).reduce(function (a, p) { return a + trend[p][10]; }, 0), first = Object.keys(trend).reduce(function (a, p) { return a + trend[p][0]; }, 0);
    var recs = D.recs.filter(function (r) { return !r.node || node(r.node); });
    var untag = ns.filter(function (n) { return !n.tagged; });
    return { ns: ns, tot: tot, bySite: bySite, trend: trend, budget: budget, total: total, prev: prev, first: first, bud: sum(budget), save: recs.reduce(function (a, r) { return a + r.save; }, 0), recs: recs, untag: untag };
  }
  function chartTrend(m) {
    var W = 640, H = 210, pl = 46, pb = 24, ps = PORDER.filter(function (p) { return m.trend[p]; }), n = D.months.length;
    var tots = D.months.map(function (_, i) { return ps.reduce(function (a, p) { return a + m.trend[p][i]; }, 0); }), mx = Math.max.apply(null, tots) * 1.08;
    var bw = (W - pl - 8) / n, y = function (v) { return H - pb - v / mx * (H - pb - 10); };
    var g = '';
    for (var k = 0; k <= 4; k++) { var v = mx / 4 * k; g += '<line x1="' + pl + '" x2="' + W + '" y1="' + y(v) + '" y2="' + y(v) + '" class="gl"/><text x="' + (pl - 6) + '" y="' + (y(v) + 3) + '" class="ax" text-anchor="end">' + Math.round(v / 1000) + 'k</text>'; }
    D.months.forEach(function (mo, i) {
      var acc = 0, x = pl + i * bw + bw * 0.18, w = bw * 0.64;
      ps.forEach(function (p) { var v = m.trend[p][i]; g += '<rect x="' + x.toFixed(1) + '" y="' + y(acc + v).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + Math.max(0, y(acc) - y(acc + v) - 1).toFixed(1) + '" fill="' + PROV[p].c + '" rx="1.5"><title>' + esc(mo + ' · ' + p + ': ' + money(v)) + '</title></rect>'; acc += v; });
      g += '<text x="' + (x + w / 2).toFixed(1) + '" y="' + (H - 7) + '" class="ax" text-anchor="middle">' + mo.slice(5) + '/' + mo.slice(2, 4) + '</text>';
    });
    return '<svg class="v5-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(L3('Gasto mensal por nuvem, 12 meses', 'Gasto mensual por nube, 12 meses', 'Monthly spend by cloud, 12 months')) + '">' + g + '</svg>' +
      '<div class="v5-legend">' + ps.map(function (p) { return '<span><i style="background:' + PROV[p].c + '"></i>' + esc(p) + '</span>'; }).join('') + '</div>';
  }
  K.V.finops = function (el) {
    var per = ls('osc.persona'); if (PERS.indexOf(per) < 0) per = 'mgr';
    var m = costModel(), pct = function (a, b) { return b ? Math.round(a / b * 100) : 0; };
    var h = K.head(L3('Gestão', 'Gestión', 'Management'), 'FinOps', esc(L3('Quanto custa cada nuvem, região, site e recurso — e onde dá para economizar. Preços aparecem só aqui, para quem tem permissão.', 'Cuánto cuesta cada nube, región, sitio y recurso — y dónde se puede ahorrar. Los precios aparecen solo aquí, para quien tiene permiso.', 'What each cloud, region, site and resource costs — and where to save. Prices only appear here, for people allowed to see them.')),
      '<span class="v5-ent">★ ' + L3('Módulo Enterprise', 'Módulo Enterprise', 'Enterprise module') + '</span>');
    h += '<div class="v5-pers"><span>' + esc(L3('Ver como', 'Ver como', 'View as')) + '</span>' + PERS.map(function (p) { return '<button type="button" data-v5="persona" data-v="' + p + '" aria-pressed="' + (p === per) + '">' + esc(persName(p)) + '</button>'; }).join('') +
      '<small>' + esc(L3('Demo. Em produção o perfil vem dos grupos do Entra ID / IdP (RBAC), não de um botão.', 'Demo. En producción el perfil viene de los grupos de Entra ID / IdP (RBAC), no de un botón.', 'Demo. In production the persona comes from Entra ID / IdP groups (RBAC), not from a button.')) + '</small></div>';

    if (per === 'analyst') {
      h += '<div class="v5-lock"><b>🔒 ' + esc(L3('Seu perfil não vê valores.', 'Tu perfil no ve valores.', 'Your role does not see prices.')) + '</b><span>' + esc(L3('Analistas recebem as tarefas de otimização, sem preços. Custos ficam com Coordenador, Gerente e Executivo.', 'Los analistas reciben las tareas de optimización, sin precios. Los costos quedan con Coordinador, Gerente y Ejecutivo.', 'Analysts get the optimisation tasks without prices. Costs stay with Coordinators, Managers and Executives.')) + '</span></div>';
      h += recTable(m, false);
      el.innerHTML = h; return;
    }
    var fc = Math.round(m.total * 1.03), dv = pct(m.total - m.prev, m.prev), y12 = pct(m.total - m.first, m.first);
    var k = [[money(m.total, 1), L3('gasto do mês', 'gasto del mes', 'spend this month'), (dv >= 0 ? '+' : '') + dv + '% ' + L3('vs mês anterior', 'vs mes anterior', 'vs last month')],
    [money(fc, 1), L3('previsão de fechamento', 'previsión de cierre', 'month-end forecast'), (y12 >= 0 ? '+' : '') + y12 + '% ' + L3('em 12 meses', 'en 12 meses', 'in 12 months')],
    [money(m.save, 1), L3('economia possível/mês', 'ahorro posible/mes', 'possible saving/month'), pct(m.save, m.total) + '% ' + L3('do gasto', 'del gasto', 'of spend')],
    [pct(m.untag.length, m.ns.length) + '%', L3('recursos sem tag de custo', 'recursos sin tag de costo', 'resources without cost tags'), m.untag.length + ' ' + L3('para corrigir', 'por corregir', 'to fix')]];
    if (per !== 'coord') k.splice(1, 0, [pct(m.total, m.bud) + '%', L3('do orçamento usado', 'del presupuesto usado', 'of budget used'), money(m.bud, 1) + ' ' + L3('orçado', 'presupuestado', 'budget')]);
    h += '<div class="v5-kpis">' + k.map(function (x, i) { var warn = i === 1 && per !== 'coord' && m.total > m.bud; return '<div class="v5-kpi' + (warn ? ' s-high' : '') + '"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span><small>' + esc(x[2]) + '</small></div>'; }).join('') + '</div>';

    /* by provider vs budget */
    var ps = PORDER.filter(function (p) { return m.tot[p]; }), mxp = Math.max.apply(null, ps.map(function (p) { return Math.max(m.tot[p], m.budget[p] || 0); }));
    h += '<div class="v5-grid2"><section class="panel pad"><div class="eyebrow">' + L3('Por nuvem', 'Por nube', 'By cloud') + (per !== 'coord' ? ' · ' + L3('linha = orçamento', 'línea = presupuesto', 'line = budget') : '') + '</div>' + ps.map(function (p) {
      var over = per !== 'coord' && m.tot[p] > m.budget[p];
      return '<div class="v5-pb">' + badge(p, 1) + '<span class="nm">' + esc(p) + '</span><span class="bar"><i style="width:' + (m.tot[p] / mxp * 100).toFixed(1) + '%;background:' + PROV[p].c + '"></i>' + (per !== 'coord' ? '<em style="left:' + (m.budget[p] / mxp * 100).toFixed(1) + '%"></em>' : '') + '</span><b class="' + (over ? 'over' : '') + '">' + money(m.tot[p], 1) + '</b></div>';
    }).join('') + '</section><section class="panel pad"><div class="eyebrow">' + L3('Tendência — 12 meses', 'Tendencia — 12 meses', 'Trend — 12 months') + '</div>' + chartTrend(m) + '</section></div>';

    if (per === 'exec') {
      var top3 = m.recs.slice().sort(function (a, b) { return b.save - a.save; }).slice(0, 3);
      h += '<section class="panel pad v5-exec"><div class="eyebrow">' + L3('Resumo para a diretoria', 'Resumen para la dirección', 'Board summary') + '</div><ul>' +
        '<li>' + esc(L3('Gasto de ', 'Gasto de ', 'Spend of ')) + '<b>' + money(m.total) + '</b>' + esc(L3(' no mês, ', ' en el mes, ', ' this month, ')) + '<b>' + pct(m.total, m.bud) + '%</b>' + esc(L3(' do orçamento.', ' del presupuesto.', ' of budget.')) + '</li>' +
        '<li>' + esc(L3('Maior crescimento em 12 meses: ', 'Mayor crecimiento en 12 meses: ', 'Fastest growth in 12 months: ')) + '<b>' + esc(ps.slice().sort(function (a, b) { return (m.trend[b][11] / m.trend[b][0]) - (m.trend[a][11] / m.trend[a][0]); })[0]) + '</b>.</li>' +
        top3.map(function (r) { return '<li>' + esc(r.t) + ' — <b>' + money(r.save) + '/' + L3('mês', 'mes', 'mo') + '</b></li>'; }).join('') + '</ul></section>';
      el.innerHTML = h; return;
    }
    /* by site / region */
    var sites = Object.keys(m.bySite).sort(function (a, b) { return m.bySite[b] - m.bySite[a]; });
    h += '<div class="v5-grid2"><section class="panel pad"><div class="eyebrow">' + L3('Por região / site', 'Por región / sitio', 'By region / site') + '</div><div class="v5-tbl"><table><tbody>' + sites.slice(0, 12).map(function (id) {
      var s = site(id); if (!s) return ''; return '<tr><td>' + badge(provOfSite(s), 1) + '</td><td><a href="#" data-v5="map" data-v="' + esc(id) + '">' + esc(s.short || s.name) + '</a></td><td class="num">' + money(m.bySite[id]) + '</td><td class="num muted">' + pct(m.bySite[id], m.total) + '%</td></tr>';
    }).join('') + '</tbody></table></div></section>';
    /* top resources */
    var top = m.ns.slice().sort(function (a, b) { return b.cost - a.cost; }).slice(0, 10);
    h += '<section class="panel pad"><div class="eyebrow">' + L3('Recursos mais caros', 'Recursos más caros', 'Most expensive resources') + '</div><div class="v5-tbl"><table><tbody>' + top.map(function (n) {
      return '<tr><td>' + badge(provOfNode(n), 1) + '</td><td><a href="#" data-v5="node" data-v="' + esc(n.id) + '">' + esc(n.name) + '</a><small>' + esc((K.TYPES[n.type] || n.type) + ' · ' + (n.costOwner || '')) + (n.tagged ? '' : ' · <span class="untag">' + esc(L3('sem tag', 'sin tag', 'untagged')) + '</span>') + '</small></td><td class="num">' + money(n.cost) + '</td></tr>';
    }).join('') + '</tbody></table></div></section></div>';
    h += recTable(m, true);
    el.innerHTML = h;
  };
  function recTable(m, prices) {
    var KIND = { idle: L3('Ocioso', 'Ocioso', 'Idle'), orphan: L3('Órfão', 'Huérfano', 'Orphan'), schedule: L3('Agendar', 'Agendar', 'Schedule'), commit: L3('Compromisso', 'Compromiso', 'Commitment'), rightsize: 'Rightsizing', tier: L3('Camada', 'Capa', 'Tiering'), tags: 'Tags', contract: L3('Contrato', 'Contrato', 'Contract') };
    return '<section class="panel pad" style="margin-top:12px"><div class="eyebrow">' + L3('Recomendações de economia', 'Recomendaciones de ahorro', 'Savings recommendations') + '</div><div class="v5-tbl"><table><thead><tr><th>' + L3('Tipo', 'Tipo', 'Type') + '</th><th>' + L3('Ação', 'Acción', 'Action') + '</th><th>' + L3('Recurso', 'Recurso', 'Resource') + '</th>' + (prices ? '<th class="num">' + L3('Economia/mês', 'Ahorro/mes', 'Saving/mo') + '</th>' : '') + '<th></th></tr></thead><tbody>' +
      m.recs.map(function (r) {
        var n = r.node && node(r.node);
        return '<tr><td><span class="v5-tag">' + esc(KIND[r.kind] || r.kind) + '</span></td><td>' + esc(r.t) + '</td><td>' + (n ? badge(provOfNode(n), 1) + ' <a href="#" data-v5="node" data-v="' + esc(n.id) + '">' + esc(n.name) + '</a>' : '<small>' + m.untag.length + ' ' + esc(L3('recursos', 'recursos', 'resources')) + '</small>') + '</td>' +
          (prices ? '<td class="num">' + (r.save ? money(r.save) : '—') + '</td>' : '') + '<td><button type="button" class="btn sm' + (done(r.id, 'ticket') ? ' ok' : '') + '" data-v5="ticket" data-v="' + r.id + '">' + (done(r.id, 'ticket') ? '✓ ' : '🎫 ') + L3('Criar tarefa', 'Crear tarea', 'Create task') + '</button></td></tr>';
      }).join('') + '</tbody></table></div></section>';
  }
})();
