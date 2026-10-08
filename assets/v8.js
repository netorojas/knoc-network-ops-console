/*!
 * Orbiscale · v8: Orbiscale Flow (team board) as a module of Orbiscale — menu entry and deep links.
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto). SPDX-License-Identifier: AGPL-3.0-or-later
 */
(function () {
  'use strict';
  var K = window.KNOC; if (!K) return;
  var TT = { pt: { flow: 'Orbiscale Flow ↗' }, es: { flow: 'Orbiscale Flow ↗' }, en: { flow: 'Orbiscale Flow ↗' } };
  if (K.T) Object.keys(TT).forEach(function (l) { if (K.T[l]) Object.assign(K.T[l], TT[l]); });
  if (K.NAV) {
    var g = K.NAV.filter(function (x) { return x.g === 'gOps'; })[0];
    if (g && !g.items.some(function (i) { return i[0] === 'flow'; })) {
      var at = g.items.map(function (i) { return i[0]; }).indexOf('dem');
      g.items.splice(at + 1, 0, ['flow', 'M4 5h4v14H4zM10 5h4v9h-4zM16 5h4v5h-4z']);
    }
    try { K.renderNav(); } catch (e) { /* next render */ }
  }
  /* "flow" is a separate page of the same app: keep language and theme, open it in place */
  var go0 = K.go;
  K.go = function (v) { if (v === 'flow') { try { localStorage.setItem('bl_lang', K.getL()); var th = localStorage.getItem('knoc.theme'); if (th) localStorage.setItem('bl_theme', th); } catch (e) { /* ok */ } location.href = 'flow/?nologin'; return; } return go0.apply(this, arguments); };
})();
