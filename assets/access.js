/*!
 * Orbiscale · Network Ops Console
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). All rights reserved except as granted below.
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Commercial licence (no AGPL obligations, enterprise modules, support): see COMMERCIAL.md
 */
/* Contoso Ops Suite — access layer shared by Orbiscale and Orbiscale Flow:
   "My profile", "Administration" (users, groups, module permissions, just-in-time elevation, audit),
   "view as" simulation and permission enforcement on the menus. Demo only: people and groups are fictional,
   everything is stored in this browser (localStorage) and nothing leaves it. */
(function () {
'use strict';
var PF = window.PF; if (!PF || !PF.addSection) return;
var P = PF.product, esc = PF.esc, store = PF.store;
function L3(pt, es, en) { var l = PF.lang(); return l === 'es' ? es : l === 'en' ? en : pt; }
function T(a) { return L3(a[0], a[1], a[2]); }
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

/* ---------- 1 · model ---------- */
/* module: [id, product, name, views[], sensitive] */
var MODS = [
  ['o.map', 'knoc', ['Mapa, topologia e visão geral', 'Mapa, topología y vista general', 'Map, topology and overview'], ['home', 'map', 'topo']],
  ['o.inv', 'knoc', ['Inventário e monitoria', 'Inventario y monitoreo', 'Inventory and monitoring'], ['inv', 'mon', 'health', 'gaps', 'status']],
  ['o.dem', 'knoc', ['Demandas', 'Demandas', 'Work items'], ['dem']],
  ['o.sec', 'knoc', ['Segurança', 'Seguridad', 'Security'], ['sec'], 1],
  ['o.endp', 'knoc', ['Endpoints & Pessoas (dados pessoais)', 'Endpoints y Personas (datos personales)', 'Endpoints & People (personal data)'], ['endp'], 1],
  ['o.cloud', 'knoc', ['Cloud, aplicações e telefonia', 'Cloud, aplicaciones y telefonía', 'Cloud, applications and telephony'], ['cloud', 'apps', 'tel', 'partners', 'portals']],
  ['o.fin', 'knoc', ['FinOps e custos (Enterprise)', 'FinOps y costos (Enterprise)', 'FinOps and costs (Enterprise)'], ['finops', 'cost'], 1],
  ['o.life', 'knoc', ['Ciclo de vida e licenças', 'Ciclo de vida y licencias', 'Lifecycle & licences'], ['life']],
  ['o.tools', 'knoc', ['Troubleshooting, ferramentas e assistente', 'Troubleshooting, herramientas y asistente', 'Troubleshooting, tools and assistant'], ['ts', 'tools', 'ai', 'docs']],
  ['f.board', 'backlog', ['Flow · quadro e Daily', 'Flow · tablero y Daily', 'Flow · board and Daily'], ['board', 'daily']],
  ['f.sd', 'backlog', ['Flow · Service Desk N1', 'Flow · Service Desk N1', 'Flow · Service Desk L1'], ['sd']],
  ['f.rep', 'backlog', ['Flow · relatórios, capacidade e método', 'Flow · reportes, capacidad y método', 'Flow · reports, capacity and method'], ['rep', 'cap', 'met']],
  ['f.ai', 'backlog', ['Flow · assistente', 'Flow · asistente', 'Flow · assistant'], ['ai']],
  ['p.admin', 'both', ['Administração, integrações e SSO', 'Administración, integraciones y SSO', 'Administration, integrations and SSO'], [], 1]
];
var LV = [['Sem acesso', 'Sin acceso', 'No access'], ['Ler', 'Leer', 'Read'], ['Operar', 'Operar', 'Operate'], ['Administrar', 'Administrar', 'Administer']];
var GROUPS = [
  ['gg-orb-admins', 'GG-ORB-Admins', ['Administradores da plataforma', 'Administradores de la plataforma', 'Platform administrators']],
  ['gg-noc', 'GG-NOC-Operators', ['Operação de rede e infra', 'Operación de red e infra', 'Network and infra operations']],
  ['gg-secops', 'GG-SecOps', ['Segurança e resposta a incidentes', 'Seguridad y respuesta a incidentes', 'Security and incident response']],
  ['gg-sd', 'GG-ServiceDesk', ['Service desk N1', 'Service desk N1', 'Service desk L1']],
  ['gg-fin', 'GG-Finance-FinOps', ['Financeiro e FinOps', 'Finanzas y FinOps', 'Finance and FinOps']],
  ['gg-mgr', 'GG-IT-Managers', ['Gestores de TI', 'Gerentes de TI', 'IT managers']],
  ['gg-aud', 'GG-Auditors', ['Auditoria (SOX/ITGC)', 'Auditoría (SOX/ITGC)', 'Audit (SOX/ITGC)']]
];
/* default matrix: group → module → level (0..3) */
var M0 = {
  'gg-orb-admins': fill(3),
  'gg-noc': { 'o.map': 2, 'o.inv': 2, 'o.dem': 2, 'o.sec': 1, 'o.endp': 0, 'o.cloud': 2, 'o.fin': 0, 'o.life': 2, 'o.tools': 2, 'f.board': 2, 'f.sd': 1, 'f.rep': 1, 'f.ai': 2, 'p.admin': 0 },
  'gg-secops': { 'o.map': 1, 'o.inv': 1, 'o.dem': 2, 'o.sec': 3, 'o.endp': 1, 'o.cloud': 1, 'o.fin': 0, 'o.life': 1, 'o.tools': 2, 'f.board': 2, 'f.sd': 1, 'f.rep': 1, 'f.ai': 2, 'p.admin': 0 },
  'gg-sd': { 'o.map': 1, 'o.inv': 1, 'o.dem': 2, 'o.sec': 0, 'o.endp': 1, 'o.cloud': 0, 'o.fin': 0, 'o.life': 0, 'o.tools': 1, 'f.board': 2, 'f.sd': 2, 'f.rep': 0, 'f.ai': 1, 'p.admin': 0 },
  'gg-fin': { 'o.map': 1, 'o.inv': 0, 'o.dem': 1, 'o.sec': 0, 'o.endp': 0, 'o.cloud': 1, 'o.fin': 2, 'o.life': 1, 'o.tools': 0, 'f.board': 0, 'f.sd': 0, 'f.rep': 1, 'f.ai': 0, 'p.admin': 0 },
  'gg-mgr': { 'o.map': 1, 'o.inv': 1, 'o.dem': 1, 'o.sec': 1, 'o.endp': 0, 'o.cloud': 1, 'o.fin': 1, 'o.life': 1, 'o.tools': 1, 'f.board': 1, 'f.sd': 1, 'f.rep': 2, 'f.ai': 1, 'p.admin': 0 },
  'gg-aud': { 'o.map': 1, 'o.inv': 1, 'o.dem': 1, 'o.sec': 1, 'o.endp': 0, 'o.cloud': 1, 'o.fin': 1, 'o.life': 1, 'o.tools': 0, 'f.board': 1, 'f.sd': 1, 'f.rep': 1, 'f.ai': 0, 'p.admin': 1 }
};
function fill(v) { var o = {}; MODS.forEach(function (m) { o[m[0]] = v; }); return o; }
var USERS = [
  ['alex', 'Alex R.', 'alex.r@contoso.example', ['Coordenação de infra', 'Coordinación de infra', 'Infra lead'], ['gg-orb-admins', 'gg-noc']],
  ['diego', 'Diego V.', 'diego.v@contoso.example', ['Gerente de TI', 'Gerente de TI', 'IT manager'], ['gg-mgr']],
  ['carla', 'Carla M.', 'carla.m@contoso.example', ['Analista cloud', 'Analista cloud', 'Cloud analyst'], ['gg-noc']],
  ['elena', 'Elena S.', 'elena.s@contoso.example', ['Analista de segurança', 'Analista de seguridad', 'Security analyst'], ['gg-secops']],
  ['fabio', 'Fábio T.', 'fabio.t@contoso.example', ['Analista FinOps', 'Analista FinOps', 'FinOps analyst'], ['gg-fin']],
  ['gabriel', 'Gabriel O.', 'gabriel.o@contoso.example', ['Analista de infra', 'Analista de infra', 'Infra analyst'], ['gg-noc']],
  ['helena', 'Helena P.', 'helena.p@contoso.example', ['Telefonia e service desk', 'Telefonía y service desk', 'Telephony and service desk'], ['gg-sd', 'gg-noc']],
  ['igor', 'Igor K.', 'igor.k@contoso.example', ['Service desk N1', 'Service desk N1', 'Service desk L1'], ['gg-sd']],
  ['julia', 'Júlia N.', 'julia.n@contoso.example', ['Endpoints e compliance', 'Endpoints y compliance', 'Endpoints and compliance'], ['gg-secops', 'gg-sd']],
  ['kiran', 'Kiran D.', 'kiran.d@contoso.example', ['Suporte global', 'Soporte global', 'Global support'], ['gg-sd']],
  ['audit', 'Auditoria externa', 'auditor@partner.example', ['Auditor (acesso temporário)', 'Auditor (acceso temporal)', 'Auditor (temporary access)'], ['gg-aud']]
];
var VIEWMOD = {}; MODS.forEach(function (m) { m[3].forEach(function (v) { VIEWMOD[(m[1] === 'both' ? '*' : m[1]) + ':' + v] = m[0]; }); });
VIEWMOD['knoc:flow'] = 'f.board'; // the Flow entry in the Orbiscale menu

function st() { var s = store.get('rbac', null) || {}; s.mx = s.mx || {}; s.ug = s.ug || {}; s.req = s.req || []; return s; }
function save(s) { store.set('rbac', s); }
function lvlG(g, m, s) { s = s || st(); var o = s.mx[g] && s.mx[g][m]; return o != null ? o : (M0[g] && M0[g][m] != null ? M0[g][m] : 0); }
function groupsOf(u, s) { s = s || st(); if (s.ug[u]) return s.ug[u]; var x = USERS.filter(function (r) { return r[0] === u; })[0]; return x ? x[4] : []; }
function user(u) { return USERS.filter(function (r) { return r[0] === u; })[0]; }
function now() { return Date.now(); }
function activeElev(u, m, s) { s = s || st(); return s.req.filter(function (r) { return r.u === u && r.m === m && r.st === 'ok' && r.until > now(); }); }
function level(m, u) {
  var s = st(); u = u || s.viewAs; if (!u) return 3; // demo visitor = administrator
  var best = 0; groupsOf(u, s).forEach(function (g) { best = Math.max(best, lvlG(g, m, s)); });
  activeElev(u, m, s).forEach(function (r) { best = Math.max(best, r.lv); });
  return best;
}
function modOfView(v, prod) { return VIEWMOD[(prod || P) + ':' + v] || null; }
function canView(v, prod) { var m = modOfView(v, prod); return !m || level(m) > 0; }
window.PF_ACCESS = { level: level, canView: canView, modOfView: modOfView, viewAs: function () { return st().viewAs || null; }, MODS: MODS };

/* ---------- 2 · enforcement on the menus + "view as" banner ---------- */
function navSel() { return P === 'knoc' ? '#nav [data-go], #mnav [data-go]' : '#nav [data-v]'; }
function viewOf(b) { return b.getAttribute('data-go') || b.getAttribute('data-v'); }
var hiding = false;
function applyNav() {
  if (hiding) return; hiding = true;
  $$(navSel()).forEach(function (b) {
    var v = viewOf(b), m = modOfView(v), l = m ? level(m) : 3;
    b.classList.toggle('ax-hide', l === 0); b.classList.toggle('ax-ro', l === 1);
    if (l === 1) b.setAttribute('data-ax', L3('leitura', 'lectura', 'read-only')); else b.removeAttribute('data-ax');
  });
  /* hide a group title when every item under it is hidden */
  var nav = document.getElementById('nav');
  if (nav && P === 'knoc') { var head = null, any = false; [].slice.call(nav.children).concat([null]).forEach(function (c) {
    if (!c || c.classList.contains('navg')) { if (head) head.classList.toggle('ax-hide', !any); head = c; any = false; }
    else if (!c.classList.contains('ax-hide')) any = true; }); }
  hiding = false;
}
function banner() {
  var s = st(), b = $('#axBanner');
  if (!s.viewAs) { if (b) b.remove(); document.documentElement.classList.remove('ax-as'); return; }
  var u = user(s.viewAs); if (!u) return;
  if (!b) { b = document.createElement('div'); b.id = 'axBanner'; b.className = 'ax-banner'; b.setAttribute('role', 'status'); document.body.appendChild(b); }
  var els = s.req.filter(function (r) { return r.u === u[0] && r.st === 'ok' && r.until > now(); });
  b.innerHTML = '👁 ' + esc(L3('Vendo como', 'Viendo como', 'Viewing as')) + ' <b>' + esc(u[1]) + '</b> · ' + esc(groupsOf(u[0]).map(function (g) { return (GROUPS.filter(function (x) { return x[0] === g; })[0] || [g, g])[1]; }).join(', ')) +
    (els.length ? ' · ⏱ ' + els.length + ' ' + esc(L3('elevação ativa', 'elevación activa', 'active elevation')) : '') +
    ' <button type="button" data-ax="req">' + esc(L3('Solicitar acesso', 'Solicitar acceso', 'Request access')) + '</button><button type="button" data-ax="exit">' + esc(L3('Voltar a ser admin', 'Volver a admin', 'Back to admin')) + '</button>';
  document.documentElement.classList.add('ax-as');
}
function refresh() { applyNav(); banner(); }
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('#axBanner [data-ax]');
  if (a) { if (a.getAttribute('data-ax') === 'exit') setViewAs(null); else reqDialog(); return; }
  var b = e.target.closest && e.target.closest(navSel()); if (!b) return;
  var v = viewOf(b); if (canView(v)) return;
  e.preventDefault(); e.stopImmediatePropagation(); denied(v);
}, true);
function wrapGo() {
  if (P === 'knoc' && window.KNOC && KNOC.go && !KNOC.go._ax) { var g0 = KNOC.go; KNOC.go = function (v) { if (!canView(v)) { denied(v); return; } return g0.apply(this, arguments); }; KNOC.go._ax = 1; }
  if (P === 'backlog' && window.BL && BL.go && !BL.go._ax) { var g1 = BL.go; BL.go = function (v) { if (!canView(v)) { denied(v); return; } return g1.apply(this, arguments); }; BL.go._ax = 1; }
}
function denied(v) {
  var m = modOfView(v), mm = MODS.filter(function (x) { return x[0] === m; })[0];
  var box = PF.modal(L3('Sem acesso a este módulo', 'Sin acceso a este módulo', 'No access to this module'), mm ? T(mm[2]) : v,
    '<p class="ax-p">' + esc(L3('Seu perfil não inclui este módulo. Peça uma elevação temporária: um administrador aprova, e ela expira sozinha.', 'Tu perfil no incluye este módulo. Pide una elevación temporal: un administrador la aprueba y vence sola.', 'Your role does not include this module. Ask for a temporary elevation: an administrator approves it and it expires on its own.')) + '</p><button class="pf-b pri" data-axq="' + esc(m || '') + '">' + esc(L3('Solicitar elevação', 'Solicitar elevación', 'Request elevation')) + '</button>');
  box.addEventListener('click', function (e) { var q = e.target.closest('[data-axq]'); if (q) { PF.closeLayer(); reqDialog(q.getAttribute('data-axq')); } });
}
function setViewAs(u) {
  var s = st(); s.viewAs = u || null; save(s); PF.audit('rbac · view as ' + (u || 'admin')); refresh();
  if (u) { var cur = P === 'knoc' ? (window.KNOC && KNOC.S && KNOC.S.view) : (window.BL && BL.view && BL.view()); if (cur && !canView(cur)) { var first = MODS.filter(function (m) { return (m[1] === P) && level(m[0]) > 0; })[0]; if (first) { if (P === 'knoc') KNOC.go(first[3][0]); else BL.go(first[3][0]); } } }
  PF.toast(u ? L3('Vendo como ', 'Viendo como ', 'Viewing as ') + user(u)[1] : L3('De volta como administrador.', 'De vuelta como administrador.', 'Back as administrator.'));
}

