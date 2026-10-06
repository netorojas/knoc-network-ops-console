/* ==========================================================================
   Contoso Ops Suite — portal shell (shared by KNOC and Infra Backlog)
   Adds: demo sign-in (SSO/social, simulated), settings + integrations,
   command palette, FAQ, changelog, 60-second tour, mobile drawer,
   view transitions, count-up KPIs, ripple. No network calls, no secrets.
   ======================================================================== */
(function () {
'use strict';
var me = document.currentScript, P = (me && me.dataset.product) || 'knoc', C = window.PF_CONTENT;
if (!C) return;
var root = document.documentElement; root.dataset.product = P;
var VERSION = '2.0.0';

/* ---------- helpers ---------- */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
var store = {
  get: function (k, d) { try { var v = localStorage.getItem('pf.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set: function (k, v) { try { localStorage.setItem('pf.' + k, JSON.stringify(v)); } catch (e) {} },
  del: function (k) { try { localStorage.removeItem('pf.' + k); } catch (e) {} }
};
var lang = function () { var b = $('#lang [aria-pressed="true"]'); return (b && b.dataset.l) || 'pt'; };
var t = function (k) { return (C.UI[lang()] || C.UI.pt)[k] || C.UI.pt[k] || k; };
var tx = function (o) { return o ? (o[lang()] || o.pt) : ''; };
var el = function (html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; };
var debounce = function (fn, ms) { var h; return function () { clearTimeout(h); h = setTimeout(fn, ms); }; };
var ICON = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3', grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  play: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM10 8.5v7l6-3.5z', help: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5h.01',
  log: 'M12 7v5l3 2M3.5 12a8.5 8.5 0 1 0 2.5-6L3.5 8.5M3.5 4v4.5H8', gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z',
  menu: 'M4 6h16M4 12h16M4 18h16', plug: 'M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0zM12 17v5', shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  bell: 'M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 0 0 4 0', db: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16', info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 7.5h.01', sliders: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4',
  sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z', globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z',
  out: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10', arrow: 'M5 12h14M13 6l6 6-6 6'
};
var svg = function (k) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICON[k] + '"/></svg>'; };
function audit(what) { var a = store.get('audit', []); a.unshift({ at: new Date().toISOString(), who: (store.get('session') || {}).name || 'guest', what: what }); store.set('audit', a.slice(0, 50)); }
function toast(msg) { var x = $('.pf-toast'); if (x) x.remove(); x = el('<div class="pf-toast" role="status"><i></i>' + esc(msg) + '</div>'); document.body.appendChild(x); setTimeout(function () { x.remove(); }, 3200); }

/* ---------- product config ---------- */
var L3 = C.L3;
var PROD = {
  knoc: {
    name: 'KNOC', color: 'linear-gradient(135deg,#2459E8,#06B6D4)', tag: L3('Console de operação de rede', 'Consola de operación de red', 'Network operations console'),
    hero: L3('Opere uma rede de 9 países em uma tela.', 'Opera una red de 9 países en una pantalla.', 'Run a 9-country network from one screen.'),
    heroP: L3('Mapa, topologia, inventário, telefonia e playbooks de troubleshooting, com status vindo de dentro da rede.', 'Mapa, topología, inventario, telefonía y playbooks, con estado que viene de dentro de la red.', 'Map, topology, inventory, telephony and troubleshooting playbooks, with status coming from inside the network.'),
    stats: [['9', L3('países', 'países', 'countries')], ['81', L3('ativos', 'activos', 'assets')], ['13', L3('camadas de playbook', 'capas de playbook', 'playbook layers')]],
    other: { name: 'Infra Backlog', url: '../infra-backlog-dashboard/', color: 'linear-gradient(135deg,#0F8F7E,#6366F1)', s: 'IB', tag: L3('Painel de operação', 'Panel de operación', 'Ops board') },
    s: 'K', mount: '.tbar',
    view: function () { return (location.hash || '#home').slice(1) || 'home'; },
    go: function (v) { if (window.KNOC && KNOC.go) KNOC.go(v); },
    views: [['home', L3('Visão geral', 'Vista general', 'Overview')], ['map', L3('Mapa LATAM', 'Mapa LATAM', 'LATAM map')], ['topo', L3('Topologia', 'Topología', 'Topology')],
      ['inv', L3('Inventário', 'Inventario', 'Inventory')], ['mon', L3('Monitoria', 'Monitoreo', 'Monitoring')], ['health', L3('System Health', 'System Health', 'System Health')],
      ['ts', L3('Troubleshooting', 'Troubleshooting', 'Troubleshooting')], ['cloud', L3('Cloud & Tenants', 'Cloud y tenants', 'Cloud & tenants')], ['tel', L3('Telefonia', 'Telefonía', 'Telephony')],
      ['partners', L3('Parceiros', 'Socios', 'Partners')], ['portals', L3('Portais & Integrações', 'Portales e integraciones', 'Portals & integrations')], ['tools', L3('Ferramentas', 'Herramientas', 'Tools')],
      ['gaps', L3('Pontos de atenção', 'Puntos de atención', 'Attention items')], ['docs', L3('Documentação', 'Documentación', 'Docs')], ['status', L3('Status', 'Estado', 'Status')]],
    tour: [
      [null, null, L3('Bem-vindo ao KNOC', 'Bienvenido a KNOC', 'Welcome to KNOC'), L3('Um console de NOC para uma rede de 9 países. São 6 paradas rápidas.', 'Una consola de NOC para una red de 9 países. Son 6 paradas rápidas.', 'A NOC console for a 9-country network. Six quick stops.')],
      ['home', 'aside.side nav', L3('Módulos', 'Módulos', 'Modules'), L3('Operação, Conhecimento e Plataforma. No celular, este menu vira uma gaveta (☰).', 'Operación, Conocimiento y Plataforma. En el celular, este menú se vuelve un cajón (☰).', 'Operations, Knowledge and Platform. On mobile this becomes a drawer (☰).')],
      ['home', '.gsearch', L3('Busca global', 'Búsqueda global', 'Global search'), L3('Ativo, IP, site ou parceiro. Atalho: /. Para comandos, ⌘K.', 'Activo, IP, sitio o socio. Atajo: /. Para comandos, ⌘K.', 'Asset, IP, site or partner. Shortcut: /. For commands, ⌘K.')],
      ['map', '#mapbox', L3('Mapa LATAM', 'Mapa LATAM', 'LATAM map'), L3('Clique num país ou site para aproximar. Camadas embaixo ligam e desligam cloud, SaaS, fornecedores e telefonia.', 'Haz clic en un país o sitio para acercar. Las capas encienden o apagan cloud, SaaS, proveedores y telefonía.', 'Click a country or site to zoom in. Layers below toggle cloud, SaaS, vendors and telephony.')],
      ['topo', '#topo', L3('Topologia', 'Topología', 'Topology'), L3('Hierárquica (borda → core → acesso) ou Grafo para arrastar. "Enquadrar" centraliza tudo.', 'Jerárquica o Grafo para arrastrar. "Encuadrar" centra todo.', 'Hierarchical (edge → core → access) or Graph to drag around. "Fit" recentres everything.')],
      ['ts', '#view', L3('Troubleshooting por camada', 'Troubleshooting por capa', 'Layer troubleshooting'), L3('Escolha o sintoma e siga a ordem das camadas. Comandos prontos para copiar.', 'Elige el síntoma y sigue el orden de las capas. Comandos listos para copiar.', 'Pick the symptom and follow the layer order. Commands ready to copy.')],
      ['home', '.pf-utils', L3('Configurações, FAQ e diário', 'Configuración, FAQ y bitácora', 'Settings, FAQ and changelog'), L3('Integrações (ServiceNow, Jira, Zabbix…), SSO, notificações e a história do projeto. Pronto!', 'Integraciones, SSO, notificaciones y la historia del proyecto. ¡Listo!', 'Integrations (ServiceNow, Jira, Zabbix…), SSO, notifications and the project history. Done!')]
    ]
  },
  backlog: {
    name: 'Infra Backlog', color: 'linear-gradient(135deg,#0F8F7E,#6366F1)', tag: L3('Painel de operação que se atualiza sozinho', 'Panel de operación que se actualiza solo', 'Self-updating ops board'),
    hero: L3('O painel que o time nunca preenche.', 'El panel que el equipo nunca completa.', 'The board your team never types into.'),
    heroP: L3('E-mail, Teams, a Daily e o ServiceDesk viram prioridades com evidência: FATO, PROVÁVEL ou HIPÓTESE.', 'Correo, Teams, la Daily y el ServiceDesk se vuelven prioridades con evidencia.', 'E-mail, Teams, the Daily and the ServiceDesk become evidence-labelled priorities.'),
    stats: [['0', L3('digitação manual', 'digitación manual', 'manual typing')], ['4', L3('fontes lidas', 'fuentes leídas', 'sources read')], ['5', L3('formatos de exportação', 'formatos de exportación', 'export formats')]],
    other: { name: 'KNOC', url: '../knoc-network-ops-console/', color: 'linear-gradient(135deg,#2459E8,#06B6D4)', s: 'K', tag: L3('Console de rede', 'Consola de red', 'Network console') },
    s: 'IB', mount: '.tools',
    view: function () { return (window.BL && BL.view && BL.view()) || 'board'; },
    go: function (v) { if (window.BL && BL.go) BL.go(v); },
    views: [['board', L3('Quadro', 'Tablero', 'Board')], ['sd', L3('Service Desk N1', 'Service Desk N1', 'Service Desk L1')], ['rep', L3('Relatórios', 'Reportes', 'Reports')],
      ['cap', L3('Capacidade', 'Capacidad', 'Capacity')], ['met', L3('Método', 'Método', 'Method')], ['daily', L3('Daily', 'Daily', 'Daily')], ['ai', L3('Assistente', 'Asistente', 'Assistant')],
      ['docs', L3('Documentação', 'Documentación', 'Docs')], ['status', L3('Status', 'Estado', 'Status')]],
    tour: [
      [null, null, L3('Bem-vindo ao Infra Backlog', 'Bienvenido a Infra Backlog', 'Welcome to Infra Backlog'), L3('O painel que se atualiza sozinho. São 6 paradas rápidas.', 'El panel que se actualiza solo. Son 6 paradas rápidas.', 'The board that updates itself. Six quick stops.')],
      ['board', 'nav.main', L3('Abas', 'Pestañas', 'Tabs'), L3('Quadro, Service Desk, Relatórios, Capacidade, Método, Daily e Assistente.', 'Tablero, Service Desk, Reportes, Capacidad, Método, Daily y Asistente.', 'Board, Service Desk, Reports, Capacity, Method, Daily and Assistant.')],
      ['board', '.fcard', L3('Busca e filtros', 'Búsqueda y filtros', 'Search and filters'), L3('Combine analista, país, projeto e impacto. Os números mostram quanto sobra.', 'Combina analista, país, proyecto e impacto.', 'Combine analyst, country, project and impact. Counts show what is left.')],
      ['board', '.kpis', L3('Indicadores clicáveis', 'Indicadores clicables', 'Clickable KPIs'), L3('Cada cartão filtra o quadro ou abre a aba certa.', 'Cada tarjeta filtra el tablero o abre la pestaña correcta.', 'Each card filters the board or opens the right tab.')],
      ['rep', '.rctl', L3('Relatórios', 'Reportes', 'Reports'), L3('Período, pessoas e exportação em XLSX, CSV, JSON, Markdown ou HTML.', 'Período, personas y exportación en XLSX, CSV, JSON, Markdown o HTML.', 'Period, people and export to XLSX, CSV, JSON, Markdown or HTML.')],
      ['board', '.pf-utils', L3('Configurações, FAQ e diário', 'Configuración, FAQ y bitácora', 'Settings, FAQ and changelog'), L3('Integrações, SSO, notificações e a história do projeto. Pronto!', 'Integraciones, SSO, notificaciones e historia del proyecto. ¡Listo!', 'Integrations, SSO, notifications and the project history. Done!')]
    ]
  }
};
var PR = PROD[P];

/* ---------- 1. Header cluster ---------- */
function mountUtils() {
  var host = $(PR.mount); if (!host || $('.pf-utils')) return;
  var who = $('#who'); if (who) who.style.display = 'none';
  var u = el('<div class="pf-utils">' +
    (P === 'knoc' ? '<button class="pf-ib pf-burger" data-pf="burger" aria-label="' + esc(t('menu')) + '">' + svg('menu') + '</button>' : '') +
    '<button class="pf-ib" data-pf="pal" data-tip="' + esc(t('search')) + ' · ⌘K" aria-label="' + esc(t('search')) + '">' + svg('search') + '</button>' +
    '<button class="pf-ib pf-hide-sm" data-pf="apps" data-tip="' + esc(t('apps')) + '" aria-label="' + esc(t('apps')) + '">' + svg('grid') + '</button>' +
    '<button class="pf-ib pf-hide-sm" data-pf="tour" data-tip="' + esc(t('tour')) + '" aria-label="' + esc(t('tour')) + '">' + svg('play') + '</button>' +
    '<button class="pf-ib pf-hide-sm" data-pf="faq" data-tip="' + esc(t('faq')) + '" aria-label="' + esc(t('faq')) + '">' + svg('help') + '</button>' +
    '<button class="pf-ib pf-hide-sm" data-pf="log" data-tip="' + esc(t('log')) + '" aria-label="' + esc(t('log')) + '">' + svg('log') + '</button>' +
    '<button class="pf-ib" data-pf="set" data-tip="' + esc(t('settings')) + '" aria-label="' + esc(t('settings')) + '">' + svg('gear') + '</button>' +
    '<button class="pf-avatar" data-pf="me"><i>' + esc(initials()) + '</i><span>' + esc(firstName()) + '</span></button></div>');
  host.insertBefore(u, host.firstChild);
  u.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pf]'); if (!b) return;
    var a = b.dataset.pf;
    if (a === 'burger') root.classList.toggle('pf-nav-open');
    if (a === 'pal') palette();
    if (a === 'apps') appsMenu(b);
    if (a === 'tour') tour(0);
    if (a === 'faq') faq();
    if (a === 'log') changelog();
    if (a === 'set') settings('general');
    if (a === 'me') meMenu(b);
  });
}
function refreshUtils() { var u = $('.pf-utils'); if (u) { u.remove(); mountUtils(); } }
function session() { return store.get('session'); }
function firstName() { var s = session(); return s ? s.name.split(' ')[0] : t('guest'); }
function initials() { var s = session(); return s ? s.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase() : 'G'; }

