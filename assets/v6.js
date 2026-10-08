/*!
 * Orbiscale · v6: Management menu (FinOps + resource costs), demand pins and guide on the map,
 * calm focus on click, view preferences for map and topology.
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). SPDX-License-Identifier: AGPL-3.0-or-later
 */
(function () {
  'use strict';
  var K = window.KNOC, D = window.ORB_V5; if (!K || !D) return;
  var $ = function (i) { return document.getElementById(i); };
  function L() { try { return K.getL(); } catch (e) { return 'pt'; } }
  function L3(pt, es, en) { var l = L(); return l === 'es' ? es : l === 'en' ? en : pt; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function money(v) { return 'US$ ' + Math.round(v || 0).toLocaleString(L() === 'en' ? 'en-US' : 'pt-BR'); }
  function site(id) { return K.siteOf({ site: id }); }
  function node(id) { var r = null; K.nodeList().some(function (n) { if (n.id === id) { r = n; return true; } return false; }); return r; }

  /* ---------- 1 · menu: own "Management" group on the left ---------- */
  if (K.T) {
    var TT = { pt: { gMgmt: 'Gestão', cost: 'Custos por recurso' }, es: { gMgmt: 'Gestión', cost: 'Costos por recurso' }, en: { gMgmt: 'Management', cost: 'Resource costs' } };
    Object.keys(TT).forEach(function (l) { if (K.T[l]) Object.assign(K.T[l], TT[l]); });
  }
  if (K.NAV) {
    var fin = null;
    K.NAV.forEach(function (g) { g.items = g.items.filter(function (it) { if (it[0] === 'finops') { fin = it; return false; } return true; }); });
    var at = 0; K.NAV.forEach(function (g, i) { if (g.g === 'gKnow') at = i + 1; });
    K.NAV.splice(at, 0, { g: 'gMgmt', items: [fin || ['finops', 'M12 3v18'], ['cost', 'M4 20V10M10 20V4M16 20v-7M22 20H2']] });
    try { K.renderNav(); } catch (e) { /* nav paints on next render */ }
  }

  /* ---------- 2 · view preferences (map + topology) ---------- */
  var DEF = { wan: true, labels: true, focus: true, anim: true, pins: true, compact: false, mapstyle: 'relief', tpip: true, tpbadge: true };
  var VP = Object.assign({}, DEF); try { Object.assign(VP, JSON.parse(ls('osc.view6') || '{}')); } catch (e) { /* defaults */ }
  function applyVP() {
    var r = document.documentElement.classList;
    r.toggle('v6-nowan', !VP.wan); r.toggle('v6-nolabels', !VP.labels); r.toggle('v6-noanim', !VP.anim);
    r.toggle('v6-compact', !!VP.compact); r.toggle('v6-nopins', !VP.pins); r.toggle('v6-tpnoip', !VP.tpip); r.toggle('v6-tpnobadge', !VP.tpbadge);
    ['relief', 'flat', 'contrast'].forEach(function (k) { r.toggle('v6-map-' + k, VP.mapstyle === k); });
  }
  applyVP();
  function saveVP() { ls('osc.view6', JSON.stringify(VP)); applyVP(); }
  function vpPanel(kind) {
    var old = $('v6vp'); if (old) { old.remove(); return; }
    var opts = kind === 'map' ? [
      ['pins', L3('Demandas no mapa', 'Demandas en el mapa', 'Work pins on the map')], ['wan', L3('Linhas WAN / VPN', 'Líneas WAN / VPN', 'WAN / VPN lines')],
      ['labels', L3('Nomes de países e sites', 'Nombres de países y sitios', 'Country and site names')], ['focus', L3('Foco suave ao clicar', 'Foco suave al hacer clic', 'Soft focus on click')],
      ['anim', L3('Animações', 'Animaciones', 'Animations')], ['compact', L3('Cartões compactos', 'Tarjetas compactas', 'Compact cards')]
    ] : [
      ['tpip', L3('Mostrar IP / FQDN', 'Mostrar IP / FQDN', 'Show IP / FQDN')], ['tpbadge', L3('Selo de origem (nuvem)', 'Sello de origen (nube)', 'Origin badge (cloud)')],
      ['focus', L3('Foco suave ao clicar', 'Foco suave al hacer clic', 'Soft focus on click')], ['anim', L3('Animações', 'Animaciones', 'Animations')]
    ];
    var box = document.createElement('div'); box.id = 'v6vp'; box.className = 'v6-pop'; box.setAttribute('role', 'dialog');
    box.innerHTML = '<b>' + esc(L3('Visualização', 'Visualización', 'View')) + '</b>' + opts.map(function (o) { return '<label><input type="checkbox" data-vp="' + o[0] + '"' + (VP[o[0]] ? ' checked' : '') + '> ' + esc(o[1]) + '</label>'; }).join('') +
      (kind === 'map' ? '<div class="v6-seg"><span>' + esc(L3('Estilo do mapa', 'Estilo del mapa', 'Map style')) + '</span>' + [['relief', L3('Relevo', 'Relieve', 'Relief')], ['flat', L3('Liso', 'Plano', 'Flat')], ['contrast', L3('Contraste', 'Contraste', 'Contrast')]].map(function (m) { return '<button type="button" data-ms="' + m[0] + '" aria-pressed="' + (VP.mapstyle === m[0]) + '">' + esc(m[1]) + '</button>'; }).join('') + '</div>' : '') +
      '<button type="button" class="btn sm" data-vpreset>' + esc(L3('Restaurar padrão', 'Restaurar', 'Reset')) + '</button>';
    var host = kind === 'map' ? $('mapbox') : $('topo'); if (!host) return;
    host.appendChild(box);
    box.addEventListener('change', function (e) { var k = e.target.getAttribute('data-vp'); if (!k) return; VP[k] = e.target.checked; saveVP(); if (kind === 'map') redrawMap(); });
    box.addEventListener('click', function (e) {
      var m = e.target.closest('[data-ms]'); if (m) { VP.mapstyle = m.getAttribute('data-ms'); saveVP(); [].forEach.call(box.querySelectorAll('[data-ms]'), function (b) { b.setAttribute('aria-pressed', String(b === m)); }); }
      if (e.target.closest('[data-vpreset]')) { VP = Object.assign({}, DEF); saveVP(); box.remove(); if (kind === 'map') redrawMap(); }
    });
    setTimeout(function () { document.addEventListener('pointerdown', function off(e) { if (!box.contains(e.target) && !e.target.closest('[data-v6vp]')) { box.remove(); document.removeEventListener('pointerdown', off, true); } }, true); }, 0);
  }
  function redrawMap() { try { K.MAP.apply(); } catch (e) { /* map not open */ } }
  function addVpButton() {
    var t = document.querySelector('#mapbox .mtools'); if (t && !t.querySelector('[data-v6vp]')) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'tb'; b.setAttribute('data-v6vp', 'map'); b.title = L3('Visualização do mapa', 'Visualización del mapa', 'Map view options'); b.textContent = '◐';
      b.onclick = function () { vpPanel('map'); }; t.appendChild(b);
    }
    var tt = document.querySelector('#topo .toolbar, #topo .ttools, .tbar'); var tsvg = $('tsvg');
    if (tsvg && !document.querySelector('[data-v6vp="topo"]')) {
      var host = $('tcc') && $('tcc').parentNode; if (host) {
        var b2 = document.createElement('button'); b2.type = 'button'; b2.className = 'tb'; b2.setAttribute('data-v6vp', 'topo'); b2.textContent = '◐ ' + L3('Visualização', 'Visualización', 'View');
        b2.onclick = function () { vpPanel('topo'); }; host.appendChild(b2);
      }
    }
  }

  /* ---------- 3 · calm focus: the clicked item stays lit, the rest steps back ---------- */
  var sel0 = K.onMapSel;
  K.onMapSel = function (id) {
    var svg = $('msvg');
    if (svg) {
      svg.classList.toggle('v6-focus', !!id && VP.focus);
      [].forEach.call(svg.querySelectorAll('.mk.v6-on'), function (g) { g.classList.remove('v6-on'); });
      if (id) {
        var cc = id.indexOf('cc:') === 0 ? id.slice(3) : null;
        [].forEach.call(svg.querySelectorAll(cc ? '.mk[data-cc="' + cc + '"]' : '.mk[data-item="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]'), function (g) { g.classList.add('v6-on'); });
      }
    }
    if (sel0) return sel0.apply(this, arguments);
  };

  /* ---------- 4 · demand pins + provider ring on the map ---------- */
  var CH = { ticket: '🎫', project: '📁', email: '✉', meeting: '📅', teams: '💬', change: '🔁', alert: '⚡', voice: '🎙', finding: '🛡' };
  var PROVC = { 'Microsoft Azure': '#2F7FD8', 'AWS': '#D9822B', 'Google Cloud': '#2E9E5B', 'Oracle Cloud': '#C2453A', 'IBM Cloud': '#7B5CE0', 'SaaS': '#0EA5A4' };
  function demandsAt(id) { return D.demands.filter(function (d) { return d.site === id; }); }
  function findingsAt(id) { return D.findings.filter(function (f) { return f.site === id; }); }
  var draw0 = K.onMapDraw;
  K.onMapDraw = function (ctx) {
    if (draw0) draw0.apply(this, arguments);
    var svg = $('msvg'), mk = $('mmk'); if (!svg || !mk || !ctx) return;
    addVpButton();
    svg.classList.toggle('v6-focus', VP.focus && !!(K.MAP.MV.site || K.MAP.MV.cc));
    var g = $('v6pins'); if (!g) { g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.id = 'v6pins'; mk.parentNode.insertBefore(g, mk.nextSibling); }
    var k = ctx.k, h = '';
    ctx.cl.forEach(function (c) {
      if (c.items.length !== 1 || c.country) return;
      var it = c.items[0], sid = it.go || it.id, s = site(sid);
      /* provider ring around cloud markers: Azure, AWS, GCP, OCI and IBM look different from on-prem */
      if (it.lay === 'cloud' && s && s.provider && PROVC[s.provider]) h += '<circle class="v6-ring" cx="' + c.p[0].toFixed(2) + '" cy="' + c.p[1].toFixed(2) + '" r="' + (15 * k).toFixed(2) + '" style="stroke:' + PROVC[s.provider] + ';stroke-width:' + (2.6 * k).toFixed(2) + '"/>';
      if (!VP.pins) return;
      var ds = demandsAt(sid), fs = findingsAt(sid); if (!ds.length && !fs.length) return;
      var top = ds.slice().sort(function (a, b) { return a.sev.localeCompare(b.sev); })[0], hot = (top && top.sev === 'P0') || fs.some(function (f) { return f.sev === 'crit'; });
      var label = (top ? CH[top.ch] : '🛡') + ' ' + (ds.length + fs.length), w = (label.length * 6.4 + 12) * k, x = c.p[0] - w - 10 * k, y = c.p[1] - 26 * k;
      h += '<g class="v6-pin' + (hot ? ' hot' : '') + '" data-v6pin="' + esc(sid) + '" transform="translate(' + x.toFixed(2) + ',' + y.toFixed(2) + ')"><rect width="' + w.toFixed(2) + '" height="' + (17 * k).toFixed(2) + '" rx="' + (8.5 * k).toFixed(2) + '" style="stroke-width:' + (1.2 * k).toFixed(2) + '"/>' +
        '<text x="' + (6 * k).toFixed(2) + '" y="' + (12.2 * k).toFixed(2) + '" style="font-size:' + (10.5 * k).toFixed(2) + 'px">' + esc(label) + '</text><title>' + esc((s ? s.name : sid) + ' — ' + ds.length + ' ' + L3('demandas', 'demandas', 'work items') + (fs.length ? ' · ' + fs.length + ' ' + L3('achados de segurança', 'hallazgos de seguridad', 'security findings') : '')) + '</title></g>';
    });
    g.innerHTML = h;
  };
  var pinDown = null;
  document.addEventListener('pointerdown', function (e) {
    var p = e.target.closest && e.target.closest('[data-v6pin]'); pinDown = p ? { id: p.getAttribute('data-v6pin'), x: e.clientX, y: e.clientY } : null;
  }, true);
  document.addEventListener('pointerup', function (e) {
    if (!pinDown) return; var d = pinDown; pinDown = null;
    if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) < 6) setTimeout(function () { siteDrawer(d.id); }, 0);
  }, true);

  /* ---------- 5 · drawer: what lives at a site + the demand guide ---------- */
  function drawer(html) {
    var d = $('v6dr'); if (!d) { d = document.createElement('aside'); d.id = 'v6dr'; d.className = 'v6-drawer'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'false'); document.body.appendChild(d); }
    d.innerHTML = '<button type="button" class="v6-x" aria-label="×" data-v6close>×</button>' + html;
    requestAnimationFrame(function () { d.classList.add('open'); });
    return d;
  }
  function closeDrawer() { var d = $('v6dr'); if (d) d.classList.remove('open'); }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
  function siteDrawer(sid) {
    var s = site(sid), ds = demandsAt(sid), fs = findingsAt(sid);
    var h = '<div class="eyebrow">' + esc(L3('O que mora aqui', 'Lo que vive aquí', 'What lives here')) + '</div><h2>' + esc(s ? s.name : sid) + '</h2>';
    h += '<div class="v6-list">' + ds.map(function (d) { return '<button type="button" class="v6-li" data-v6guide="' + esc(d.id) + '"><span>' + CH[d.ch] + '</span><b>' + esc(d.id) + '</b> ' + esc(d.t) + '<em class="v5-sev ' + d.sev + '">' + d.sev + '</em></button>'; }).join('') +
      fs.map(function (f) { return '<button type="button" class="v6-li" data-v6find="' + esc(f.id) + '"><span>🛡</span><b>' + esc(f.id) + '</b> ' + esc(f.ctl) + '</button>'; }).join('') + '</div>';
    h += '<div class="v6-acts"><button type="button" class="btn sm" data-v6inv="site:' + esc(sid) + '">' + esc(L3('Inventário deste site', 'Inventario de este sitio', 'This site’s inventory')) + '</button><button type="button" class="btn sm" data-go="dem" data-arg="site:' + esc(sid) + '">' + esc(L3('Abrir em Demandas', 'Abrir en Demandas', 'Open in Work')) + '</button></div>';
    drawer(h);
  }
  var STEPS = {
    alert: [['Confirme o alcance: um ativo ou o site todo?', '¿Confirma el alcance: un activo o todo el sitio?', 'Confirm the scope: one asset or the whole site?'], ['Veja o último Sweep e o status dos links do site', 'Revisa el último Sweep y el estado de los enlaces', 'Check the last sweep and the site links'], ['Abra a topologia focada no ativo e siga os vizinhos', 'Abre la topología enfocada y sigue los vecinos', 'Open the topology focused on the asset and follow its neighbours'], ['Se afetar produção: comunicação pronta e acione o fornecedor', 'Si afecta producción: comunica y escala al proveedor', 'If production is hit: send the update and escalate to the vendor']],
    ticket: [['Leia o histórico do chamado e quem está esperando', 'Lee el historial y quién espera', 'Read the ticket history and who is waiting'], ['Confira o inventário afetado abaixo', 'Revisa el inventario afectado abajo', 'Check the affected inventory below'], ['Atualize o solicitante com o próximo passo e prazo', 'Actualiza al solicitante con el próximo paso', 'Update the requester with the next step and date']],
    project: [['Veja o que falta e de quem depende', 'Mira qué falta y de quién depende', 'See what is left and who it depends on'], ['Confira os ativos do escopo abaixo', 'Revisa los activos del alcance', 'Check the in-scope assets below'], ['Registre a próxima entrega na Daily', 'Registra la próxima entrega en la Daily', 'Log the next milestone in the Daily']],
    email: [['Responda o remetente com dono e prazo', 'Responde con dueño y plazo', 'Reply with an owner and a date'], ['Se virar trabalho, abra o chamado (evidência)', 'Si es trabajo, abre el ticket (evidencia)', 'If it is real work, open a ticket (evidence)'], ['Ligue ao site e aos ativos afetados', 'Vincula al sitio y activos afectados', 'Link it to the site and affected assets']],
    meeting: [['Registre a decisão e o dono', 'Registra la decisión y el dueño', 'Record the decision and the owner'], ['Transforme pendências em chamados', 'Convierte pendientes en tickets', 'Turn open points into tickets'], ['Agende o follow-up', 'Agenda el seguimiento', 'Schedule the follow-up']],
    teams: [['Responda na thread com o próximo passo', 'Responde en el hilo con el próximo paso', 'Reply in the thread with the next step'], ['Se for incidente, abra chamado e linke a conversa', 'Si es incidente, abre ticket y vincula el chat', 'If it is an incident, open a ticket and link the thread'], ['Confira o inventário afetado', 'Revisa el inventario afectado', 'Check the affected inventory']],
    change: [['Confirme janela, rollback e critério de rollback', 'Confirma ventana, rollback y criterio', 'Confirm window, rollback and rollback trigger'], ['Pré-validação: backup e evidência antes', 'Pre-validación: backup y evidencia', 'Pre-check: backup and evidence first'], ['Comunicação para os usuários do site', 'Comunicación a los usuarios del sitio', 'Notify the people at the site']]
  };
  function affected(d) {
    var ids = [];
    if (d.node) {
      ids.push(d.node);
      Object.keys(window.KNOC_SNAPSHOT.links || {}).forEach(function (k) { var l = window.KNOC_SNAPSHOT.links[k]; if (l.a === d.node) ids.push(l.b); else if (l.b === d.node) ids.push(l.a); });
    }
    K.nodeList().forEach(function (n) { if (n.site === d.site && ids.indexOf(n.id) < 0 && ids.length < 30) ids.push(n.id); });
    return ids.filter(function (id) { return node(id); });
  }
  function guide(id) {
    var d = D.demands.filter(function (x) { return x.id === id; })[0]; if (!d) return;
    var s = site(d.site), ids = affected(d), st = STEPS[d.ch] || STEPS.ticket, li = L() === 'es' ? 1 : L() === 'en' ? 2 : 0;
    var fs = findingsAt(d.site), cost = ids.reduce(function (a, i) { var n = node(i); return a + ((n && n.cost) || 0); }, 0);
    var h = '<div class="eyebrow">' + esc(L3('Guia da demanda', 'Guía de la demanda', 'Work guide')) + ' · ' + CH[d.ch] + ' ' + esc(d.id) + '</div><h2>' + esc(d.t) + '</h2>' +
      '<div class="v6-kv"><span>' + esc(L3('Nasceu em', 'Nació en', 'Born in')) + '</span><b>' + esc(d.origin) + '</b><span>' + esc(L3('Mora em', 'Vive en', 'Lives at')) + '</span><b>' + esc(s ? s.name : d.site) + '</b><span>' + esc(L3('Dono', 'Dueño', 'Owner')) + '</span><b>' + esc(D.people[d.who] || d.who) + '</b><span>' + esc(L3('Prioridade', 'Prioridad', 'Priority')) + '</span><b>' + d.sev + ' · ' + (d.age ? d.age + ' ' + L3('dias', 'días', 'days') : L3('hoje', 'hoy', 'today')) + '</b></div>';
    h += '<h3>' + esc(L3('Próximos passos sugeridos', 'Próximos pasos sugeridos', 'Suggested next steps')) + '</h3><ol class="v6-steps">' + st.map(function (x) { return '<li>' + esc(x[li]) + '</li>'; }).join('') + '</ol>';
    h += '<h3>' + esc(L3('Inventário afetado', 'Inventario afectado', 'Affected inventory')) + ' <small>' + ids.length + '</small></h3><div class="v6-inv">' + ids.slice(0, 12).map(function (i) { var n = node(i); return '<button type="button" class="v6-ni" data-v5="node" data-v="' + esc(i) + '">' + (K.typeTile ? K.typeTile(n, 20) : '') + '<span><b>' + esc(n.name) + '</b><small>' + esc([n.vendor, n.model, n.version].filter(Boolean).join(' · ') || (K.TYPES[n.type] || n.type)) + '</small></span>' + ((K.hasUpd ? K.hasUpd(n) : n.latest && n.version && n.latest !== n.version) ? '<em class="v6-upd" title="' + esc(L3('Versão publicada', 'Versión publicada', 'Published version')) + '">↑ ' + esc(n.latest) + '</em>' : '') + '</button>'; }).join('') + '</div>';
    if (fs.length) h += '<h3>🛡 ' + esc(L3('Riscos de segurança no mesmo lugar', 'Riesgos de seguridad en el mismo lugar', 'Security risks at the same place')) + '</h3>' + fs.map(function (f) { return '<div class="v6-risk"><b>' + esc(f.ctl) + '</b><span>' + esc(f.fix) + '</span></div>'; }).join('');
    if (cost && (ls('osc.persona') || 'mgr') !== 'analyst') h += '<p class="v6-cost">' + esc(L3('Custo mensal dos recursos afetados', 'Costo mensual de los recursos afectados', 'Monthly cost of affected resources')) + ': <b>' + money(cost) + '</b></p>';
    h += '<div class="v6-acts"><button type="button" class="btn sm pri" data-v6map="' + esc(d.site) + '">◎ ' + esc(L3('Ver no mapa', 'Ver en el mapa', 'Show on map')) + '</button><button type="button" class="btn sm" data-v6inv="ids:' + esc(d.id) + '">' + esc(L3('Abrir inventário filtrado', 'Abrir inventario filtrado', 'Open filtered inventory')) + '</button>' + (d.node ? '<button type="button" class="btn sm" data-v5="topo" data-v="' + esc(d.node) + '">' + esc(L3('Topologia', 'Topología', 'Topology')) + '</button>' : '') + (d.bl ? '<a class="btn sm" href="flow/?nologin&q=' + encodeURIComponent(d.bl) + '">Flow ↗</a>' : '') + '</div>';
    drawer(h);
  }
  STEPS.voice = [['Ouça o áudio original e confirme a transcrição', 'Escucha el audio original y confirma la transcripción', 'Listen to the original audio and confirm the transcript'], ['Confirme site e ativo sugeridos pela classificação', 'Confirma sitio y activo sugeridos por la clasificación', 'Confirm the site and asset suggested by the classifier'], ['Responda a pessoa no WhatsApp com número do chamado e prazo', 'Responde a la persona en WhatsApp con número de ticket y plazo', 'Reply on WhatsApp with the ticket number and a date'], ['Se for incidente, siga o fluxo de alerta', 'Si es incidente, sigue el flujo de alerta', 'If it is an incident, follow the alert flow']];
  K.v6guide = guide; K.v6drawer = drawer; K.v6close = closeDrawer; K.v6affected = affected;
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-v6close]')) { closeDrawer(); return; }
    var g = e.target.closest('[data-v6guide]'); if (g) { e.preventDefault(); guide(g.getAttribute('data-v6guide')); return; }
    var f = e.target.closest('[data-v6find]'); if (f) { e.preventDefault(); closeDrawer(); K.go('dem'); setTimeout(function () { var b = document.querySelector('[data-v5=tab][data-v=sec]'); if (b) b.click(); }, 450); return; }
    var m = e.target.closest('[data-v6map]'); if (m) { e.preventDefault(); var sid = m.getAttribute('data-v6map'); closeDrawer(); K.go('map'); setTimeout(function () { try { K.MAP.selItem(sid); } catch (x) { /* pruned */ } }, 420); return; }
    var iv = e.target.closest('[data-v6inv]'); if (iv && K.invFilter) {
      e.preventDefault(); var a = iv.getAttribute('data-v6inv');
      if (a.indexOf('site:') === 0) { var s0 = site(a.slice(5)); K.invFilter({ site: a.slice(5), cc: s0 ? s0.country : '' }); }
      else { var d0 = D.demands.filter(function (x) { return x.id === a.slice(4); })[0]; if (d0) K.invFilter({ ids: affected(d0), idsLabel: L3('Afetados por ', 'Afectados por ', 'Affected by ') + d0.id }); }
      closeDrawer(); K.go('inv');
    }
  });
  /* demand cards open the guide */
  var dem0 = K.V.dem;
  K.V.dem = function (el) {
    dem0(el);
    [].forEach.call(el.querySelectorAll('.v5-card'), function (c) {
      var id = c.querySelector('.v5-id'); if (!id) return; id = id.textContent;
      if (!D.demands.some(function (d) { return d.id === id; })) return;
      var ca = c.querySelector('.v5-ca'); if (ca && !ca.querySelector('[data-v6guide]')) ca.insertAdjacentHTML('afterbegin', '<button type="button" class="btn sm pri" data-v6guide="' + esc(id) + '">' + esc(L3('Guia', 'Guía', 'Guide')) + ' →</button>');
      var t = c.querySelector('.v5-ct'); if (t) { t.setAttribute('data-v6guide', id); t.style.cursor = 'pointer'; }
    });
  };

  /* ---------- 6 · resource costs (part of the paid FinOps module) ---------- */
  var CF = { q: '', prov: '', fam: '', owner: '', tag: '', sort: 'cost', dir: -1 };
  function provOf(n) { return K.provOf ? K.provOf(n) : 'On-prem'; }
  K.V.cost = function (el) {
    var per = ls('osc.persona') || 'mgr';
    var h = K.head(L3('Gestão', 'Gestión', 'Management'), L3('Custos por recurso', 'Costos por recurso', 'Resource costs'), esc(L3('Cada recurso com custo mensal, dono, tag e origem. Filtre, ordene e exporte.', 'Cada recurso con costo mensual, dueño, tag y origen. Filtra, ordena y exporta.', 'Every resource with monthly cost, owner, tag and origin. Filter, sort and export.')), '<span class="v5-ent">★ ' + L3('Módulo Enterprise', 'Módulo Enterprise', 'Enterprise module') + '</span>');
    if (per === 'analyst') { el.innerHTML = h + '<div class="v5-lock"><b>🔒 ' + esc(L3('Seu perfil não vê valores.', 'Tu perfil no ve valores.', 'Your role does not see prices.')) + '</b><span>' + esc(L3('Troque o perfil em FinOps para ver como um gestor vê esta tela.', 'Cambia el perfil en FinOps para ver como un gestor.', 'Switch the persona in FinOps to see what a manager sees.')) + '</span><button type="button" class="btn sm" data-go="finops">FinOps →</button></div>'; return; }
    var all = K.nodeList().filter(function (n) { return n.cost; }), fam = (K.ICON6 && K.ICON6.famOf) || {};
    var owners = {}, provs = {}; all.forEach(function (n) { owners[n.costOwner || '—'] = 1; provs[provOf(n)] = 1; });
    var sel = function (id, cur, map, ph) { return '<select id="' + id + '"><option value="">' + esc(ph) + '</option>' + Object.keys(map).sort().map(function (k) { return '<option value="' + esc(k) + '"' + (cur === k ? ' selected' : '') + '>' + esc(map[k] === 1 ? k : map[k]) + '</option>'; }).join('') + '</select>'; };
    var FN = { net: L3('Rede', 'Red', 'Network'), sec: L3('Segurança', 'Seguridad', 'Security'), cmp: 'Compute', dat: L3('Dados', 'Datos', 'Data'), ops: L3('Operação', 'Operación', 'Operations') };
    h += '<div class="panel pad v6-cf"><input type="search" id="cfq" placeholder="' + esc(L3('Buscar recurso, site, tipo…', 'Buscar recurso, sitio, tipo…', 'Search resource, site, type…')) + '" value="' + esc(CF.q) + '">' + sel('cfp', CF.prov, provs, L3('Todas as origens', 'Todos los orígenes', 'All origins')) + sel('cff', CF.fam, FN, L3('Todas as famílias', 'Todas las familias', 'All families')) + sel('cfo', CF.owner, owners, L3('Todos os donos', 'Todos los dueños', 'All owners')) +
      '<select id="cft"><option value="">' + esc(L3('Com e sem tag', 'Con y sin tag', 'Tagged and untagged')) + '</option><option value="no"' + (CF.tag === 'no' ? ' selected' : '') + '>' + esc(L3('Só sem tag', 'Solo sin tag', 'Untagged only')) + '</option><option value="yes"' + (CF.tag === 'yes' ? ' selected' : '') + '>' + esc(L3('Só com tag', 'Solo con tag', 'Tagged only')) + '</option></select><button type="button" class="btn sm" id="cfx">CSV ↓</button></div><div id="cfb"></div>';
    el.innerHTML = h;
    function rows() {
      var q = (CF.q || '').toLowerCase();
      return all.filter(function (n) {
        var s = K.siteOf(n);
        if (CF.prov && provOf(n) !== CF.prov) return false; if (CF.fam && fam[n.type] !== CF.fam) return false; if (CF.owner && (n.costOwner || '—') !== CF.owner) return false;
        if (CF.tag === 'no' && n.tagged) return false; if (CF.tag === 'yes' && !n.tagged) return false;
        return !q || [n.name, n.type, K.TYPES[n.type], s && s.name, n.role, n.vendor].join(' ').toLowerCase().indexOf(q) >= 0;
      }).sort(function (a, b) { var x = CF.sort === 'cost' ? a.cost - b.cost : String(CF.sort === 'site' ? (K.siteOf(a) || {}).name : a[CF.sort] || '').localeCompare(String(CF.sort === 'site' ? (K.siteOf(b) || {}).name : b[CF.sort] || '')); return x * CF.dir; });
    }
    function draw() {
      var r = rows(), tot = r.reduce(function (a, n) { return a + n.cost; }, 0), mx = r.reduce(function (a, n) { return Math.max(a, n.cost); }, 1);
      var th = function (k, l, cls) { return '<th data-cs="' + k + '" class="' + (cls || '') + '">' + esc(l) + (CF.sort === k ? (CF.dir > 0 ? ' ▲' : ' ▼') : '') + '</th>'; };
      $('cfb').innerHTML = '<div class="v5-kpis"><div class="v5-kpi"><b>' + money(tot) + '</b><span>' + esc(L3('por mês, filtro atual', 'por mes, filtro actual', 'per month, current filter')) + '</span></div><div class="v5-kpi"><b>' + r.length + '</b><span>' + esc(L3('recursos', 'recursos', 'resources')) + '</span></div><div class="v5-kpi s-high"><b>' + r.filter(function (n) { return !n.tagged; }).length + '</b><span>' + esc(L3('sem tag de custo', 'sin tag de costo', 'without cost tag')) + '</span></div></div>' +
        '<div class="v5-tbl"><table><thead><tr><th></th>' + th('name', L3('Recurso', 'Recurso', 'Resource')) + th('site', L3('Site / região', 'Sitio / región', 'Site / region')) + th('costOwner', L3('Dono', 'Dueño', 'Owner')) + '<th>Tag</th>' + th('cost', L3('Custo/mês', 'Costo/mes', 'Cost/month'), 'num') + '<th class="v6-barh"></th></tr></thead><tbody>' +
        r.map(function (n) { var s = K.siteOf(n); return '<tr data-open="' + esc(n.id) + '"><td>' + (K.typeTile ? K.typeTile(n, 22) : '') + '</td><td><b>' + esc(n.name) + '</b><small>' + esc(K.TYPES[n.type] || n.type) + '</small></td><td>' + (K.originBadge ? K.originBadge(n) : '') + ' ' + esc(s ? (s.short || s.name) : '—') + '</td><td>' + esc(n.costOwner || '—') + '</td><td>' + (n.tagged ? '✓' : '<span class="untag">' + esc(L3('sem tag', 'sin tag', 'untagged')) + '</span>') + '</td><td class="num">' + money(n.cost) + '</td><td class="v6-bar"><i style="width:' + (n.cost / mx * 100).toFixed(1) + '%"></i></td></tr>'; }).join('') + '</tbody></table></div>';
      [].forEach.call($('cfb').querySelectorAll('[data-cs]'), function (t) { t.onclick = function () { var k = t.getAttribute('data-cs'); if (CF.sort === k) CF.dir = -CF.dir; else { CF.sort = k; CF.dir = k === 'cost' ? -1 : 1; } draw(); }; });
    }
    var qT; $('cfq').oninput = function () { CF.q = this.value; clearTimeout(qT); qT = setTimeout(draw, 140); };
    [['cfp', 'prov'], ['cff', 'fam'], ['cfo', 'owner'], ['cft', 'tag']].forEach(function (x) { $(x[0]).onchange = function () { CF[x[1]] = this.value; draw(); }; });
    $('cfx').onclick = function () {
      var r = rows(), csv = ['resource,type,origin,site,owner,tagged,cost_usd_month'].concat(r.map(function (n) { var s = K.siteOf(n); return [n.name, n.type, provOf(n), s ? s.name : '', n.costOwner || '', n.tagged ? 'yes' : 'no', n.cost].map(function (v) { v = String(v); return /[",]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(','); })).join('\n');
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'orbiscale-resource-costs.csv'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    };
    draw();
  };
  (function () { var hv = (location.hash || '').slice(1); if (hv === 'cost') setTimeout(function () { K.go('cost'); }, 60); })();

  /* topology: add the view button whenever it draws */
  var td0 = K.onTopoDraw; K.onTopoDraw = function () { if (td0) td0.apply(this, arguments); addVpButton(); };
})();
