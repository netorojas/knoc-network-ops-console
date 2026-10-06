/*!
 * Orbiscale · icon system v6 — one glyph per asset type, one frame shape per family, one badge per origin
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). SPDX-License-Identifier: AGPL-3.0-or-later
 * Original line icons drawn for Orbiscale (24×24, stroke). No vendor logos are used: origins are text badges.
 */
(function () {
  'use strict';
  var K = window.KNOC; if (!K) return;

  /* glyphs (stroke paths, 24×24) */
  var G = {
    fw: 'M3 6h18v12H3zM3 10h18M3 14h18M9 6v4M15 10v4M9 14v4M12 6v0',                          // brick wall
    afw: 'M7 17a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17 8a4 4 0 0 1 .5 9zM10 11h4M10 14h4M12 11v3',      // cloud firewall
    nsg: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 10h6M9 13h6M12 10v6',                   // shield with rules
    sec: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9.5 12l2 2 3.5-4',                         // shield check
    kv: 'M8 14a4 4 0 1 1 3.5-6M11 11h9v3M17 11v3M8 14v0',                                           // key
    sw: 'M3 8h18v8H3zM6 12h.01M9 12h.01M12 12h.01M15 12h.01M18 12h.01M6 16v2M18 16v2',              // switch with ports
    rtr: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 9l4-3 4 3M16 15l-4 3-4-3M12 6v12',                 // router arrows
    ap: 'M5 10a10 10 0 0 1 14 0M7.5 13a6.5 6.5 0 0 1 9 0M10 16a3 3 0 0 1 4 0M12 19h.01',           // wi-fi
    isp: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',    // globe
    vpngw: 'M3 12h4M17 12h4M7 8h10v8H7zM10 8V6a2 2 0 0 1 4 0v2M12 11v2',                            // tunnel + lock
    lb: 'M12 3v5M5 21l7-13 7 13M3 21h4M17 21h4M9 8h6',                                              // balance
    vnet: 'M5 6a2 2 0 1 0 0 .01M19 6a2 2 0 1 0 0 .01M12 18a2 2 0 1 0 0 .01M5 18a2 2 0 1 0 0 .01M19 18a2 2 0 1 0 0 .01M7 6h10M5 8v8M19 8v8M7 18h3M14 18h3',
    sub: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    cdn: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 2v4M12 18v4M2 12h4M18 12h4',
    apigw: 'M4 12h5M15 12h5M9 8h6v8H9zM12 4v4M12 16v4',
    hyp: 'M4 4h16v5H4zM4 10h16v5H4zM4 16h16v4H4zM7 6.5h.01M7 12.5h.01M7 18h.01',                   // stacked hosts
    srv: 'M5 3h14v18H5zM5 8h14M5 13h14M8 5.5h.01M8 10.5h.01M8 15.5h3',                               // tower server
    vm: 'M3 5h18v12H3zM8 21h8M12 17v4M7 9h5v5H7z',                                                  // screen with box
    k8s: 'M12 2l8 4.5v9L12 20l-8-4.5v-9zM12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v6M12 14v6M4 6.5l5.4 3M20 6.5l-5.4 3',
    ctr: 'M12 3l8 4v10l-8 4-8-4V7zM4 7l8 4 8-4M12 11v10',                                           // cube
    fn: 'M7 4h3l7 16M12 11l-5 9',                                                                   // lambda
    app: 'M3 5h18v14H3zM3 9h18M6 7h.01M9 7h.01M7 13h5M7 16h9',                                      // window
    bot: 'M7 8h10v10H7zM10 4h4M12 4v4M10 12h.01M14 12h.01M10 15h4M4 12h3M17 12h3',                  // chip/bot
    db: 'M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    obj: 'M5 7h14l-1.5 13h-11zM4 7c0-1.7 3.6-3 8-3s8 1.3 8 3',                                       // bucket
    stor: 'M4 6h16v12H4zM4 14h16M17 17h.01M8 10h8',                                                 // disk
    bkp: 'M4 7h16v13H4zM3 4h18v3H3zM10 11h4',                                                       // archive box
    dr: 'M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5',                                                       // refresh
    mon: 'M3 12h4l2-5 4 10 2-5h6',                                                                  // pulse
    coll: 'M3 5h18l-7 8v6l-4 2v-8z',                                                                // funnel
    sensor: 'M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0zM12 9v7',                                       // thermometer
    oob: 'M14 4l6 6M17 7l-8 8M7 13l4 4-4 4-4-4z',                                                   // wrench/plug
    ups: 'M3 8h16v8H3zM19 11h2v2h-2M9 9l-2 3h4l-2 3',                                               // battery
    sbc: 'M6 3h4l1 5-2 1a11 11 0 0 0 6 6l1-2 5 1v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2zM15 3h6v6',
    pbx: 'M6 3h4l1 5-2 1a11 11 0 0 0 6 6l1-2 5 1v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z',
    saas: 'M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1-.5 9.5z',
    cloud: 'M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1-.5 9.5z',
    iac: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
    mdm: 'M7 3h10v18H7zM11 18h2',                                                                   // phone (endpoint)
    pc: 'M3 5h18v11H3zM8 20h8M12 16v4',
    other: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16h.01'
  };
  /* family = frame shape, so a firewall never looks like a VM even in grey */
  var FAM = {
    net: ['sw', 'rtr', 'ap', 'isp', 'vpngw', 'lb', 'vnet', 'sub', 'cdn', 'apigw'],
    sec: ['fw', 'afw', 'nsg', 'sec', 'kv'],
    cmp: ['hyp', 'srv', 'vm', 'k8s', 'ctr', 'fn', 'app', 'bot', 'pc', 'mdm'],
    dat: ['db', 'obj', 'stor', 'bkp', 'dr'],
    ops: ['mon', 'coll', 'sensor', 'oob', 'ups', 'iac', 'sbc', 'pbx', 'saas', 'cloud', 'other']
  };
  var famOf = {}; Object.keys(FAM).forEach(function (f) { FAM[f].forEach(function (t) { famOf[t] = f; }); });
  var FCOL = { net: '#2563EB', sec: '#DC2626', cmp: '#0D9488', dat: '#7C3AED', ops: '#B45309' };
  var FNAME = { net: ['Rede', 'Red', 'Network'], sec: ['Segurança', 'Seguridad', 'Security'], cmp: ['Compute', 'Cómputo', 'Compute'], dat: ['Dados', 'Datos', 'Data'], ops: ['Operação', 'Operación', 'Operations'] };
  /* frame outlines inside a 0..1 box (scaled per size) */
  function frame(f, s) {
    var r = s / 2;
    if (f === 'net') { var h = []; for (var i = 0; i < 6; i++) { var a = Math.PI / 6 + i * Math.PI / 3; h.push((r + r * 0.98 * Math.cos(a)).toFixed(1) + ',' + (r + r * 0.98 * Math.sin(a)).toFixed(1)); } return '<polygon points="' + h.join(' ') + '"/>'; }
    if (f === 'sec') return '<path d="M' + r + ',' + (s * 0.02) + ' L' + (s * 0.94) + ',' + (s * 0.18) + ' L' + (s * 0.94) + ',' + (s * 0.5) + ' C' + (s * 0.94) + ',' + (s * 0.76) + ' ' + (s * 0.72) + ',' + (s * 0.92) + ' ' + r + ',' + (s * 0.99) + ' C' + (s * 0.28) + ',' + (s * 0.92) + ' ' + (s * 0.06) + ',' + (s * 0.76) + ' ' + (s * 0.06) + ',' + (s * 0.5) + ' L' + (s * 0.06) + ',' + (s * 0.18) + 'Z"/>';
    if (f === 'dat') return '<circle cx="' + r + '" cy="' + r + '" r="' + (r * 0.96) + '"/>';
    if (f === 'ops') return '<rect x="' + (s * 0.03) + '" y="' + (s * 0.03) + '" width="' + (s * 0.94) + '" height="' + (s * 0.94) + '" rx="' + (s * 0.12) + '" transform="translate(' + r + ' ' + r + ') rotate(45) scale(.74) translate(' + (-r) + ' ' + (-r) + ')"/>';
    return '<rect x="' + (s * 0.03) + '" y="' + (s * 0.03) + '" width="' + (s * 0.94) + '" height="' + (s * 0.94) + '" rx="' + (s * 0.22) + '"/>';
  }
  var PROV = { 'Microsoft Azure': ['AZ', '#2F7FD8'], 'AWS': ['AWS', '#D9822B'], 'Google Cloud': ['GCP', '#2E9E5B'], 'Oracle Cloud': ['OCI', '#C2453A'], 'IBM Cloud': ['IBM', '#7B5CE0'], 'SaaS': ['SaaS', '#0EA5A4'] };
  function origin(n) {
    if (K.provOf) { var p = K.provOf(n); if (p && p !== 'On-prem') return PROV[p] || null; return null; }
    return null;
  }
  function kind(n) { return n.type === 'isp' && /sip-trunk/.test(n.tags || '') ? 'sbc' : (G[n.type] ? n.type : 'other'); }

  /* SVG group (for the topology and map) */
  K.tileSvg = function (n, x, y, s) {
    var t = kind(n), f = famOf[t] || 'ops', c = FCOL[f], o = origin(n), g = s * 0.56, off = (s - g) / 2;
    return '<g class="ic6 f-' + f + '" transform="translate(' + x + ',' + y + ')"><g fill="' + c + '22" stroke="' + c + '" stroke-width="1.4">' + frame(f, s) + '</g>' +
      '<g transform="translate(' + off + ',' + off + ') scale(' + (g / 24) + ')"><path d="' + G[t] + '" fill="none" stroke="' + c + '" stroke-width="' + (1.8 * 24 / g).toFixed(2) + '" stroke-linecap="round" stroke-linejoin="round"/></g>' +
      (o ? '<g transform="translate(' + ((s - (o[0].length * 5.4 + 7)) / 2).toFixed(1) + ',' + (s - 6) + ')"><rect width="' + (o[0].length * 5.4 + 7).toFixed(1) + '" height="11" rx="3" fill="' + o[1] + '" stroke="var(--surface)" stroke-width="1.2"/><text x="3.5" y="8.3" style="font:700 7.6px var(--mono);fill:#fff">' + o[0] + '</text></g>' : '') + '</g>';
  };
  /* HTML tile (inventory, lists, cards) */
  K.typeTile = K.typeTile6 = function (n, sz) {
    sz = sz || 26; var t = kind(n), f = famOf[t] || 'ops', c = FCOL[f], o = origin(n);
    return '<span class="ic6 f-' + f + '" style="width:' + sz + 'px;height:' + sz + 'px" title="' + K.esc((K.TYPES[n.type] || n.type) + ' · ' + FNAME[f][0] + (o ? ' · ' + o[0] : ' · on-prem')) + '"><svg viewBox="0 0 ' + sz + ' ' + sz + '" width="' + sz + '" height="' + sz + '"><g fill="' + c + '1f" stroke="' + c + '" stroke-width="1.3">' + frame(f, sz) + '</g>' +
      '<g transform="translate(' + (sz * 0.22) + ',' + (sz * 0.22) + ') scale(' + (sz * 0.56 / 24) + ')"><path d="' + G[t] + '" fill="none" stroke="' + c + '" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/></g></svg>' +
      (o ? '<i style="background:' + o[1] + '" title="' + o[0] + '"></i>' : '') + '</span>';
  };
  K.ICON6 = { G: G, famOf: famOf, FCOL: FCOL, FNAME: FNAME };
  var st = document.createElement('style');
  st.textContent = '.ic6{position:relative;display:inline-flex;flex:none;vertical-align:middle}.ic6 svg,.map .ic6>svg,#mapbox .ic6>svg{overflow:visible;width:100% !important;height:100% !important;min-height:0 !important;position:static !important;display:block !important}.ic6>i{position:absolute;right:-3px;top:-3px;width:8px;height:8px;border-radius:50%;border:1.5px solid var(--surface)}';
  document.head.appendChild(st);
  // the first view was painted before this file loaded: repaint once so it gets the new icons
  setTimeout(function () { try { if (K.render) K.render(); } catch (e) { /* ignore */ } }, 0);
})();