/* ---------- 2. Overlays ---------- */
var openLayer = null;
function closeLayer() { if (!openLayer) return; openLayer.forEach(function (n) { n.remove(); }); openLayer = null; document.body.style.overflow = ''; }
function layer(nodes) { closeLayer(); var s = el('<div class="pf-scrim"></div>'); s.onclick = closeLayer; document.body.appendChild(s); nodes.forEach(function (n) { document.body.appendChild(n); }); openLayer = [s].concat(nodes); document.body.style.overflow = 'hidden'; }
function popMenu(anchor, html) {
  closeLayer(); var r = anchor.getBoundingClientRect(), m = el('<div class="pf-menu" role="menu">' + html + '</div>');
  var s = el('<div class="pf-scrim" style="background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none"></div>'); s.onclick = closeLayer;
  document.body.appendChild(s); document.body.appendChild(m); openLayer = [s, m];
  m.style.top = (r.bottom + 8) + 'px'; m.style.left = Math.max(12, Math.min(innerWidth - m.offsetWidth - 12, r.right - m.offsetWidth)) + 'px';
  return m;
}
function appsMenu(b) {
  var o = PR.other;
  var m = popMenu(b, '<a href="./"><span class="lg" style="background:' + PR.color + '">' + PR.s + '</span><span><b>' + esc(PR.name) + '</b><small>' + esc(tx(PR.tag)) + '</small></span></a>' +
    '<a href="' + o.url + '"><span class="lg" style="background:' + o.color + '">' + o.s + '</span><span><b>' + esc(o.name) + '</b><small>' + esc(tx(o.tag)) + '</small></span></a><hr>' +
    '<a href="https://github.com/netorojas" target="_blank" rel="noopener"><span class="lg" style="background:#111827">GH</span><span><b>GitHub</b><small>github.com/netorojas</small></span></a>');
}
function meMenu(b) {
  var s = session() || { name: t('guest'), provider: 'demo' };
  var m = popMenu(b, '<div style="padding:10px"><b>' + esc(s.name) + '</b><small>' + esc(s.provider) + ' · ' + esc(t('demo')) + '</small></div><hr>' +
    '<button data-x="set">' + svg('gear') + esc(t('settings')) + '</button><button data-x="theme">' + svg('sun') + esc(t('theme')) + '</button><button data-x="out">' + svg('out') + esc(t('signOut')) + '</button>');
  [].forEach.call(m.querySelectorAll('svg'), function (s) { s.setAttribute('width', 18); s.setAttribute('height', 18); s.style.cssText = 'stroke:var(--ink-3);fill:none;stroke-width:1.8'; });
  m.onclick = function (e) { var x = e.target.closest('[data-x]'); if (!x) return; closeLayer();
    if (x.dataset.x === 'set') settings('general'); if (x.dataset.x === 'theme') toggleTheme();
    if (x.dataset.x === 'out') { audit('sign-out'); store.del('session'); login(); } };
}
function toggleTheme() {
  var cur = root.getAttribute('data-theme'), dark = cur === 'dark' || (!cur && matchMedia('(prefers-color-scheme: dark)').matches);
  var b = $('#theme [data-t="' + (dark ? 'light' : 'dark') + '"]'); if (b) b.click();
}