/* ---------- 3 · just-in-time elevation request ---------- */
function reqDialog(mod) {
  var s = st(), u = s.viewAs || 'alex', me = user(u);
  var opts = MODS.map(function (m) { var cur = level(m[0], u); return '<option value="' + m[0] + '"' + (m[0] === mod ? ' selected' : '') + (cur >= 3 ? ' disabled' : '') + '>' + esc(T(m[2])) + ' — ' + esc(T(LV[cur])) + '</option>'; }).join('');
  var box = PF.modal(L3('Solicitar elevação temporária', 'Solicitar elevación temporal', 'Request temporary elevation'), me[1] + ' · ' + me[2],
    '<div class="ax-form"><label>' + esc(L3('Módulo', 'Módulo', 'Module')) + '<select id="axM">' + opts + '</select></label>' +
    '<label>' + esc(L3('Nível', 'Nivel', 'Level')) + '<select id="axL"><option value="1">' + esc(T(LV[1])) + '</option><option value="2" selected>' + esc(T(LV[2])) + '</option><option value="3">' + esc(T(LV[3])) + '</option></select></label>' +
    '<label>' + esc(L3('Duração', 'Duración', 'Duration')) + '<select id="axD"><option value="1">1 h</option><option value="4" selected>4 h</option><option value="8">8 h</option></select></label>' +
    '<label>' + esc(L3('Chamado / mudança (opcional)', 'Ticket / cambio (opcional)', 'Ticket / change (optional)')) + '<input id="axT" placeholder="RFC-2214"></label>' +
    '<label class="ax-wide">' + esc(L3('Justificativa', 'Justificación', 'Justification')) + '<textarea id="axJ" rows="3" placeholder="' + esc(L3('Por que você precisa, o que vai fazer e por quanto tempo', 'Por qué lo necesitas, qué harás y por cuánto tiempo', 'Why you need it, what you will do and for how long')) + '"></textarea></label></div>' +
    '<p class="ax-note">' + esc(L3('Política: máximo 8 h, MFA no momento da ativação, aprovação de outra pessoa (ninguém aprova o próprio pedido) e registro na auditoria.', 'Política: máximo 8 h, MFA al activar, aprobación de otra persona (nadie aprueba su propio pedido) y registro en la auditoría.', 'Policy: 8 h maximum, MFA on activation, approval by someone else (nobody approves their own request) and an audit record.')) + '</p>' +
    '<button class="pf-b pri" id="axGo">' + esc(L3('Enviar para aprovação', 'Enviar para aprobación', 'Send for approval')) + '</button>');
  $('#axGo', box).onclick = function () {
    var j = ($('#axJ', box).value || '').trim(); if (j.length < 12) { $('#axJ', box).focus(); PF.toast(L3('Escreva uma justificativa (mín. 12 caracteres).', 'Escribe una justificación (mín. 12 caracteres).', 'Write a justification (12+ characters).')); return; }
    var s2 = st(), r = { id: 'ELV-' + (1000 + s2.req.length + 1), u: u, m: $('#axM', box).value, lv: +$('#axL', box).value, h: +$('#axD', box).value, j: j.slice(0, 300), t: ($('#axT', box).value || '').slice(0, 40), at: now(), st: 'pending' };
    s2.req.unshift(r); save(s2); PF.audit('rbac · elevation requested ' + r.id + ' ' + r.u + ' ' + r.m + '=' + r.lv + ' ' + r.h + 'h'); PF.closeLayer();
    PF.toast(L3('Pedido ', 'Pedido ', 'Request ') + r.id + L3(' enviado. Aprovação em Configurações › Administração.', ' enviado. Aprobación en Configuración › Administración.', ' sent. Approve it in Settings › Administration.')); refresh();
  };
}