/* ---------- 3. Login (demo, no credentials) ---------- */
function login(force) {
  if (session() && !force) return afterLogin(false);
  var x = $('.pf-login'); if (x) x.remove();
  var hero = '<section class="pf-hero"><i class="pf-orb a"></i><i class="pf-orb b"></i><div class="pf-grid-bg"></div>' +
    '<div class="lg"><span>' + PR.s + '</span>' + esc(PR.name) + '</div>' +
    '<div><h1>' + esc(tx(PR.hero)) + '</h1><p>' + esc(tx(PR.heroP)) + '</p><div class="pf-feat">' +
    PR.stats.map(function (s) { return '<div><b>' + s[0] + '</b><small>' + esc(tx(s[1])) + '</small></div>'; }).join('') + '</div></div>' +
    '<footer>Contoso Ops Suite · v' + VERSION + ' · public demo</footer></section>';
  var prov = [['entra', t('withMs'), '#0067B8', 'M'], ['google', t('withG'), '#EA4335', 'G'], ['github', t('withGh'), '#111827', 'GH']];
  var auth = '<section class="pf-auth"><div class="pf-card"><h2>' + esc(t('welcome')) + '</h2><p>' + esc(t('signIn')) + '</p>' +
    prov.map(function (p) { return '<button class="pf-prov" data-prov="' + p[0] + '"><span class="ic" style="background:' + p[2] + '">' + p[3] + '</span>' + esc(p[1]) + '</button>'; }).join('') +
    '<button class="pf-prov" data-prov="sso"><span class="ic" style="background:var(--pf-grad)">' + svg('shield').replace('<svg', '<svg width="13" height="13" style="stroke:#fff;fill:none;stroke-width:2.2"') + '</span>' + esc(t('withSso')) + '<small>' + esc(t('ssoHint')) + '</small></button>' +
    '<div class="pf-sso" id="pfSso"><div class="pf-field"><label>' + esc(t('domain')) + '</label><input id="pfDom" value="contoso-latam.example" autocomplete="off"></div><button class="pf-b pri" id="pfSsoGo" style="width:100%;justify-content:center">' + esc(t('cont')) + '</button></div>' +
    '<div class="pf-or">' + esc(t('or')) + '</div><button class="pf-guest" id="pfGuest">' + esc(t('explore')) + ' →</button>' +
    '<div class="pf-disc">' + svg('info').replace('<svg', '<svg width="18" height="18" style="flex:0 0 auto;stroke:var(--ink-3);fill:none;stroke-width:1.8"') + '<span>' + esc(t('disclaimer')) + '</span></div>' +
    '<div class="pf-seg" style="margin-top:18px" id="pfLoginLang">' + ['pt', 'es', 'en'].map(function (l) { return '<button data-l="' + l + '" aria-pressed="' + (lang() === l) + '">' + l.toUpperCase() + '</button>'; }).join('') + '</div>' +
    '</div></section>';
  var w = el('<div class="pf-login" role="dialog" aria-label="Sign in">' + hero + auth + '</div>');
  document.body.appendChild(w); document.body.style.overflow = 'hidden';
  var done = function (name, provider) {
    store.set('session', { name: name, provider: provider, at: Date.now() }); audit('sign-in · ' + provider);
    w.classList.add('out'); setTimeout(function () { w.remove(); document.body.style.overflow = ''; afterLogin(true); toast(t('signedVia') + ' ' + provider); }, 430);
  };
  w.addEventListener('click', function (e) {
    var b = e.target.closest('[data-prov]');
    if (b) {
      if (b.dataset.prov === 'sso') { $('#pfSso').classList.add('on'); $('#pfDom').focus(); return; }
      if (b.querySelector('.pf-spin')) return;
      b.insertAdjacentHTML('beforeend', '<span class="pf-spin"></span>'); b.querySelector('small') && b.querySelector('small').remove();
      var name = { entra: 'Ana Souza', google: 'Ana Souza', github: 'ana-souza' }[b.dataset.prov] || 'Ana Souza';
      setTimeout(function () { done(name + ' (demo)', b.textContent.trim()); }, 900);
    }
    var l = e.target.closest('#pfLoginLang [data-l]'); if (l) { var lb = $('#lang [data-l="' + l.dataset.l + '"]'); if (lb) lb.click(); setTimeout(function () { login(true); }, 60); }
  });
  $('#pfSsoGo').onclick = function () { var d = ($('#pfDom').value || 'contoso-latam.example').trim();
    this.innerHTML = '<span class="pf-spin" style="margin:0"></span>&nbsp;' + esc(t('redirecting'));
    setTimeout(function () { toast(t('discovered') + ': ' + d + ' → OIDC (Entra ID)'); done('Ana Souza (demo)', 'SSO · ' + d); }, 1100); };
  $('#pfGuest').onclick = function () { done(t('guest') + ' (demo)', 'guest'); };
}
function afterLogin(fresh) {
  refreshUtils();
  if (!store.get('tourSeen.' + P) && !$('.pf-invite')) setTimeout(invite, fresh ? 700 : 1200);
}