/* ---------- 4 · settings: My profile ---------- */
function prof() { return store.get('profile', {}) || {}; }
function profSave(p) { store.set('profile', p); }
var START = {
  knoc: [['home', ['Visão geral', 'Vista general', 'Overview']], ['map', ['Mapa', 'Mapa', 'Map']], ['dem', ['Demandas', 'Demandas', 'Work items']], ['sec', ['Segurança', 'Seguridad', 'Security']], ['finops', ['FinOps', 'FinOps', 'FinOps']]],
  backlog: [['board', ['Quadro', 'Tablero', 'Board']], ['sd', ['Service Desk', 'Service Desk', 'Service Desk']], ['rep', ['Relatórios', 'Reportes', 'Reports']], ['cap', ['Capacidade', 'Capacidad', 'Capacity']]]
};
PF.addSection('me', '^', function () { return L3('Meu perfil', 'Mi perfil', 'My profile'); }, 'user', function () {
  var p = prof(), s = st(), sess = PF.session() || { name: 'Visitante (demo)' }, u = s.viewAs ? user(s.viewAs) : null;
  var name = u ? u[1] : (p.name || sess.name), mail = u ? u[2] : (p.mail || 'visitor@contoso.example');
  var sel = function (id, cur, list) { return '<select data-pp="' + id + '">' + list.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === cur ? ' selected' : '') + '>' + esc(typeof o[1] === 'string' ? o[1] : T(o[1])) + '</option>'; }).join('') + '</select>'; };
  var per = (function () { try { return localStorage.getItem('osc.persona') || 'mgr'; } catch (e) { return 'mgr'; } })();
  var mods = MODS.map(function (m) { var l = level(m[0]); return '<tr><td>' + esc(T(m[2])) + (m[4] ? ' <span class="ax-sens" title="' + esc(L3('Sensível', 'Sensible', 'Sensitive')) + '">🔒</span>' : '') + '</td><td><span class="ax-lv l' + l + '">' + esc(T(LV[l])) + '</span></td><td>' + (l < 3 ? '<button class="pf-b sm" data-axreq="' + m[0] + '">' + esc(L3('Pedir mais', 'Pedir más', 'Ask for more')) + '</button>' : '') + '</td></tr>'; }).join('');
  return '<h1 class="pf-h">' + esc(L3('Meu perfil', 'Mi perfil', 'My profile')) + '</h1><p class="pf-sub">' + esc(L3('Seus dados, preferências e acessos. Vale para o Orbiscale e o Flow.', 'Tus datos, preferencias y accesos. Vale para Orbiscale y Flow.', 'Your details, preferences and access. Applies to Orbiscale and Flow.')) + '</p>' +
    '<section class="pf-sec ax-id"><span class="ax-av">' + esc(name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase()) + '</span><div><b>' + esc(name) + '</b><small>' + esc(mail) + ' · ' + esc(u ? T(u[3]) : L3('Administrador (demo)', 'Administrador (demo)', 'Administrator (demo)')) + '</small><small>Entra ID · MFA ✓ · SCIM</small></div></section>' +
    '<section class="pf-sec"><h3>' + esc(L3('Preferências', 'Preferencias', 'Preferences')) + '</h3><div class="ax-form">' +
    '<label>' + esc(L3('Início no Orbiscale', 'Inicio en Orbiscale', 'Orbiscale start page')) + sel('startKnoc', p.startKnoc || 'home', START.knoc) + '</label>' +
    '<label>' + esc(L3('Início no Flow', 'Inicio en Flow', 'Flow start page')) + sel('startFlow', p.startFlow || 'board', START.backlog) + '</label>' +
    '<label>' + esc(L3('Visão de custos (persona)', 'Vista de costos (persona)', 'Cost view (persona)')) + sel('persona', per, [['exec', ['Executivo', 'Ejecutivo', 'Executive']], ['mgr', ['Gerente', 'Gerente', 'Manager']], ['coord', ['Coordenador', 'Coordinador', 'Coordinator']], ['analyst', ['Analista', 'Analista', 'Analyst']]]) + '</label>' +
    '<label>' + esc(L3('Resumo por e-mail', 'Resumen por correo', 'E-mail digest')) + sel('digest', p.digest || '07:30', [['off', ['Desligado', 'Apagado', 'Off']], ['07:00', '07:00'], ['07:30', '07:30'], ['08:00', '08:00']]) + '</label>' +
    '<label>' + esc(L3('Horário de silêncio', 'Horario de silencio', 'Quiet hours')) + sel('quiet', p.quiet || '22-07', [['off', ['Sem', 'Sin', 'None']], ['22-07', '22:00 – 07:00'], ['20-08', '20:00 – 08:00']]) + '</label>' +
    '<label>' + esc(L3('Avisos que eu recebo', 'Avisos que recibo', 'Alerts I receive')) + sel('alerts', p.alerts || 'p0', [['p0', ['Só P0 e menções', 'Solo P0 y menciones', 'P0 and mentions only']], ['p1', ['P0, P1 e menções', 'P0, P1 y menciones', 'P0, P1 and mentions']], ['all', ['Tudo do meu time', 'Todo de mi equipo', 'Everything for my team']]]) + '</label></div></section>' +
    '<section class="pf-sec"><h3>' + esc(L3('Meus acessos', 'Mis accesos', 'My access')) + '</h3><table class="pf-mx ax-mine"><tr><th>' + esc(L3('Módulo', 'Módulo', 'Module')) + '</th><th>' + esc(L3('Nível', 'Nivel', 'Level')) + '</th><th></th></tr>' + mods + '</table></section>' +
    '<section class="pf-sec"><h3>' + esc(L3('Meus dados (LGPD)', 'Mis datos (LGPD)', 'My data (privacy)')) + '</h3><div class="ax-acts"><button class="pf-b" data-axme="export">⬇ ' + esc(L3('Exportar meus dados', 'Exportar mis datos', 'Export my data')) + '</button><button class="pf-b" data-axme="wipe">' + esc(L3('Apagar meus dados deste navegador', 'Borrar mis datos de este navegador', 'Erase my data from this browser')) + '</button></div></section>';
}, function (body) {
  body.onchange = function (e) {
    var x = e.target.closest('[data-pp]'); if (!x) return; var k = x.getAttribute('data-pp'), p = prof();
    if (k === 'persona') { try { localStorage.setItem('osc.persona', x.value); } catch (er) { /* ok */ } } else { p[k] = x.value; profSave(p); }
    PF.audit('profile · ' + k + ' = ' + x.value); PF.toast(L3('Salvo.', 'Guardado.', 'Saved.'));
  };
  body.onclick = function (e) {
    var r = e.target.closest('[data-axreq]'); if (r) { PF.closeLayer(); reqDialog(r.getAttribute('data-axreq')); return; }
    var a = e.target.closest('[data-axme]'); if (!a) return;
    if (a.getAttribute('data-axme') === 'export') {
      var out = { exportedAt: new Date().toISOString(), profile: prof(), access: MODS.map(function (m) { return { module: m[0], level: level(m[0]) }; }), audit: (store.get('audit', []) || []).slice(0, 200) };
      var url = URL.createObjectURL(new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' })), l = document.createElement('a'); l.href = url; l.download = 'my-data-orbiscale.json'; document.body.appendChild(l); l.click(); setTimeout(function () { URL.revokeObjectURL(url); l.remove(); }, 800);
      PF.audit('profile · data exported'); return;
    }
    if (!a.classList.contains('armed')) { a.classList.add('armed'); a.textContent = L3('Clique de novo para confirmar', 'Haz clic otra vez para confirmar', 'Click again to confirm'); return; }
    try { Object.keys(localStorage).forEach(function (k) { if (/^(pf\.|osc\.|knoc\.|bl_)/.test(k)) localStorage.removeItem(k); }); } catch (er) { /* ok */ }
    location.reload();
  };
});

/* ---------- 5 · settings: Administration ---------- */
var AT = 'users';
PF.addSection('admin', 'auth', function () { return L3('Administração', 'Administración', 'Administration'); }, 'key', function () {
  var s = st(), me = s.viewAs, can = level('p.admin') >= 3;
  var h = '<h1 class="pf-h">' + esc(L3('Administração', 'Administración', 'Administration')) + '</h1><p class="pf-sub">' + esc(L3('Quem acessa o quê, no Orbiscale e no Flow. Grupos vêm do Entra ID (SCIM); a elevação é temporária e auditada.', 'Quién accede a qué, en Orbiscale y Flow. Los grupos vienen de Entra ID (SCIM); la elevación es temporal y auditada.', 'Who can reach what, in Orbiscale and Flow. Groups come from Entra ID (SCIM); elevation is temporary and audited.')) + ' <i class="ax-demo">' + esc(L3('Demo: pessoas e grupos fictícios, salvos só neste navegador.', 'Demo: personas y grupos ficticios, guardados solo en este navegador.', 'Demo: fictional people and groups, stored only in this browser.')) + '</i></p>';
  if (!can) return h + '<section class="pf-sec"><p>🔒 ' + esc(L3('Você está vendo como ', 'Estás viendo como ', 'You are viewing as ')) + esc(user(me)[1]) + esc(L3(', que não administra a plataforma.', ', que no administra la plataforma.', ', who does not administer the platform.')) + '</p><button class="pf-b pri" data-axa="exit">' + esc(L3('Voltar a ser admin', 'Volver a admin', 'Back to admin')) + '</button></section>';
  var pend = s.req.filter(function (r) { return r.st === 'pending'; }).length;
  h += '<div class="pf-filters ax-tabs">' + [['users', L3('Usuários', 'Usuarios', 'Users')], ['groups', L3('Grupos', 'Grupos', 'Groups')], ['mx', L3('Permissões por módulo', 'Permisos por módulo', 'Module permissions')], ['elev', L3('Elevações', 'Elevaciones', 'Elevations') + (pend ? ' · ' + pend : '')], ['aud', L3('Auditoria', 'Auditoría', 'Audit')]]
    .map(function (x) { return '<button data-axt="' + x[0] + '" aria-pressed="' + (AT === x[0]) + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>';
  var gname = function (g) { return (GROUPS.filter(function (x) { return x[0] === g; })[0] || [g, g])[1]; };
  if (AT === 'users') h += '<table class="pf-mx ax-t"><tr><th>' + esc(L3('Pessoa', 'Persona', 'Person')) + '</th><th>' + esc(L3('Grupos', 'Grupos', 'Groups')) + '</th><th>MFA</th><th></th></tr>' + USERS.map(function (u) {
    return '<tr><td><b>' + esc(u[1]) + '</b><small>' + esc(u[2]) + ' · ' + esc(T(u[3])) + '</small></td><td>' + GROUPS.map(function (g) { var on = groupsOf(u[0], s).indexOf(g[0]) >= 0; return '<button class="ax-chip' + (on ? ' on' : '') + '" data-axug="' + u[0] + '|' + g[0] + '" title="' + esc(T(g[2])) + '">' + esc(g[1].replace('GG-', '')) + '</button>'; }).join('') + '</td><td>✓</td><td><button class="pf-b sm" data-axas="' + u[0] + '">👁 ' + esc(L3('Ver como', 'Ver como', 'View as')) + '</button></td></tr>';
  }).join('') + '</table><p class="ax-note">' + esc(L3('Clique num grupo para incluir ou tirar a pessoa. Em produção a fonte da verdade é o Entra ID; aqui é só simulação.', 'Haz clic en un grupo para agregar o quitar a la persona. En producción la fuente de verdad es Entra ID; aquí es solo simulación.', 'Click a group to add or remove the person. In production the source of truth is Entra ID; this is a simulation.')) + '</p>';
  if (AT === 'groups') h += '<table class="pf-mx ax-t"><tr><th>' + esc(L3('Grupo', 'Grupo', 'Group')) + '</th><th>' + esc(L3('Descrição', 'Descripción', 'Description')) + '</th><th>' + esc(L3('Membros', 'Miembros', 'Members')) + '</th><th>' + esc(L3('Origem', 'Origen', 'Source')) + '</th></tr>' + GROUPS.map(function (g) {
    var mem = USERS.filter(function (u) { return groupsOf(u[0], s).indexOf(g[0]) >= 0; });
    return '<tr><td class="mono"><b>' + esc(g[1]) + '</b></td><td>' + esc(T(g[2])) + '</td><td>' + mem.map(function (u) { return '<span class="ax-mini">' + esc(u[1]) + '</span>'; }).join(' ') + '</td><td>Entra ID · SCIM</td></tr>';
  }).join('') + '</table>';
  if (AT === 'mx') {
    h += '<div class="ax-mxw"><table class="pf-mx ax-mx"><tr><th>' + esc(L3('Módulo', 'Módulo', 'Module')) + '</th>' + GROUPS.map(function (g) { return '<th title="' + esc(T(g[2])) + '">' + esc(g[1].replace('GG-', '')) + '</th>'; }).join('') + '</tr>' +
      MODS.map(function (m) { return '<tr><td>' + esc(T(m[2])) + (m[4] ? ' 🔒' : '') + '</td>' + GROUPS.map(function (g) { var l = lvlG(g[0], m[0], s); return '<td><select class="ax-lv l' + l + '" data-axmx="' + g[0] + '|' + m[0] + '">' + LV.map(function (x, i) { return '<option value="' + i + '"' + (i === l ? ' selected' : '') + '>' + esc(T(x)) + '</option>'; }).join('') + '</select></td>'; }).join('') + '</tr>'; }).join('') +
      '</table></div><div class="ax-acts"><button class="pf-b" data-axa="reset">' + esc(L3('Restaurar padrão', 'Restaurar predeterminado', 'Reset to default')) + '</button><button class="pf-b" data-axa="csv">⬇ CSV</button></div><p class="ax-note">🔒 ' + esc(L3('Módulos sensíveis: mudança vira registro de auditoria e, em produção, passa por aprovação dupla.', 'Módulos sensibles: el cambio queda en auditoría y, en producción, pasa por doble aprobación.', 'Sensitive modules: every change is audited and, in production, needs two approvals.')) + '</p>';
  }
  if (AT === 'elev') {
    var lab = function (r) { var m = MODS.filter(function (x) { return x[0] === r.m; })[0]; return esc(m ? T(m[2]) : r.m) + ' → <b>' + esc(T(LV[r.lv])) + '</b> · ' + r.h + ' h'; };
    var rows = s.req.slice(0, 40).map(function (r) {
      var u = user(r.u) || [r.u, r.u], live = r.st === 'ok' && r.until > now(), state = r.st === 'pending' ? 'pending' : r.st === 'no' ? 'denied' : live ? 'active' : 'expired';
      var lbl = { pending: L3('Aguardando', 'Esperando', 'Pending'), denied: L3('Negado', 'Denegado', 'Denied'), active: L3('Ativo · expira em ', 'Activo · vence en ', 'Active · expires in ') + Math.max(1, Math.round((r.until - now()) / 60000)) + ' min', expired: L3('Expirado / revogado', 'Vencido / revocado', 'Expired / revoked') }[state];
      return '<tr><td class="mono">' + r.id + '</td><td><b>' + esc(u[1]) + '</b><small>' + lab(r) + '</small><small>“' + esc(r.j) + '”' + (r.t ? ' · ' + esc(r.t) : '') + '</small></td><td><span class="ax-st ' + state + '">' + esc(lbl) + '</span>' + (r.by ? '<small>' + esc(L3('por ', 'por ', 'by ')) + esc(r.by) + '</small>' : '') + '</td><td>' +
        (state === 'pending' ? '<button class="pf-b sm pri" data-axok="' + r.id + '">' + esc(L3('Aprovar', 'Aprobar', 'Approve')) + '</button><button class="pf-b sm" data-axno="' + r.id + '">' + esc(L3('Negar', 'Denegar', 'Deny')) + '</button>' : state === 'active' ? '<button class="pf-b sm" data-axrv="' + r.id + '">' + esc(L3('Revogar', 'Revocar', 'Revoke')) + '</button>' : '') + '</td></tr>';
    }).join('');
    h += '<div class="ax-acts"><button class="pf-b pri" data-axa="newreq">+ ' + esc(L3('Simular pedido de alguém', 'Simular pedido de alguien', 'Simulate someone’s request')) + '</button></div>' +
      (rows ? '<table class="pf-mx ax-t"><tr><th>ID</th><th>' + esc(L3('Pedido', 'Pedido', 'Request')) + '</th><th>' + esc(L3('Estado', 'Estado', 'State')) + '</th><th></th></tr>' + rows + '</table>' : '<p class="ax-note">' + esc(L3('Nenhum pedido ainda. Use "Ver como" num usuário e clique em Solicitar acesso, ou simule um pedido.', 'Ningún pedido todavía. Usa "Ver como" con un usuario y haz clic en Solicitar acceso, o simula un pedido.', 'No requests yet. Use "View as" on a user and click Request access, or simulate one.')) + '</p>') +
      '<p class="ax-note">' + esc(L3('Modelo inspirado em PIM (Privileged Identity Management): acesso permanente mínimo, elevação com prazo, aprovação de outra pessoa e trilha de auditoria.', 'Modelo inspirado en PIM: acceso permanente mínimo, elevación con plazo, aprobación de otra persona y auditoría.', 'Modelled on PIM (Privileged Identity Management): minimal standing access, time-boxed elevation, approval by someone else and an audit trail.')) + '</p>';
  }
  if (AT === 'aud') {
    var a = (store.get('audit', []) || []).filter(function (x) { return /^(rbac|profile)/.test(x.what); }).slice(0, 40);
    h += '<table class="pf-mx ax-t"><tr><th>' + esc(L3('Quando', 'Cuándo', 'When')) + '</th><th>' + esc(L3('Quem', 'Quién', 'Who')) + '</th><th>' + esc(L3('O quê', 'Qué', 'What')) + '</th></tr>' + (a.length ? a.map(function (x) { return '<tr><td class="mono">' + esc(x.at.replace('T', ' ').slice(0, 19)) + '</td><td>' + esc(x.who) + '</td><td class="mono">' + esc(x.what) + '</td></tr>'; }).join('') : '<tr><td colspan="3">—</td></tr>') + '</table>';
  }
  return h;
}, function (body) {
  function again() { PF.settings('admin'); }
  body.onchange = function (e) {
    var x = e.target.closest('[data-axmx]'); if (!x) return; var p = x.getAttribute('data-axmx').split('|'), s = st();
    s.mx[p[0]] = s.mx[p[0]] || {}; s.mx[p[0]][p[1]] = +x.value; save(s); PF.audit('rbac · ' + p[0] + ' ' + p[1] + ' = ' + x.value); x.className = 'ax-lv l' + x.value; refresh();
  };
  body.onclick = function (e) {
    var t = e.target.closest('[data-axt]'); if (t) { AT = t.getAttribute('data-axt'); return again(); }
    var as = e.target.closest('[data-axas]'); if (as) { PF.closeLayer(); return setViewAs(as.getAttribute('data-axas')); }
    var ug = e.target.closest('[data-axug]'); if (ug) { var q = ug.getAttribute('data-axug').split('|'), s = st(), cur = groupsOf(q[0], s).slice(), i = cur.indexOf(q[1]); if (i >= 0) cur.splice(i, 1); else cur.push(q[1]); s.ug[q[0]] = cur; save(s); PF.audit('rbac · ' + q[0] + (i >= 0 ? ' − ' : ' + ') + q[1]); refresh(); return again(); }
    var ok = e.target.closest('[data-axok],[data-axno],[data-axrv]');
    if (ok) {
      var id = ok.getAttribute('data-axok') || ok.getAttribute('data-axno') || ok.getAttribute('data-axrv'), s2 = st(), r = s2.req.filter(function (x) { return x.id === id; })[0]; if (!r) return;
      var approver = s2.viewAs && s2.viewAs !== r.u ? user(s2.viewAs)[1] : (r.u === 'alex' ? 'Diego V.' : 'Alex R.');
      if (ok.hasAttribute('data-axok')) { r.st = 'ok'; r.by = approver; r.until = now() + r.h * 3600e3; PF.audit('rbac · elevation approved ' + id + ' by ' + approver + ' (MFA ✓)'); }
      else if (ok.hasAttribute('data-axno')) { r.st = 'no'; r.by = approver; PF.audit('rbac · elevation denied ' + id); }
      else { r.until = now() - 1; PF.audit('rbac · elevation revoked ' + id); }
      save(s2); refresh(); return again();
    }
    var a = e.target.closest('[data-axa]'); if (!a) return; var k = a.getAttribute('data-axa');
    if (k === 'exit') { PF.closeLayer(); return setViewAs(null); }
    if (k === 'reset') { var s3 = st(); s3.mx = {}; s3.ug = {}; save(s3); PF.audit('rbac · matrix reset'); refresh(); return again(); }
    if (k === 'newreq') { var s4 = st(), n = s4.req.length; var samples = [['igor', 'o.sec', 1, 4, L3('Ver o achado da VPN de Lima para responder o usuário com o status certo', 'Ver el hallazgo de la VPN de Lima para responder al usuario con el estado correcto', 'Check the Lima VPN finding to give the user the right status')], ['carla', 'o.fin', 1, 8, L3('Revisar custo do AKS antes do upgrade 1.31 com o gerente', 'Revisar el costo de AKS antes del upgrade 1.31 con el gerente', 'Review AKS cost with the manager before the 1.31 upgrade')], ['fabio', 'o.inv', 1, 4, L3('Conferir quais ativos estão sem tag de custo no inventário', 'Revisar qué activos no tienen tag de costo en el inventario', 'Find which assets have no cost tag in the inventory')], ['kiran', 'o.endp', 2, 1, L3('Reenviar política de conformidade para 3 aparelhos do Canadá', 'Reenviar política de conformidad a 3 equipos de Canadá', 'Re-push the compliance policy to 3 devices in Canada')]];
      var smp = samples[n % samples.length]; s4.req.unshift({ id: 'ELV-' + (1000 + n + 1), u: smp[0], m: smp[1], lv: smp[2], h: smp[3], j: smp[4], t: n % 2 ? 'INC-48' + n : '', at: now(), st: 'pending' }); save(s4); PF.audit('rbac · elevation requested (sim) ' + smp[0]); return again(); }
    if (k === 'csv') {
      var s5 = st(), csv = ['module,' + GROUPS.map(function (g) { return g[1]; }).join(',')].concat(MODS.map(function (m) { return m[0] + ',' + GROUPS.map(function (g) { return ['none', 'read', 'operate', 'admin'][lvlG(g[0], m[0], s5)]; }).join(','); })).join('\n');
      var u = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), l = document.createElement('a'); l.href = u; l.download = 'orbiscale-access-matrix.csv'; document.body.appendChild(l); l.click(); setTimeout(function () { URL.revokeObjectURL(u); l.remove(); }, 800); PF.audit('rbac · matrix exported');
    }
  };
});

/* ---------- 6 · start page from the profile + boot ---------- */
function boot() {
  wrapGo(); refresh();
  var nav = document.getElementById('nav'); if (nav && window.MutationObserver) new MutationObserver(function () { if (!hiding) applyNav(); }).observe(nav, { childList: true });
  var mn = document.getElementById('mnav'); if (mn && window.MutationObserver) new MutationObserver(function () { if (!hiding) applyNav(); }).observe(mn, { childList: true });
  var p = prof(), hasHash = (location.hash || '').length > 1, hasQ = /[?&](q|dem|voice)=?/.test(location.search);
  if (!hasHash && !hasQ) {
    if (P === 'knoc' && p.startKnoc && p.startKnoc !== 'home' && window.KNOC) setTimeout(function () { KNOC.go(p.startKnoc); }, 120);
    if (P === 'backlog' && p.startFlow && p.startFlow !== 'board' && window.BL) setTimeout(function () { BL.go(p.startFlow); }, 120);
  }
  setInterval(function () { var s = st(); if (s.viewAs && s.req.some(function (r) { return r.st === 'ok' && r.until <= now() && !r.gone; })) { s.req.forEach(function (r) { if (r.st === 'ok' && r.until <= now()) r.gone = 1; }); save(s); refresh(); } }, 30000);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 0); }); else setTimeout(boot, 0);
window.addEventListener('storage', function (e) { if (e.key === 'pf.rbac') refresh(); });
})();