/* ---------- 4. Settings ---------- */
var S = store.get('settings', {});
function saveS() { store.set('settings', S); }
var SECT = [['general', 'sGeneral', 'sliders'], ['int', 'sInt', 'plug'], ['auth', 'sAuth', 'shield'], ['notif', 'sNotif', 'bell'], ['data', 'sData', 'db'], ['api', 'sApi', 'code'], ['about', 'sAbout', 'info']];
function settings(sec, sub) {
  var nav = '<nav><h2>' + esc(t('settings')) + '</h2><p>' + esc(PR.name) + ' · v' + VERSION + '</p>' +
    SECT.map(function (s) { return '<button data-sec="' + s[0] + '" aria-current="' + (s[0] === sec) + '">' + svg(s[2]) + esc(t(s[1])) + '</button>'; }).join('') + '</nav>';
  var sh = el('<aside class="pf-sheet" role="dialog" aria-label="' + esc(t('settings')) + '">' + nav + '<div class="pf-body"><button class="pf-x" aria-label="close">×</button><div id="pfSecBody"></div></div></aside>');
  layer([sh]);
  sh.querySelector('.pf-x').onclick = closeLayer;
  sh.querySelector('nav').onclick = function (e) { var b = e.target.closest('[data-sec]'); if (!b) return; settings(b.dataset.sec); };
  var body = $('#pfSecBody'); body.innerHTML = SECTIONS[sec](sub); wire(body, sec, sub);
}
var sw = function (k, on) { return '<button class="pf-switch" role="switch" data-sw="' + k + '" aria-checked="' + !!on + '"></button>'; };
var row = function (b, s, ctl) { return '<div class="pf-row"><div><b>' + esc(b) + '</b>' + (s ? '<small>' + esc(s) + '</small>' : '') + '</div>' + ctl + '</div>'; };
var seg = function (k, opts, cur) { return '<div class="pf-seg" data-seg="' + k + '">' + opts.map(function (o) { return '<button data-v="' + o[0] + '" aria-pressed="' + (o[0] === cur) + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>'; };
var field = function (label, val, ro, ph, id) { return '<div class="pf-field"><label>' + esc(label) + '</label><input ' + (id ? 'id="' + id + '" ' : '') + 'value="' + esc(val || '') + '"' + (ph ? ' placeholder="' + esc(ph) + '"' : '') + (ro ? ' readonly' : '') + '></div>'; };
var select = function (label, k, opts, cur) { return '<div class="pf-field"><label>' + esc(label) + '</label><select data-sel="' + k + '">' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (o[0] === cur ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select></div>'; };
var curTheme = function () { return root.getAttribute('data-theme') || 'auto'; };
var BASE = 'https://netorojas.github.io/' + (P === 'knoc' ? 'knoc-network-ops-console' : 'infra-backlog-dashboard');

var SECTIONS = {
  general: function () {
    var tzs = ['America/Sao_Paulo', 'America/Argentina/Buenos_Aires', 'America/Bogota', 'America/Lima', 'America/Santiago', 'America/Mexico_City', 'America/Guayaquil', 'America/Montevideo', 'America/Toronto', 'UTC'];
    var spec = P === 'knoc'
      ? '<section class="pf-sec"><h3>KNOC Sweep</h3>' + select(lang() === 'en' ? 'Sweep interval' : lang() === 'es' ? 'Intervalo del Sweep' : 'Intervalo do Sweep', 'sweep', [['5', '5 min'], ['15', '15 min'], ['60', '60 min']], S.sweep || '15') +
        select(lang() === 'en' ? 'Mark status as stale after' : lang() === 'es' ? 'Estado viejo después de' : 'Status antigo depois de', 'stale', [['30', '30 min'], ['60', '60 min'], ['240', '4 h']], S.stale || '60') +
        row(lang() === 'en' ? 'Hide personal data in snapshot' : lang() === 'es' ? 'Ocultar datos personales en la copia' : 'Ocultar dados pessoais na cópia embutida', 'LGPD', sw('lgpdSnap', S.lgpdSnap !== false)) + '</section>'
      : '<section class="pf-sec"><h3>' + (lang() === 'en' ? 'Schedule' : lang() === 'es' ? 'Agenda' : 'Agenda das rotinas') + '</h3><div class="pf-grid2">' +
        select(lang() === 'en' ? 'Daily digest' : 'Digest', 'digest', [['07:00', '07:00'], ['07:30', '07:30'], ['08:00', '08:00']], S.digest || '07:30') +
        select(lang() === 'en' ? 'Post-Daily read' : 'Pós-Daily', 'postDaily', [['10:45', '10:45'], ['11:15', '11:15'], ['11:45', '11:45']], S.postDaily || '11:15') + '</div>' +
        row(lang() === 'en' ? 'Show confidence labels' : lang() === 'es' ? 'Mostrar etiquetas de confianza' : 'Mostrar rótulos de confiança', 'FATO · PROVÁVEL · HIPÓTESE', sw('labels', S.labels !== false)) +
        row(lang() === 'en' ? 'Promote repeated Daily topics to P0' : lang() === 'es' ? 'Promover temas repetidos a P0' : 'Promover tema repetido da Daily a P0', '3+ / 5', sw('promote', S.promote !== false)) + '</section>';
    return '<h1 class="pf-h">' + esc(t('sGeneral')) + '</h1><p class="pf-sub">' + esc(t('sSub')) + '</p>' +
      '<section class="pf-sec"><h3>' + esc(t('appearance')) + '</h3>' +
      row(t('language'), '', seg('lang', [['pt', 'Português'], ['es', 'Español'], ['en', 'English']], lang())) +
      row(t('themeL'), '', seg('theme', [['auto', t('auto')], ['light', t('light')], ['dark', t('dark')]], curTheme())) +
      row(t('density'), t('densityS'), sw('compact', S.compact)) + row(t('motion'), t('motionS'), sw('nomotion', S.nomotion)) + '</section>' +
      '<section class="pf-sec"><h3>' + esc(t('region')) + '</h3><div class="pf-grid2">' + select(t('tz'), 'tz', tzs.map(function (z) { return [z, z.replace('America/', '').replace(/_/g, ' ')]; }), S.tz || 'America/Sao_Paulo') +
      select(t('startPage'), 'start', PR.views.map(function (v) { return [v[0], tx(v[1])]; }), S.start || PR.views[0][0]) + '</div></section>' + spec;
  },
  int: function (sub) {
    if (sub) return intDetail(sub);
    var f = S.intFilter || 'all', list = C.INT.filter(function (i) { return i[6] === 'both' || i[6] === P; });
    var cats = ['all'].concat(Object.keys(C.CATS));
    return '<h1 class="pf-h">' + esc(t('sInt')) + '</h1><p class="pf-sub">' + esc(t('intSub')) + '</p>' +
      '<div class="pf-filters" data-filter>' + cats.map(function (c) { var n = c === 'all' ? list.length : list.filter(function (i) { return i[2] === c; }).length; return n ? '<button data-v="' + c + '" aria-pressed="' + (c === f) + '">' + esc(c === 'all' ? t('all') : tx(C.CATS[c])) + ' · ' + n + '</button>' : ''; }).join('') + '</div>' +
      '<div class="pf-ints">' + list.filter(function (i) { return f === 'all' || i[2] === f; }).map(function (i) {
        var st = (S.int && S.int[i[0]] && S.int[i[0]].status) || i[7];
        var chip = st === 'connected' ? '<span class="pf-chip ok"><i></i>' + esc(t('connected')) + '</span>' : st === 'beta' ? '<span class="pf-chip warn">' + esc(t('beta')) + '</span>' : '<span class="pf-chip">' + esc(t('available')) + '</span>';
        return '<button class="pf-int" data-int="' + i[0] + '"><header><span class="lg" style="background:' + i[3] + '">' + i[4] + '</span><span><b>' + esc(i[1]) + '</b><small>' + esc(tx(C.CATS[i[2]])) + '</small></span></header><p>' + esc(tx(i[5])) + '</p><footer>' + chip + '<span class="pf-chip acc">' + esc(t('configure')) + ' →</span></footer></button>';
      }).join('') + '</div>';
  },
  auth: function () {
    var pv = S.prov || { entra: true, google: false, github: false, okta: false, keycloak: false };
    var roles = ['Admin', lang() === 'en' ? 'Operator' : 'Operador', lang() === 'en' ? 'Viewer' : 'Leitor', lang() === 'en' ? 'Auditor' : 'Auditor'];
    var perms = [[L3('Ver painéis', 'Ver paneles', 'View dashboards'), [1, 1, 1, 1]], [L3('Editar itens e inventário', 'Editar ítems e inventario', 'Edit items and inventory'), [1, 1, 0, 0]],
      [L3('Configurar integrações', 'Configurar integraciones', 'Configure integrations'), [1, 0, 0, 0]], [L3('Gerenciar usuários e SSO', 'Gestionar usuarios y SSO', 'Manage users and SSO'), [1, 0, 0, 0]],
      [L3('Exportar dados', 'Exportar datos', 'Export data'), [1, 1, 0, 1]], [L3('Ver trilha de auditoria', 'Ver auditoría', 'View audit trail'), [1, 0, 0, 1]]];
    return '<h1 class="pf-h">' + esc(t('sAuth')) + '</h1><p class="pf-sub">' + esc(t('mfaS')) + '.</p>' +
      '<section class="pf-sec"><h3>' + esc(t('providers')) + '</h3>' +
      [['entra', 'Microsoft Entra ID', 'OIDC'], ['google', 'Google Workspace', 'OIDC'], ['github', 'GitHub', 'OAuth 2.0'], ['okta', 'Okta', 'SAML 2.0'], ['keycloak', 'Keycloak', 'OIDC / SAML']]
        .map(function (p) { return row(p[1], p[2], sw('prov.' + p[0], pv[p[0]])); }).join('') + '</section>' +
      '<section class="pf-sec"><h3>' + esc(t('oidc')) + '</h3><div class="pf-grid2">' + field('Issuer', 'https://login.microsoftonline.com/<tenant-id>/v2.0', false) + field('Client ID', '00000000-0000-0000-0000-000000000000', false) +
      field('Redirect URI', BASE + '/auth/callback', true) + field('Scopes', 'openid profile email', true) + '</div></section>' +
      '<section class="pf-sec"><h3>' + esc(t('saml')) + '</h3><div class="pf-grid2">' + field('IdP metadata URL', '', false, 'https://idp.example/metadata.xml') + field('Entity ID (SP)', 'urn:contoso-ops:' + P, true) +
      field('ACS URL', BASE + '/auth/saml/acs', true) + field('NameID', 'emailAddress', true) + '</div></section>' +
      '<section class="pf-sec"><h3>' + esc(t('scim')) + '</h3>' + row(t('scim'), t('scimS'), sw('scim', S.scim)) + field('SCIM endpoint', BASE + '/scim/v2', true) +
      row(t('mfa'), t('mfaS'), sw('mfa', S.mfa !== false)) + select(t('session'), 'sessionTtl', [['1', '1 h'], ['8', '8 h'], ['24', '24 h']], S.sessionTtl || '8') + '</section>' +
      '<section class="pf-sec"><h3>' + esc(t('roles')) + '</h3><table class="pf-mx"><tr><th></th>' + roles.map(function (r) { return '<th>' + esc(r) + '</th>'; }).join('') + '</tr>' +
      perms.map(function (p) { return '<tr><td>' + esc(tx(p[0])) + '</td>' + p[1].map(function (v) { return '<td>' + (v ? '<span style="color:var(--ok);font-weight:700">✓</span>' : '<span style="color:var(--ink-3)">—</span>') + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></section>';
  },
  notif: function () {
    var ch = S.ch || { teams: true, email: true, slack: false, pagerduty: false, webhook: false };
    var rules = P === 'knoc'
      ? [[L3('Ativo crítico fora por 5 min', 'Activo crítico caído 5 min', 'Critical asset down for 5 min'), 'Teams · PagerDuty'], [L3('Link SD-WAN degradado', 'Enlace SD-WAN degradado', 'SD-WAN link degraded'), 'Teams'], [L3('Certificado vence em 30 dias', 'Certificado vence en 30 días', 'Certificate expires in 30 days'), 'E-mail'], [L3('Contrato vence em 60 dias', 'Contrato vence en 60 días', 'Contract expires in 60 days'), 'E-mail']]
      : [[L3('Novo item P0', 'Nuevo ítem P0', 'New P0 item'), 'Teams · E-mail'], [L3('SLA vence hoje', 'SLA vence hoy', 'SLA due today'), 'Teams'], [L3('Tema repetido 3x na Daily', 'Tema repetido 3x en la Daily', 'Topic repeated 3x in the Daily'), 'Teams'], [L3('Resumo diário', 'Resumen diario', 'Daily digest'), 'E-mail · 07:30']];
    return '<h1 class="pf-h">' + esc(t('sNotif')) + '</h1><p class="pf-sub">' + esc(t('sSub')) + '</p>' +
      '<section class="pf-sec"><h3>' + esc(t('channels')) + '</h3>' + [['teams', 'Microsoft Teams'], ['email', 'E-mail'], ['slack', 'Slack'], ['pagerduty', 'PagerDuty'], ['webhook', 'Webhook']].map(function (c) { return row(c[1], '', sw('ch.' + c[0], ch[c[0]])); }).join('') + '</section>' +
      '<section class="pf-sec"><h3>' + esc(t('rules')) + '</h3>' + rules.map(function (r, i) { return row(tx(r[0]), r[1], sw('rule.' + i, !(S.rule && S.rule[i] === false))); }).join('') + '</section>' +
      '<section class="pf-sec"><h3>' + esc(t('quiet')) + '</h3><div class="pf-grid2">' + select(t('when'), 'quiet', [['off', '—'], ['22-07', '22:00 – 07:00'], ['20-08', '20:00 – 08:00']], S.quiet || '22-07') + '</div><p class="pf-note">P0 ignora o horário silencioso · P0 ignores quiet hours</p></section>';
  },
  data: function () {
    var a = store.get('audit', []);
    return '<h1 class="pf-h">' + esc(t('sData')) + '</h1><p class="pf-sub">LGPD · SOX · ITGC</p>' +
      '<section class="pf-sec"><h3>' + esc(t('retention')) + '</h3><div class="pf-grid2">' + select(t('retention'), 'ret', [['90', '90 d'], ['365', '1 y'], ['1825', '5 y (SOX)']], S.ret || '365') + '</div>' +
      row(t('mask'), t('maskS'), sw('mask', S.mask !== false)) + '<button class="pf-b" data-act="export">' + esc(t('export')) + '</button></section>' +
      '<section class="pf-sec"><h3>' + esc(t('audit')) + '</h3><table class="pf-mx"><tr><th>' + esc(t('when')) + '</th><th>' + esc(t('who')) + '</th><th>' + esc(t('what')) + '</th></tr>' +
      (a.length ? a.slice(0, 15).map(function (x) { return '<tr><td style="font-family:var(--pf-mono);font-size:12px">' + esc(x.at.replace('T', ' ').slice(0, 19)) + '</td><td>' + esc(x.who) + '</td><td>' + esc(x.what) + '</td></tr>'; }).join('') : '<tr><td colspan="3" style="color:var(--ink-3)">—</td></tr>') + '</table></section>';
  },
  api: function () {
    var hooks = S.hooks || [{ url: 'https://hooks.contoso.example/ops', ev: 'item.p0.created' }];
    return '<h1 class="pf-h">' + esc(t('sApi')) + '</h1><p class="pf-sub">REST · JSON · OAuth 2.0 client credentials</p>' +
      '<section class="pf-sec"><h3>' + esc(t('apiBase')) + '</h3>' + field(t('apiBase'), BASE + '/api/v1', true) +
      '<div class="pf-log">curl -H "Authorization: Bearer $TOKEN" \\\n  ' + esc(BASE) + '/api/v1/' + (P === 'knoc' ? 'assets?country=BR&amp;status=down' : 'items?priority=P0') + '</div></section>' +
      '<section class="pf-sec"><h3>' + esc(t('keys')) + '</h3>' + row('ops-readonly', lang() === 'en' ? 'Read-only · rotates every 90 days' : 'Somente leitura · rotação a cada 90 dias', '<span class="pf-chip mono">pk_live_••••••••3f9a</span>') + '</section>' +
      '<section class="pf-sec"><h3>' + esc(t('hooks')) + '</h3>' + hooks.map(function (h) { return row(h.url, h.ev, '<span class="pf-chip ok"><i></i>200 OK</span>'); }).join('') +
      '<button class="pf-b" data-act="hook" style="margin-top:10px">' + esc(t('addHook')) + '</button></section>';
  },
  about: function () {
    return '<h1 class="pf-h">' + esc(PR.name) + '</h1><p class="pf-sub">' + esc(tx(PR.tag)) + ' · Contoso Ops Suite</p>' +
      '<section class="pf-sec">' + row(t('version'), 'build 2026-10-06', '<span class="pf-chip acc">v' + VERSION + '</span>') + row(t('license'), '', '<span class="pf-chip">MIT</span>') +
      row(t('author'), 'Infra · Cloud · Security', '<span class="pf-chip">Ernesto (Neto) Rojas</span>') +
      row(t('repo'), '', '<a class="pf-b" target="_blank" rel="noopener" href="https://github.com/netorojas/' + (P === 'knoc' ? 'knoc-network-ops-console' : 'infra-backlog-dashboard') + '">GitHub →</a>') + '</section>' +
      '<section class="pf-sec"><h3>' + esc(t('roadmap')) + '</h3><ul style="margin:0;padding-left:18px;color:var(--ink-2);font-size:13.5px;line-height:1.7">' +
      (P === 'knoc' ? [L3('Conectores reais somente leitura (FortiGate, Zabbix, Azure Resource Graph)', 'Conectores reales de solo lectura', 'Real read-only connectors (FortiGate, Zabbix, Azure Resource Graph)'), L3('Alertas no Teams com deduplicação', 'Alertas en Teams con deduplicación', 'Teams alerts with de-duplication'), L3('Exportação de CMDB para ServiceNow', 'Exportación de CMDB a ServiceNow', 'CMDB export to ServiceNow')]
        : [L3('Conectores ServiceNow e Jira', 'Conectores ServiceNow y Jira', 'ServiceNow and Jira connectors'), L3('Previsão de fila (vencidos em 7 dias)', 'Previsión de cola', 'Queue forecast (overdue in 7 days)'), L3('Modo multi-time', 'Modo multiequipo', 'Multi-team mode')])
        .map(function (r) { return '<li>' + esc(tx(r)) + '</li>'; }).join('') + '</ul></section>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="pf-b" data-act="log">' + esc(t('log')) + '</button><button class="pf-b" data-act="faq">' + esc(t('faq')) + '</button></div>';
  }
};

function intDetail(id) {
  var i = C.INT.filter(function (x) { return x[0] === id; })[0]; if (!i) return '';
  var cfg = (S.int && S.int[id]) || {}, st = cfg.status || i[7];
  var maps = C.MAP[i[2]] || [];
  return '<button class="pf-b" data-back style="margin-bottom:16px">' + esc(t('backAll')) + '</button>' +
    '<div style="display:flex;gap:14px;align-items:center;margin-bottom:6px"><span class="lg" style="width:52px;height:52px;border-radius:14px;display:grid;place-items:center;color:#fff;font-weight:800;background:' + i[3] + '">' + i[4] + '</span><div><h1 class="pf-h">' + esc(i[1]) + '</h1><span class="pf-chip ' + (st === 'connected' ? 'ok' : '') + '">' + esc(st === 'connected' ? t('connected') : st === 'beta' ? t('beta') : t('available')) + '</span> <span class="pf-chip">' + esc(tx(C.CATS[i[2]])) + '</span></div></div>' +
    '<p class="pf-sub">' + esc(tx(i[5])) + '</p>' +
    '<section class="pf-sec"><div class="pf-grid2">' + field(t('instance'), cfg.url || i[8], false, i[8], 'pfIntUrl') +
    select(t('authM'), 'authm', [['oauth', 'OAuth 2.0 (client credentials)'], ['token', 'API token'], ['mi', 'Managed identity (Azure)']], cfg.authm || 'oauth') +
    field(t('secretRef'), cfg.secret || 'https://kv-contoso.vault.azure.net/secrets/' + id + '-ro', false, '', 'pfIntSecret') +
    select(t('sync'), 'syncm', [['5', '5 min'], ['15', '15 min'], ['60', '1 h'], ['wh', 'Webhook (push)']], cfg.sync || '15') + '</div>' +
    row(t('readOnly'), t('readOnlyS'), '<button class="pf-switch" role="switch" aria-checked="true" disabled style="opacity:.75"></button>') +
    row(t('allowWrite'), t('allowWriteS'), sw('intWrite', cfg.write)) + '</section>' +
    (maps.length ? '<section class="pf-sec"><h3>' + esc(t('mapping')) + '</h3><table class="pf-mx"><tr><th>' + esc(PR.name) + '</th><th></th><th>' + esc(i[1]) + '</th></tr>' +
      maps.map(function (m) { return '<tr><td>' + esc(m[0]) + '</td><td style="color:var(--accent)">⇄</td><td style="font-family:var(--pf-mono);font-size:12.5px">' + esc(m[1]) + '</td></tr>'; }).join('') + '</table></section>' : '') +
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="pf-b pri" data-act="test">' + esc(t('test')) + '</button><button class="pf-b" data-act="saveint">' + esc(t('save')) + '</button>' +
    (st === 'connected' ? '<button class="pf-b" data-act="disc">' + esc(t('disconnect')) + '</button>' : '') + '</div><div id="pfIntLog"></div>';
}

function wire(body, sec, sub) {
  body.onclick = function (e) {
    var s = e.target.closest('[data-sw]');
    if (s && !s.disabled) {
      var on = s.getAttribute('aria-checked') !== 'true'; s.setAttribute('aria-checked', on); var k = s.dataset.sw;
      if (k.indexOf('.') > 0) { var p = k.split('.'), map = { prov: 'prov', ch: 'ch', rule: 'rule' }[p[0]]; S[map] = S[map] || (map === 'rule' ? {} : {}); S[map][p[1]] = on; }
      else if (k === 'intWrite') { S.int = S.int || {}; S.int[sub] = S.int[sub] || {}; S.int[sub].write = on; }
      else S[k] = on;
      if (k === 'compact') root.classList.toggle('pf-compact', on); if (k === 'nomotion') root.classList.toggle('pf-nomotion', on);
      saveS(); audit('setting · ' + k + ' = ' + on); return;
    }
    var g = e.target.closest('[data-seg] [data-v]');
    if (g) { var kk = g.parentNode.dataset.seg, v = g.dataset.v;
      if (kk === 'lang') { var lb = $('#lang [data-l="' + v + '"]'); if (lb) lb.click(); setTimeout(function () { settings(sec, sub); refreshUtils(); }, 80); }
      if (kk === 'theme') { var tb = $('#theme [data-t="' + v + '"]'); if (tb) tb.click(); [].forEach.call(g.parentNode.children, function (x) { x.setAttribute('aria-pressed', x === g); }); }
      audit('setting · ' + kk + ' = ' + v); return; }
    var f = e.target.closest('[data-filter] [data-v]'); if (f) { S.intFilter = f.dataset.v; saveS(); settings('int'); return; }
    var it = e.target.closest('[data-int]'); if (it) { settings('int', it.dataset.int); return; }
    if (e.target.closest('[data-back]')) { settings('int'); return; }
    var a = e.target.closest('[data-act]'); if (!a) return;
    if (a.dataset.act === 'test') testInt(sub, a);
    if (a.dataset.act === 'saveint') { S.int = S.int || {}; var c = S.int[sub] = S.int[sub] || {};
      c.url = $('#pfIntUrl').value; c.secret = $('#pfIntSecret').value; c.status = 'connected'; saveS(); audit('integration saved · ' + sub); toast(t('saved')); settings('int', sub); }
    if (a.dataset.act === 'disc') { S.int[sub].status = 'available'; saveS(); audit('integration disconnected · ' + sub); settings('int', sub); }
    if (a.dataset.act === 'export') { var blob = new Blob([JSON.stringify({ product: P, version: VERSION, settings: S }, null, 2)], { type: 'application/json' }); var u = URL.createObjectURL(blob), l = document.createElement('a'); l.href = u; l.download = P + '-settings.json'; l.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500); audit('settings exported'); }
    if (a.dataset.act === 'hook') { S.hooks = (S.hooks || [{ url: 'https://hooks.contoso.example/ops', ev: 'item.p0.created' }]).concat([{ url: 'https://hooks.contoso.example/new-' + ((S.hooks || []).length + 1), ev: P === 'knoc' ? 'asset.down' : 'sla.due' }]); saveS(); settings('api'); }
    if (a.dataset.act === 'log') changelog(); if (a.dataset.act === 'faq') faq();
  };
  body.onchange = function (e) { var s = e.target.closest('[data-sel]'); if (!s) return;
    if (['authm', 'syncm'].indexOf(s.dataset.sel) >= 0) { S.int = S.int || {}; S.int[sub] = S.int[sub] || {}; S.int[sub][s.dataset.sel === 'syncm' ? 'sync' : 'authm'] = s.value; }
    else S[s.dataset.sel] = s.value; saveS(); audit('setting · ' + s.dataset.sel + ' = ' + s.value); };
}
function testInt(id, btn) {
  var box = $('#pfIntLog'), url = ($('#pfIntUrl') || {}).value || '', host = url.replace(/^https?:\/\//, '').split('/')[0];
  btn.disabled = true; box.innerHTML = '<div class="pf-log"></div>'; var log = box.firstChild;
  var lines = [['', 'DNS  ' + host + ' → 203.0.113.' + (20 + id.length) + '  (' + (12 + id.length) + ' ms)'], ['', 'TLS  1.3 · cert CN=' + host + ' · valid'], ['', 'AUTH OAuth 2.0 client_credentials · token from vault reference'],
    ['', 'SCOPE read-only ✓  write ' + ((S.int && S.int[id] && S.int[id].write) ? 'requested (CAB)' : 'disabled')], ['ok', 'GET /health → 200 OK · ' + (80 + id.length * 7) + ' ms'], ['wa', t('simOk')]];
  lines.forEach(function (l, k) { setTimeout(function () { log.insertAdjacentHTML('beforeend', '<div class="' + l[0] + '">' + esc(l[1]) + '</div>'); if (k === lines.length - 1) btn.disabled = false; }, 380 * (k + 1)); });
  audit('integration test · ' + id);
}

/* ---------- 5. FAQ & changelog ---------- */
function modal(title, sub, bodyHtml, extra) {
  var m = el('<div class="pf-modal" role="dialog" aria-label="' + esc(title) + '"><header><h1 class="pf-h">' + esc(title) + '</h1><p class="pf-sub" style="margin:0">' + esc(sub) + '</p>' + (extra || '') + '<button class="pf-x" aria-label="close">×</button></header><div class="pf-mb">' + bodyHtml + '</div></div>');
  layer([m]); m.querySelector('.pf-x').onclick = closeLayer; return m;
}
function faq() {
  var items = C.FAQ[P].concat(C.FAQ.suite);
  var html = items.map(function (q, i) { return '<details class="pf-acc"' + (i === 0 ? ' open' : '') + '><summary>' + esc(tx(q[0])) + '</summary><div>' + esc(tx(q[1])) + '</div></details>'; }).join('');
  var m = modal(t('faq'), t('faqSub'), html, '<input class="pf-search" placeholder="' + esc(t('faqSearch')) + '" id="pfFaqQ">');
  $('#pfFaqQ').oninput = function () { var q = this.value.toLowerCase(); $$('.pf-acc', m).forEach(function (d) { var hit = d.textContent.toLowerCase().indexOf(q) >= 0; d.style.display = hit ? '' : 'none'; if (q && hit) d.open = true; }); };
}
function changelog(filter) {
  filter = filter || 'all';
  var name = { knoc: 'KNOC', backlog: 'Infra Backlog', both: t('both') };
  var html = '<div class="pf-filters" id="pfLogF">' + [['all', t('all')], ['knoc', 'KNOC'], ['backlog', 'Infra Backlog']].map(function (f) { return '<button data-v="' + f[0] + '" aria-pressed="' + (f[0] === filter) + '">' + esc(f[1]) + '</button>'; }).join('') + '</div><div class="pf-tl">' +
    C.LOG.filter(function (e) { return filter === 'all' || e[0] === filter || e[0] === 'both'; }).map(function (e, i) {
      return '<article class="' + (i < 2 ? 'big' : '') + '" style="animation-delay:' + (i * 0.04) + 's"><div class="meta"><span class="pf-chip acc">' + esc(name[e[0]]) + ' ' + esc(e[1]) + '</span>' + esc(e[2]) + '</div><h4>' + esc(tx(e[3])) + '</h4><ul>' + e[4].map(function (b) { return '<li>' + esc(tx(b)) + '</li>'; }).join('') + '</ul></article>';
    }).join('') + '</div>';
  var m = modal(t('log'), t('logSub'), html);
  $('#pfLogF').onclick = function (e) { var b = e.target.closest('[data-v]'); if (b) changelog(b.dataset.v); };
}

/* ---------- 6. Command palette ---------- */
function palette() {
  var acts = PR.views.map(function (v) { return { g: t('goTo'), l: tx(v[1]), i: 'arrow', k: v[0], run: function () { PR.go(v[0]); } }; })
    .concat([
      { g: t('actions'), l: t('settings'), i: 'gear', run: function () { settings('general'); } },
      { g: t('actions'), l: t('sInt'), i: 'plug', run: function () { settings('int'); } },
      { g: t('actions'), l: t('sAuth'), i: 'shield', run: function () { settings('auth'); } },
      { g: t('actions'), l: t('faq'), i: 'help', run: faq }, { g: t('actions'), l: t('log'), i: 'log', run: function () { changelog(); } },
      { g: t('actions'), l: t('tour'), i: 'play', run: function () { tour(0); } }, { g: t('actions'), l: t('theme'), i: 'sun', run: toggleTheme },
      { g: t('actions'), l: t('lang') + ': PT · ES · EN', i: 'globe', run: function () { var o = ['pt', 'es', 'en'], n = o[(o.indexOf(lang()) + 1) % 3], b = $('#lang [data-l="' + n + '"]'); if (b) b.click(); setTimeout(refreshUtils, 80); } },
      { g: t('actions'), l: t('openOther') + ' ' + PR.other.name, i: 'grid', run: function () { location.href = PR.other.url; } },
      { g: t('actions'), l: t('signOut'), i: 'out', run: function () { store.del('session'); login(); } }
    ]);
  var p = el('<div class="pf-pal" role="dialog"><input placeholder="' + esc(t('search')) + '…" aria-label="' + esc(t('search')) + '"><ul></ul></div>');
  layer([p]); var inp = p.querySelector('input'), ul = p.querySelector('ul'), sel = 0, cur = [];
  var draw = function () {
    var q = inp.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    cur = acts.filter(function (a) { return !q || a.l.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').indexOf(q) >= 0; });
    sel = Math.min(sel, Math.max(0, cur.length - 1)); var g = null, h = '';
    cur.forEach(function (a, i) { if (a.g !== g) { g = a.g; h += '<div class="grp">' + esc(g) + '</div>'; } h += '<li data-i="' + i + '" class="' + (i === sel ? 'on' : '') + '">' + svg(a.i) + esc(a.l) + (a.k ? '<small>' + esc(a.k) + '</small>' : '') + '</li>'; });
    ul.innerHTML = h || '<div class="grp">' + esc(t('noRes')) + '</div>';
  };
  var run = function (i) { var a = cur[i]; if (!a) return; closeLayer(); setTimeout(a.run, 30); };
  inp.oninput = function () { sel = 0; draw(); };
  inp.onkeydown = function (e) {
    if (e.key === 'ArrowDown') { sel = Math.min(cur.length - 1, sel + 1); draw(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); draw(); e.preventDefault(); }
    if (e.key === 'Enter') run(sel);
  };
  ul.onclick = function (e) { var li = e.target.closest('li'); if (li) run(+li.dataset.i); };
  draw(); setTimeout(function () { inp.focus(); }, 30);
}

/* ---------- 7. Tour ---------- */
var tourOn = false;
function invite() {
  if ($('.pf-login') || tourOn) return;
  var x = el('<div class="pf-invite"><span>' + esc(t('invite')) + '</span><button class="go">▶ ' + esc(t('start')) + '</button><button>' + esc(t('later')) + '</button></div>');
  document.body.appendChild(x);
  var b = x.querySelectorAll('button'); b[0].onclick = function () { x.remove(); tour(0); }; b[1].onclick = function () { x.remove(); store.set('tourSeen.' + P, 1); };
}
function tour(i) {
  var steps = PR.tour; i = Math.max(0, Math.min(steps.length - 1, i)); tourOn = true; closeLayer();
  var inv = $('.pf-invite'); if (inv) inv.remove();
  var s = steps[i];
  if (s[0] && PR.view() !== s[0]) PR.go(s[0]);
  var hl = $('.pf-tour-hl') || document.body.appendChild(el('<div class="pf-tour-hl"></div>'));
  var cd = $('.pf-tour') || document.body.appendChild(el('<div class="pf-tour" role="dialog" aria-live="polite"></div>'));
  setTimeout(function () {
    var target = s[1] ? $(s[1]) : null, r = target ? target.getBoundingClientRect() : null;
    if (r && (r.width < 2 || r.height < 2)) r = null;
    if (r && (r.top < 70 || r.bottom > innerHeight - 40)) { target.scrollIntoView({ block: 'center', behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' }); r = target.getBoundingClientRect(); }
    cd.innerHTML = '<div class="st">' + (i + 1) + ' ' + esc(t('of')) + ' ' + steps.length + '</div><h3>' + esc(tx(s[2])) + '</h3><p>' + esc(tx(s[3])) + '</p>' +
      '<div class="bar"><i style="width:' + Math.round((i + 1) / steps.length * 100) + '%"></i></div>' +
      '<div class="act"><button class="skip">' + esc(t('skip')) + '</button><span class="sp"></span>' + (i ? '<button class="pf-b" data-t="back">' + esc(t('back')) + '</button>' : '') +
      '<button class="pf-b pri" data-t="next">' + esc(i === steps.length - 1 ? t('done') : t('next')) + ' →</button></div>';
    var w = Math.min(360, innerWidth - 24);
    if (r) {
      var pad = 6, maxH = Math.min(r.height + pad * 2, innerHeight * 0.62);
      hl.style.cssText = 'left:' + (r.left - pad) + 'px;top:' + (r.top - pad) + 'px;width:' + (r.width + pad * 2) + 'px;height:' + maxH + 'px';
      var below = r.top + maxH + 16 + 220 < innerHeight, top = below ? r.top + maxH + 10 : Math.max(12, r.top - 12 - cd.offsetHeight);
      if (!below && top < 12) top = Math.min(innerHeight - cd.offsetHeight - 12, r.top + 24);
      cd.style.left = Math.min(Math.max(12, r.left), innerWidth - w - 12) + 'px'; cd.style.top = top + 'px';
    } else {
      hl.style.cssText = 'left:50%;top:40%;width:0;height:0';
      cd.style.left = ((innerWidth - w) / 2) + 'px'; cd.style.top = (innerHeight * 0.3) + 'px';
    }
    cd.querySelector('.skip').onclick = endTour;
    cd.querySelector('[data-t="next"]').onclick = function () { if (i === steps.length - 1) endTour(); else tour(i + 1); };
    var bk = cd.querySelector('[data-t="back"]'); if (bk) bk.onclick = function () { tour(i - 1); };
    cd.querySelector('[data-t="next"]').focus();
  }, s[0] ? 420 : 60);
}
function endTour() { tourOn = false; store.set('tourSeen.' + P, 1); $$('.pf-tour,.pf-tour-hl').forEach(function (n) { n.remove(); }); audit('tour completed'); }
if (P === 'backlog') window.BLT = { start: function () { tour(0); }, stop: endTour, steps: PR.tour.length };

/* ---------- 8. View transitions, count-up, KNOC fit helpers ---------- */
var lastView = null;
function afterNav() {
  var v = PR.view(); if (v === lastView) return; lastView = v;
  var host = $('#view'); if (host && !root.classList.contains('pf-nomotion')) { host.classList.remove('pf-enter'); void host.offsetWidth; host.classList.add('pf-enter'); setTimeout(function () { host.classList.remove('pf-enter'); }, 700); }
  setTimeout(countUp, 40);
  if (P === 'knoc') { root.classList.remove('pf-nav-open'); if (v === 'topo') { [700, 1800].forEach(function (ms) { setTimeout(function () { var b = $('#tfit'); if (b && PR.view() === 'topo') b.click(); }, ms); }); } }
}
function countUp() {
  if (root.classList.contains('pf-nomotion')) return;
  $$('.kpi .n, .tile .n').forEach(function (n) {
    if (n.dataset.pfc) return; var m = /^(\d{1,5})(\.\d+)?([^\d]*)$/.exec(n.textContent.trim()); if (!m) return;
    var end = parseFloat(m[1] + (m[2] || '')), dec = m[2] ? m[2].length - 1 : 0, suf = m[3] || '', t0 = performance.now(); n.dataset.pfc = 1;
    (function step(now) { var k = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - k, 3); n.textContent = (end * e).toFixed(dec) + suf; if (k < 1) requestAnimationFrame(step); else n.textContent = m[0]; })(t0);
  });
}
var onResize = debounce(function () {
  if (P !== 'knoc') return; var v = PR.view();
  if (v === 'topo') { var b = $('#tfit'); if (b) b.click(); }
  if (v === 'map') { var h = $('#mhome'); if (h) h.click(); }
}, 300);
addEventListener('resize', onResize);

/* ---------- 9. Ripple + global keys ---------- */
document.addEventListener('pointerdown', function (e) {
  if (root.classList.contains('pf-nomotion')) return;
  var b = e.target.closest('.btn,.pf-b,.pf-guest,.pf-prov,.kpi,.pf-ib,.shbtn,nav.main button,.pf-int'); if (!b) return;
  var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement('span');
  s.className = 'pf-ripple'; s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
  if (getComputedStyle(b).position === 'static') b.style.position = 'relative'; b.style.overflow = 'hidden'; b.appendChild(s); setTimeout(function () { s.remove(); }, 600);
}, { passive: true });
document.addEventListener('keydown', function (e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (!$('.pf-login')) palette(); }
  if (e.key === 'Escape') { if (openLayer) closeLayer(); else if ($('.pf-tour')) endTour(); root.classList.remove('pf-nav-open'); }
  if ($('.pf-tour') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { var n = $('.pf-tour [data-t="' + (e.key === 'ArrowRight' ? 'next' : 'back') + '"]'); if (n) n.click(); }
});
document.addEventListener('click', function (e) {
  if (P === 'knoc' && root.classList.contains('pf-nav-open') && !e.target.closest('aside.side') && !e.target.closest('[data-pf="burger"]')) root.classList.remove('pf-nav-open');
  if (P === 'knoc' && e.target.closest('aside.side nav button')) setTimeout(function () { root.classList.remove('pf-nav-open'); }, 120);
  if (e.target.closest('#lang [data-l]')) setTimeout(refreshUtils, 120);
});

/* ---------- 10. Boot ---------- */
function boot() {
  if (S.compact) root.classList.add('pf-compact'); if (S.nomotion) root.classList.add('pf-nomotion');
  mountUtils();
  var view = $('#view'); if (view) new MutationObserver(debounce(afterNav, 30)).observe(view, { childList: true });
  if (S.start && !location.hash && P === 'knoc' && S.start !== 'home') PR.go(S.start);
  afterNav();
  if (!/[?&]nologin\b/.test(location.search)) login(); else afterLogin(false);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else setTimeout(boot, 0);
window.PF = { settings: settings, faq: faq, changelog: changelog, palette: palette, tour: tour, login: login, version: VERSION };
})();
