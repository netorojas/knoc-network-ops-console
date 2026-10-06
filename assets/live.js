/*!
 * Orbiscale · live map & topology layer (v4)
 * Copyright (C) 2026 Ernesto Athaualpa Rojas (Neto)
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * What it adds on top of the SVG map and topology:
 *  - floating site cards that never overlap each other, the markers or the map controls
 *    (greedy placement over 24 candidate slots + a spring so they glide instead of jump);
 *  - cards you can drag anywhere, pin, collapse or close; positions are remembered;
 *  - level of detail: far away a card is a blurred chip, closer it becomes a summary,
 *    closer still it lists every asset; labels that would collide blur until hovered;
 *  - a minimap with "you are here" on both screens, click or drag it to travel;
 *  - hover tooltips, click ripples, exploration progress;
 *  - topology: drag assets to make room (not saved), hover shows neighbours.
 * Read-only: nothing here writes to the inventory.
 */
(function () {
  'use strict';
  var K = window.KNOC;
  if (!K) return;
  K.LIVE = true;

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = function () { return (K.getL && K.getL()) || 'pt'; };
  var L3 = function (pt, es, en) { var l = lang(); return l === 'es' ? es : l === 'en' ? en : pt; };
  var esc = K.esc || function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  var $ = function (id) { return document.getElementById(id); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* thresholds (zoom factor relative to the home view) */
  var CARD_Z = 3.2;   // below this: labels only
  var LIST_Z = 6.5;   // from here a card lists its assets
  var IP_Z = 10;      // from here rows show IP / FQDN

  var LV = {
    on: store.get('osc.cards', true),
    drag: store.get('osc.cardpos', {}),
    pin: store.get('osc.cardpin', {}),
    seen: store.get('osc.explored', {}),
    mini: store.get('osc.mini', !(window.innerWidth < 560)),
    closed: {}, slot: {}, cur: {}, tgt: {}, size: {}, ctx: null, raf: 0, nodes: null
  };

  /* heavy screens get a short loading veil so the switch feels instant instead of frozen */
  var HEAVY = { map: 1, topo: 1, finops: 1, cloud: 1, ops: 1, dem: 1 };
  var go0 = K.go;
  K.go = function (v) {
    var args = arguments, self = this, view = document.getElementById('view');
    if (!HEAVY[v] || reduce || !view) return go0.apply(self, args);
    view.classList.add('lv-busy');
    requestAnimationFrame(function () { setTimeout(function () {
      try { go0.apply(self, args); } finally {
        requestAnimationFrame(function () { requestAnimationFrame(function () { view.classList.remove('lv-busy'); }); });
      } }, 0); });
  };

  /* ====================================================================
     MAP
     ==================================================================== */
  function MAP() { return K.MAP; }
  function nodeIndex() { var m = {}; K.nodeList().forEach(function (n) { m[n.id] = n; }); return m; }
  function stCol(st) { return MAP().stColor(st); }
  function nodeSt(id) { var o = K.stOf(id); return o.stale && o.st === 'up' ? 'unk' : o.st; }

  function ensureMapDom() {
    var box = $('mapbox'); if (!box) return null;
    if (!$('lvleads')) {
      box.insertAdjacentHTML('beforeend',
        '<svg class="lv-leads" id="lvleads" aria-hidden="true"></svg>' +
        '<div class="lv-cards" id="lvcards"></div>' +
        '<div class="lv-tip" id="lvtip" hidden></div>' +
        '<div class="lv-xp" id="lvxp" title=""></div>' +
        '<div class="lv-mini-box' + (LV.mini ? '' : ' lv-closed') + '" id="lvmini"><div class="lv-mh"><span>' + esc(L3('VOCÊ ESTÁ AQUI', 'ESTÁS AQUÍ', 'YOU ARE HERE')) + '</span><button type="button" data-mini aria-label="' + esc(L3('Minimapa', 'Minimapa', 'Minimap')) + '">' + (LV.mini ? '–' : '+') + '</button></div>' +
        '<svg id="lvmsvg" role="img" aria-label="' + esc(L3('Minimapa: clique para ir até o ponto', 'Minimapa: haz clic para ir al punto', 'Minimap: click to travel there')) + '"><rect class="lv-msea" x="-99999" y="-99999" width="199999" height="199999"/><use href="#mland"/><g class="lv-mdots" id="lvmdots"></g><rect class="lv-vp" id="lvvp"/></svg></div>');
      wireMapDom(box);
      addCardsToggle();
    }
    return box;
  }

  function addCardsToggle() {
    var tools = document.querySelector('#mapbox .mtools'); if (!tools || $('lvtgl')) return;
    var b = document.createElement('button');
    b.id = 'lvtgl'; b.type = 'button'; b.style.fontSize = '13px';
    b.title = L3('Cartões flutuantes liga/desliga', 'Tarjetas flotantes sí/no', 'Floating cards on/off');
    b.setAttribute('aria-pressed', String(LV.on)); b.textContent = '▤';
    b.onclick = function () { LV.on = !LV.on; store.set('osc.cards', LV.on); b.setAttribute('aria-pressed', String(LV.on)); layoutMap(true); };
    tools.appendChild(b);
  }

  /* svg coords -> px inside #mapbox */
  function toScr(p) {
    var v = MAP().MV.vb, el = $('msvg'), box = $('mapbox');
    var r = el.getBoundingClientRect(), b = box.getBoundingClientRect();
    var s = Math.min(r.width / v.w, r.height / v.h), ox = (r.width - v.w * s) / 2, oy = (r.height - v.h * s) / 2;
    return [(p[0] - v.x) * s + ox + (r.left - b.left), (p[1] - v.y) * s + oy + (r.top - b.top)];
  }

  K.onMapDraw = function (ctx) {
    LV.ctx = ctx;
    if (!ensureMapDom()) return;
    var svg = $('msvg');
    svg.classList.toggle('lv-focus', !!MAP().MV.cc);
    // native <title> tooltips become rich tooltips
    [].forEach.call(document.querySelectorAll('#mmk .mk > title'), function (t) { t.parentNode.setAttribute('data-tip', t.textContent); t.remove(); });
    layoutMap(false);
    drawMini();
    drawXp();
  };

  K.onMapSel = function (id) {
    if (!id) return;
    if (!LV.seen[id]) {
      LV.seen[id] = 1; store.set('osc.explored', LV.seen);
      var x = xpCount();
      if (x.n >= x.t && x.t > 0 && !store.get('osc.explored.done', false)) {
        store.set('osc.explored.done', true);
        setTimeout(function () { K.toast(L3('Ambiente 100% explorado. Agora ele não tem mais segredos para você.', 'Entorno 100 % explorado. Ya no tiene secretos para ti.', 'Estate 100% explored. It has no secrets left for you.')); }, 500);
      }
    }
    if (id.indexOf('cc:') !== 0) delete LV.closed[id];
  };

  /* ---------- candidates and priority ---------- */
  function candidates(ctx, W, H) {
    var MV = MAP().MV, out = [];
    ctx.cl.forEach(function (c) {
      if (c.items.length !== 1 || c.country) return;
      var it = c.items[0];
      if ((it.lay !== 'onprem' && it.lay !== 'cloud') || !(it.nodes || []).length) return;
      if (!MAP().MV.L[it.lay]) return;
      var a = toScr(c.p);
      if (a[0] < -30 || a[1] < -30 || a[0] > W + 30 || a[1] > H + 30) return;
      var down = 0, gap = 0;
      it.nodes.forEach(function (id) { if (nodeSt(id) === 'down') down++; var n = LV.nodes[id]; if (n && K.gaps('node', n).length) gap++; });
      var sel = MV.site === it.id || (MV.site && it.go === MV.site);
      var dc = Math.hypot(a[0] - W / 2, a[1] - H / 2) / Math.hypot(W / 2, H / 2);
      var score = (sel ? 10000 : 0) + (LV.pin[it.id] ? 5000 : 0) + (LV.drag[it.id] ? 800 : 0) + down * 60 + Math.min(40, it.nodes.length) * 3 + gap * 2 - dc * 120;
      out.push({ id: it.id, it: it, a: a, sel: sel, down: down, gap: gap, score: score });
    });
    return out.sort(function (x, y) { return y.score - x.score; });
  }

  /* ---------- card html ---------- */
  function cardHtml(c, lvl, z) {
    var it = c.it, ids = it.nodes.slice(), cnt = { up: 0, down: 0, deg: 0, unk: 0 };
    ids.forEach(function (id) { cnt[nodeSt(id)] = (cnt[nodeSt(id)] || 0) + 1; });
    var worst = K.worst(ids), cloud = it.lay === 'cloud', tot = ids.length;
    var name = it.short || it.name, cc = it.cc && it.cc !== 'CLD' ? it.cc : '';
    var h = '<div class="lv-h" data-drag><i class="lv-st" style="background:' + stCol(worst) + ';color:' + stCol(worst) + '"></i>' +
      (K.originTag ? K.originTag(it) : '<span class="lv-k">' + (cloud ? 'CLOUD' : 'SITE') + '</span>') + '<b class="lv-n" data-act="go" title="' + esc(it.name) + '">' + esc(name) + '</b>' + (cc ? '<span class="lv-cc">' + esc(cc) + '</span>' : '') +
      '<button class="lv-b" type="button" data-act="pin" aria-pressed="' + !!LV.pin[c.id] + '" title="' + esc(L3('Fixar: fica visível em qualquer zoom', 'Fijar: visible en cualquier zoom', 'Pin: stays visible at any zoom')) + '">◎</button>' +
      '<button class="lv-b" type="button" data-act="close" title="' + esc(L3('Fechar este cartão', 'Cerrar esta tarjeta', 'Close this card')) + '">×</button></div>';
    h += '<div class="lv-s"><span>' + tot + ' ' + esc(L3('ativos', 'activos', 'assets')) + '</span>' +
      (cnt.up ? '<span class="ok">' + cnt.up + ' online</span>' : '') +
      (cnt.down ? '<span class="cr">' + cnt.down + ' ' + esc(L3('fora', 'caídos', 'down')) + '</span>' : '') +
      (cnt.deg ? '<span class="wa">' + cnt.deg + ' ' + esc(L3('degradado', 'degradado', 'degraded')) + '</span>' : '') +
      (c.gap ? '<span class="wa">! ' + c.gap + '</span>' : '') + '</div>';
    h += '<div class="lv-bar">' + ['up', 'deg', 'down', 'unk'].map(function (k) { return cnt[k] ? '<i style="width:' + (cnt[k] / tot * 100).toFixed(1) + '%;background:' + stCol(k) + '"></i>' : ''; }).join('') + '</div>';
    if (K.cardExtra && lvl >= 1) h += K.cardExtra(it, lvl);
    if (lvl >= 2) {
      var ord = { fw: 0, afw: 0, isp: 1, vpngw: 1, rtr: 2, sw: 2, vnet: 2, ap: 3, hyp: 4, srv: 5, vm: 6, k8s: 6, sbc: 7, pbx: 7, db: 8, stor: 8, kv: 9, oob: 9, ups: 9 };
      ids.sort(function (a, b) { var x = LV.nodes[a] || {}, y = LV.nodes[b] || {}; return ((ord[x.type] != null ? ord[x.type] : 10) - (ord[y.type] != null ? ord[y.type] : 10)) || String(x.name).localeCompare(y.name); });
      var max = z >= 14 ? 40 : 14;
      h += '<div class="lv-list" role="list">' + ids.slice(0, max).map(function (id) {
        var n = LV.nodes[id]; if (!n) return '';
        var g = K.gaps('node', n).length;
        return '<button class="lv-r" type="button" role="listitem" data-node="' + esc(id) + '" title="' + esc(n.name + ' · ' + (K.TYPES[n.type] || n.type) + (n.model ? ' · ' + n.model : '')) + '">' +
          '<i style="background:' + stCol(nodeSt(id)) + '"></i><span class="t" style="color:' + MAP().tcol(n) + '">' + esc(MAP().tabbr(n)) + '</span><span class="nm">' + esc(n.name) + '</span>' +
          (z >= IP_Z ? '<span class="ip">' + esc(String(n.ip || n.fqdn || '').slice(0, 22)) + '</span>' : '') + (g ? '<span class="g">!</span>' : '') + '</button>';
      }).join('') + '</div>' + (ids.length > max ? '<div class="lv-more">+' + (ids.length - max) + ' · ' + esc(L3('aproxime ou abra os detalhes', 'acércate o abre los detalles', 'zoom in or open details')) + '</div>' : '');
      h += '<div class="lv-f"><button type="button" data-act="go">' + esc(L3('Detalhes', 'Detalles', 'Details')) + ' →</button><button type="button" data-act="topo">' + esc(L3('Topologia', 'Topología', 'Topology')) + ' →</button></div>';
    }
    return h;
  }

  /* ---------- placement ---------- */
  var SLOTS = (function () {
    var out = [], gaps = [16, 64, 128];
    gaps.forEach(function (g) {
      out.push(function (a, w, h) { return [a[0] + g, a[1] - h / 2]; });       // right
      out.push(function (a, w, h) { return [a[0] + g, a[1] + 6]; });           // right-down
      out.push(function (a, w, h) { return [a[0] + g, a[1] - h - 6]; });       // right-up
      out.push(function (a, w, h) { return [a[0] - g - w, a[1] - h / 2]; });   // left
      out.push(function (a, w, h) { return [a[0] - g - w, a[1] + 6]; });       // left-down
      out.push(function (a, w, h) { return [a[0] - g - w, a[1] - h - 6]; });   // left-up
      out.push(function (a, w, h) { return [a[0] - w / 2, a[1] + g]; });       // below
      out.push(function (a, w, h) { return [a[0] - w / 2, a[1] - h - g]; });   // above
    });
    return out;
  })();
  function ov(a, b) { var x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)), y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)); return x * y; }
  function uiRects(box) {
    var b = box.getBoundingClientRect(), out = [];
    ['#mapbox .mtools', '#mapbox .mcrumb', '#mapbox .mlayers', '#lvmini', '#lvxp'].forEach(function (sel) {
      var e = document.querySelector(sel); if (!e || !e.offsetWidth) return;
      var r = e.getBoundingClientRect(); out.push({ x: r.left - b.left - 6, y: r.top - b.top - 6, w: r.width + 12, h: r.height + 12 });
    });
    return out;
  }
  function place(a, w, h, W, H, obst, prevSlot) {
    var best = null;
    for (var i = 0; i < SLOTS.length; i++) {
      var p = SLOTS[i](a, w, h), r = { x: p[0], y: p[1], w: w, h: h }, hit = 0;
      obst.forEach(function (o) { hit += ov(r, o) * (o.k || 3); });
      hit += (Math.max(0, -r.x) * h + Math.max(0, r.x + w - W) * h + Math.max(0, -r.y) * w + Math.max(0, r.y + h - H) * w) * 5;
      var cost = hit + Math.floor(i / 8) * 900 + (i % 8) * 6 - (i === prevSlot ? 400 : 0); // ring distance + stability while panning
      if (!best || cost < best.cost) best = { r: r, cost: cost, hit: hit, slot: i };
    }
    return best;
  }

  function cardEl(layer, c) {
    var el = layer.querySelector('.lv-card[data-id="' + cssEsc(c.id) + '"]');
    if (!el) {
      el = document.createElement('div'); el.className = 'lv-card'; el.dataset.id = c.id; layer.appendChild(el);
      requestAnimationFrame(function () { el.classList.add('lv-in'); });
    }
    return el;
  }
  /* mode 2 = full list · 1 = summary · 0 = header only */
  function render(el, c, mode, z, force) {
    var lvl = mode === 2 ? 2 : 1;
    var sig = [lang(), lvl, z >= 14 ? 14 : z >= IP_Z ? 10 : 0, c.down, c.gap, !!LV.pin[c.id], c.it.nodes.length].join('|');
    if (el.dataset.sig !== sig || force) { el.innerHTML = cardHtml(c, lvl, z); el.dataset.sig = sig; }
    el.classList.toggle('lv-l2', lvl === 2); el.classList.toggle('lv-mini', mode === 0);
    el.classList.toggle('lv-sel', !!c.sel); el.classList.toggle('lv-pinned', !!LV.pin[c.id]);
    return [el.offsetWidth, el.offsetHeight];
  }

  function layoutMap(force) {
    var ctx = LV.ctx, box = $('mapbox'), layer = $('lvcards');
    if (!ctx || !box || !layer) return;
    LV.nodes = nodeIndex();
    var W = box.clientWidth, H = box.clientHeight, z = ctx.z;
    var cands = candidates(ctx, W, H);
    var small = W < 560, maxCards = small ? 3 : clamp(Math.floor(W * H / (240 * 150)), 3, 12);
    var fullLeft = small ? 1 : 3;           // at most 3 full lists on screen
    var wantList = z >= LIST_Z;

    var obst = uiRects(box);
    // every visible marker is an obstacle so cards never cover a dot
    ctx.cl.forEach(function (c) { var a = toScr(c.p); if (a[0] > -20 && a[1] > -20 && a[0] < W + 20 && a[1] < H + 20) obst.push({ x: a[0] - 13, y: a[1] - 13, w: 26, h: 26, k: 4 }); });

    var show = [], ghosts = [];
    cands.forEach(function (c) {
      if (LV.closed[c.id] && !c.sel) return;
      var visible = LV.on && (LV.pin[c.id] || c.sel || z >= CARD_Z);
      if (visible && (show.length < maxCards || LV.pin[c.id] || c.sel)) show.push(c);
      else if (LV.on && z >= CARD_Z * 0.6) ghosts.push(c);
    });

    // cards you dragged are fixed: place them first so every other card flows around them
    show.sort(function (x, y) { return (LV.drag[y.id] ? 1 : 0) - (LV.drag[x.id] ? 1 : 0); });
    var keep = {}, demoted = [];
    show.forEach(function (c) {
      var el = cardEl(layer, c), must = c.sel || LV.pin[c.id], r = null, mode;
      var modes = (wantList || c.sel) && (fullLeft > 0 || must) ? [2, 1, 0] : [1, 0];
      if (LV.drag[c.id]) {
        mode = modes[0]; var sz = render(el, c, mode, z, force), d = LV.drag[c.id];
        r = { x: clamp(c.a[0] + d[0], -sz[0] + 40, W - 40), y: clamp(c.a[1] + d[1], -10, H - 30), w: sz[0], h: sz[1] };
      } else {
        for (var i = 0; i < modes.length; i++) {
          mode = modes[i];
          var s2 = render(el, c, mode, z, force && i === 0), best = place(c.a, s2[0], s2[1], W, H, obst, LV.slot[c.id]);
          r = best.r; LV.slot[c.id] = best.slot;
          if (best.hit <= s2[0] * s2[1] * 0.05) break;               // fits cleanly
          if (i === modes.length - 1 && !must && best.hit > s2[0] * s2[1] * 0.6) { r = null; }  // no room at all
        }
        if (r) { r.x = clamp(r.x, 4, Math.max(4, W - r.w - 4)); r.y = clamp(r.y, 4, Math.max(4, H - r.h - 4)); }
      }
      if (!r) { el.remove(); delete LV.cur[c.id]; demoted.push(c); return; }
      if (mode === 2) fullLeft--;
      obst.push({ x: r.x - 6, y: r.y - 6, w: r.w + 12, h: r.h + 12, k: 6 });
      LV.tgt[c.id] = [r.x, r.y]; LV.anchor = LV.anchor || {}; LV.anchor[c.id] = c.a;
      if (!LV.cur[c.id]) LV.cur[c.id] = [r.x, r.y];
      keep[c.id] = 1;
    });
    ghosts = demoted.concat(ghosts);

    // ghosts: blurred chips where a full card has no room (or you are too far away)
    ghosts.slice(0, 14).forEach(function (c) {
      var id = 'g:' + c.id, el = layer.querySelector('.lv-ghost[data-id="' + cssEsc(id) + '"]');
      if (!el) {
        el = document.createElement('div'); el.className = 'lv-ghost'; el.dataset.id = id; el.dataset.item = c.it.id; el.tabIndex = 0;
        el.title = L3('Aproxime ou clique para ver', 'Acércate o haz clic para ver', 'Zoom in or click to see');
        layer.appendChild(el);
      }
      var lbl = '<i style="background:' + stCol(K.worst(c.it.nodes)) + '"></i>' + esc((c.it.short || c.it.name).slice(0, 26)) + ' · ' + c.it.nodes.length;
      if (el.dataset.lbl !== lbl) { el.innerHTML = lbl; el.dataset.lbl = lbl; }
      var w = el.offsetWidth || 120, h = el.offsetHeight || 22;
      var best = place(c.a, w, h, W, H, obst, LV.slot[id]);
      if (best.hit > w * h * 0.5) { el.style.display = 'none'; keep[id] = 1; return; }
      el.style.display = ''; LV.slot[id] = best.slot;
      obst.push({ x: best.r.x - 3, y: best.r.y - 3, w: w + 6, h: h + 6, k: 2 });
      LV.tgt[id] = [best.r.x, best.r.y]; LV.anchor = LV.anchor || {}; LV.anchor[id] = c.a;
      if (!LV.cur[id]) LV.cur[id] = [best.r.x, best.r.y];
      keep[id] = 1;
    });

    [].slice.call(layer.children).forEach(function (el) { if (!keep[el.dataset.id]) { delete LV.cur[el.dataset.id]; delete LV.tgt[el.dataset.id]; el.remove(); } });
    LV.keep = keep;
    declutter(box, obst.filter(function (o) { return o.k === 6; }), show);
    animate();
  }

  function cssEsc(s) { return window.CSS && CSS.escape ? CSS.escape(s) : String(s).replace(/"/g, '\\"'); }

  /* spring animation: cards glide to their slot and trail slightly while you pan */
  function animate() {
    if (LV.raf) return;
    var step = function () {
      LV.raf = 0;
      var layer = $('lvcards'), leads = $('lvleads'); if (!layer) return;
      var moving = false, svg = '';
      [].forEach.call(layer.children, function (el) {
        var id = el.dataset.id, t = LV.tgt[id], c = LV.cur[id]; if (!t || !c || el.style.display === 'none') return;
        if (el.classList.contains('lv-dragging') || reduce) { c[0] = t[0]; c[1] = t[1]; }
        else { c[0] += (t[0] - c[0]) * 0.32; c[1] += (t[1] - c[1]) * 0.32; if (Math.abs(t[0] - c[0]) + Math.abs(t[1] - c[1]) > 0.4) moving = true; else { c[0] = t[0]; c[1] = t[1]; } }
        el.style.transform = 'translate3d(' + c[0].toFixed(1) + 'px,' + c[1].toFixed(1) + 'px,0)';
        if (el.classList.contains('lv-card')) {
          var a = (LV.anchor || {})[id]; if (!a) return;
          var w = el.offsetWidth, h = el.offsetHeight, px = clamp(a[0], c[0], c[0] + w), py = clamp(a[1], c[1], c[1] + h);
          if (Math.hypot(px - a[0], py - a[1]) > 14) {
            var col = el.querySelector('.lv-st'); col = col ? col.style.background : 'var(--accent)';
            var mx = (a[0] + px) / 2, my = Math.min(a[1], py) - 12;
            svg += '<path d="M' + a[0].toFixed(1) + ',' + a[1].toFixed(1) + ' Q' + mx.toFixed(1) + ',' + my.toFixed(1) + ' ' + px.toFixed(1) + ',' + py.toFixed(1) + '" style="stroke:' + col + '"/><circle cx="' + a[0].toFixed(1) + '" cy="' + a[1].toFixed(1) + '" r="3.5" style="fill:' + col + '"/>';
          }
        }
      });
      if (leads) leads.innerHTML = svg;
      if (moving) LV.raf = requestAnimationFrame(step);
    };
    LV.raf = requestAnimationFrame(step);
  }

  /* labels that collide fade to a blur; labels already shown on a card are hidden */
  function declutter(box, cardRects, shown) {
    var b = box.getBoundingClientRect(), kept = cardRects.slice(), onCard = {};
    shown.forEach(function (c) { onCard[c.id] = 1; });
    var labels = [].slice.call(document.querySelectorAll('#mmk text.ml, #mmk text.cl'));
    labels.sort(function (x, y) { return pri(y) - pri(x); });
    labels.forEach(function (t) {
      t.classList.remove('lv-blur', 'lv-hid');
      var g = t.closest('.mk'); if (g && g.dataset.item && onCard[g.dataset.item]) { t.classList.add('lv-hid'); return; }
      var r = t.getBoundingClientRect(); if (!r.width) return;
      var rr = { x: r.left - b.left - 2, y: r.top - b.top - 1, w: r.width + 4, h: r.height + 2 };
      for (var i = 0; i < kept.length; i++) if (ov(rr, kept[i]) > 4) { t.classList.add('lv-blur'); return; }
      kept.push(rr);
    });
    function pri(t) { var g = t.closest('.mk'); if (!g) return 0; return (g.classList.contains('sel') ? 100 : 0) + (g.dataset.country ? 40 : 0) + (g.querySelector('.pulse') ? 30 : 0) + 10; }
  }

  /* ---------- minimap ---------- */
  function miniBox() {
    var b = K.dataBox ? K.dataBox() : null;
    if (!b || b.empty) { var H = MAP().home(); return { x: H.x, y: H.y, w: H.w, h: H.h }; }
    b = { x: b.x, y: b.y, w: b.w, h: b.h };
    MAP().items().forEach(function (it) { var x = it.p[0], y = it.p[1]; if (it.pad) return; var x1 = Math.max(b.x + b.w, x), y1 = Math.max(b.y + b.h, y); b.x = Math.min(b.x, x); b.y = Math.min(b.y, y); b.w = x1 - b.x; b.h = y1 - b.y; });
    var hb = MAP().home(); var hx1 = Math.max(b.x + b.w, hb.x + hb.w), hy1 = Math.max(b.y + b.h, hb.y + hb.h * 0.9); b.x = Math.min(b.x, hb.x); b.y = Math.min(b.y, hb.y); b.w = hx1 - b.x; b.h = hy1 - b.y;
    var pw = Math.max(b.w * 0.18, 60), ph = Math.max(b.h * 0.18, 40), w = b.w + 2 * pw, h = b.h + 2 * ph;
    if (h / w > 0.75) { var nw = h / 0.75; pw += (nw - w) / 2; w = nw; } // keep it landscape
    return { x: b.x - pw, y: b.y - ph, w: w, h: h };
  }
  function drawMini() {
    var m = $('lvmini'), s = $('lvmsvg'), box = $('mapbox'); if (!m || !s) return;
    var lay = document.querySelector('#mapbox .mlayers');
    m.style.bottom = ((lay ? lay.offsetHeight : 0) + 18) + 'px';
    if (!LV.mini) return;
    var V = miniBox(); s.setAttribute('viewBox', V.x + ' ' + V.y + ' ' + V.w + ' ' + V.h);
    s.style.setProperty('height', Math.round(clamp(m.clientWidth * V.h / V.w, 60, 150)) + 'px', 'important');
    var r = V.w / 184 * 2.4, MV = MAP().MV, dots = '';
    MAP().items().forEach(function (x) {
      if (!MV.L[x.lay] || (x.lay !== 'onprem' && x.lay !== 'cloud')) return;
      dots += '<circle cx="' + x.p[0].toFixed(1) + '" cy="' + x.p[1].toFixed(1) + '" r="' + r.toFixed(2) + '" fill="' + stCol(K.worst(x.nodes || [])) + '"/>';
    });
    var d = $('lvmdots'); if (d && d.dataset.n !== String(dots.length)) { d.innerHTML = dots; d.dataset.n = String(dots.length); }
    var v = MV.vb, vp = $('lvvp');
    var x0 = Math.max(V.x, v.x), y0 = Math.max(V.y, v.y), x1 = Math.min(V.x + V.w, v.x + v.w), y1 = Math.min(V.y + V.h, v.y + v.h);
    var minW = V.w / 60;
    if (x1 - x0 < minW) { var cx = v.x + v.w / 2; x0 = cx - minW / 2; x1 = cx + minW / 2; }
    if (y1 - y0 < minW) { var cy = v.y + v.h / 2; y0 = cy - minW / 2; y1 = cy + minW / 2; }
    vp.setAttribute('x', x0); vp.setAttribute('y', y0); vp.setAttribute('width', Math.max(0, x1 - x0)); vp.setAttribute('height', Math.max(0, y1 - y0));
  }
  function miniPt(e, s) { var p = s.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(s.getScreenCTM().inverse()); }

  /* ---------- exploration progress ---------- */
  function xpCount() {
    if (!K.MAP) return { n: 0, t: 0 };
    var ids = MAP().items().filter(function (x) { return (x.lay === 'onprem' || x.lay === 'cloud') && !x.nosite; }).map(function (x) { return x.id; });
    var ccs = K.CORDER.filter(function (c) { return c !== 'CLD'; }).map(function (c) { return 'cc:' + c; });
    var all = ids.concat(ccs), n = all.filter(function (id) { return LV.seen[id]; }).length;
    return { n: n, t: all.length };
  }
  function drawXp() {
    var el = $('lvxp'), cr = $('mcrumb'); if (!el) return;
    var x = xpCount(), pct = x.t ? Math.round(x.n / x.t * 100) : 0;
    el.style.top = ((cr ? cr.offsetTop + cr.offsetHeight : 40) + 6) + 'px';
    el.classList.toggle('lv-done', pct >= 100);
    el.title = L3('Sites e países que você já abriu. Duplo clique zera.', 'Sitios y países que ya abriste. Doble clic reinicia.', 'Sites and countries you have opened. Double-click to reset.');
    var html = '<span>' + esc(L3('Explorado', 'Explorado', 'Explored')) + ' ' + x.n + '/' + x.t + '</span><span class="lv-xb"><i style="width:' + pct + '%"></i></span>';
    if (el.dataset.h !== html) { el.innerHTML = html; el.dataset.h = html; }
  }

  /* ---------- events ---------- */
  function wireMapDom(box) {
    var layer = $('lvcards'), tip = $('lvtip'), svg = $('msvg');

    // card actions
    layer.addEventListener('click', function (e) {
      var g = e.target.closest('.lv-ghost'); if (g) { MAP().selItem(g.dataset.item); return; }
      var card = e.target.closest('.lv-card'); if (!card) return;
      var id = card.dataset.id, row = e.target.closest('[data-node]');
      if (row) { K.openNode(row.dataset.node); return; }
      var act = e.target.closest('[data-act]'); act = act && act.dataset.act;
      if (act === 'pin') { if (LV.pin[id]) delete LV.pin[id]; else LV.pin[id] = 1; store.set('osc.cardpin', LV.pin); layoutMap(true); }
      else if (act === 'close') { LV.closed[id] = 1; delete LV.pin[id]; store.set('osc.cardpin', LV.pin); layoutMap(false); }
      else if (act === 'go') { if (!card.dataset.dragged) MAP().selItem(id); }
      else if (act === 'topo') { var it = MAP().items().filter(function (x) { return x.id === id; })[0]; if (it && it.nodes.length) K.go('topo', it.nodes[0]); }
    });
    layer.addEventListener('keydown', function (e) { var g = e.target.closest('.lv-ghost'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); MAP().selItem(g.dataset.item); } });
    layer.addEventListener('dblclick', function (e) {
      var h = e.target.closest('.lv-h'); if (!h || e.target.closest('button')) return;
      var id = h.parentNode.dataset.id; delete LV.drag[id]; store.set('osc.cardpos', LV.drag); layoutMap(false);
    });

    // drag a card by its header
    layer.addEventListener('pointerdown', function (e) {
      var h = e.target.closest('[data-drag]'); if (!h || e.target.closest('button') || e.button > 0) return;
      var card = h.parentNode, id = card.dataset.id, c = LV.cur[id], a = (LV.anchor || {})[id]; if (!c || !a) return;
      e.preventDefault(); e.stopPropagation();
      try { h.setPointerCapture(e.pointerId); } catch (_) { /* old browsers */ }
      var st = { x: e.clientX, y: e.clientY, cx: c[0], cy: c[1], moved: false };
      delete card.dataset.dragged;
      var mv = function (ev) {
        var dx = ev.clientX - st.x, dy = ev.clientY - st.y;
        if (!st.moved && Math.abs(dx) + Math.abs(dy) < 4) return;
        st.moved = true; card.classList.add('lv-dragging'); card.dataset.dragged = '1';
        var a2 = (LV.anchor || {})[id] || a;
        LV.drag[id] = [st.cx + dx - a2[0], st.cy + dy - a2[1]];
        LV.tgt[id] = [st.cx + dx, st.cy + dy];
        var now = Date.now(); if (!st.lay || now - st.lay > 90) { st.lay = now; layoutMap(false); }
        animate();
      };
      var up = function () {
        h.removeEventListener('pointermove', mv); h.removeEventListener('pointerup', up); h.removeEventListener('pointercancel', up);
        card.classList.remove('lv-dragging');
        if (st.moved) { store.set('osc.cardpos', LV.drag); layoutMap(false); setTimeout(function () { delete card.dataset.dragged; }, 50); }
      };
      h.addEventListener('pointermove', mv); h.addEventListener('pointerup', up); h.addEventListener('pointercancel', up);
    });

    // wheel: scroll the list if it can, otherwise zoom the map
    layer.addEventListener('wheel', function (e) {
      var list = e.target.closest('.lv-list');
      if (list && list.scrollHeight > list.clientHeight + 1) return;
      e.preventDefault();
      var b = $('msvg'), p = b.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
      MAP().zoom(e.deltaY > 0 ? 1.15 : 0.87, p.matrixTransform(b.getScreenCTM().inverse()));
    }, { passive: false });

    // rich tooltip
    svg.addEventListener('pointermove', function (e) {
      if (svg.classList.contains('panning')) { tip.hidden = true; return; }
      var g = e.target.closest && e.target.closest('.mk[data-tip]');
      if (!g) { tip.hidden = true; return; }
      var lines = g.getAttribute('data-tip').split('\n'), b = box.getBoundingClientRect();
      var html = '<b>' + esc(lines[0]) + '</b>' + lines.slice(1).map(function (l) { return esc(l); }).join('<br>') + '<em>' + esc(L3('Clique para aproximar', 'Haz clic para acercarte', 'Click to zoom in')) + '</em>';
      if (tip.dataset.h !== html) { tip.innerHTML = html; tip.dataset.h = html; }
      tip.hidden = false;
      var x = e.clientX - b.left, y = e.clientY - b.top;
      if (x > b.width - 300) x -= 300;
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
    });
    svg.addEventListener('pointerleave', function () { tip.hidden = true; });

    // ripple where you click a marker
    svg.addEventListener('click', function (e) {
      if (reduce || !(e.target.closest && e.target.closest('.mk'))) return;
      var b = box.getBoundingClientRect(), r = document.createElement('div');
      r.className = 'lv-rip'; r.style.left = (e.clientX - b.left) + 'px'; r.style.top = (e.clientY - b.top) + 'px';
      box.appendChild(r); setTimeout(function () { r.remove(); }, 650);
    });

    // minimap: click or drag to travel
    var ms = $('lvmsvg'), mini = $('lvmini');
    mini.querySelector('[data-mini]').onclick = function () {
      LV.mini = !LV.mini; store.set('osc.mini', LV.mini); mini.classList.toggle('lv-closed', !LV.mini); this.textContent = LV.mini ? '–' : '+'; drawMini();
    };
    var go = function (e, fly) {
      var p = miniPt(e, ms), v = MAP().MV.vb, to = { x: p.x - v.w / 2, y: p.y - v.h / 2, w: v.w, h: v.h };
      if (fly) MAP().fly(to); else { MAP().MV.vb = to; MAP().apply(); }
    };
    ms.addEventListener('pointerdown', function (e) {
      e.preventDefault(); try { ms.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
      go(e, true);
      var mv = function (ev) { go(ev, false); }, up = function () { ms.removeEventListener('pointermove', mv); ms.removeEventListener('pointerup', up); };
      ms.addEventListener('pointermove', mv); ms.addEventListener('pointerup', up);
    });

    // exploration chip: double-click resets
    $('lvxp').addEventListener('dblclick', function () { LV.seen = {}; store.set('osc.explored', {}); store.set('osc.explored.done', false); drawXp(); });
  }

  window.addEventListener('resize', function () { LV.size = {}; if (LV.ctx && $('lvcards')) layoutMap(false); });

  /* ====================================================================
     TOPOLOGY
     ==================================================================== */
  var TV = { bb: null, bbAt: 0, cc: null };
  function T() { return K.TOPO; }

  function ensureTopoDom() {
    var tp = $('topo'); if (!tp) return null;
    if (!$('lvtmini')) {
      tp.insertAdjacentHTML('beforeend', '<div class="lv-mini-box' + (LV.mini ? '' : ' lv-closed') + '" id="lvtmini" style="bottom:46px"><div class="lv-mh"><span>' + esc(L3('VOCÊ ESTÁ AQUI', 'ESTÁS AQUÍ', 'YOU ARE HERE')) + '</span><button type="button" data-mini>' + (LV.mini ? '–' : '+') + '</button></div>' +
        '<svg id="lvtmsvg"><rect class="lv-msea" x="-99999" y="-99999" width="199999" height="199999" style="fill:var(--tp-bg,var(--canvas))"/><use href="#scene"/><rect class="lv-vp" id="lvtvp"/></svg></div>');
      var mini = $('lvtmini'), ms = $('lvtmsvg');
      mini.querySelector('[data-mini]').onclick = function () { LV.mini = !LV.mini; store.set('osc.mini', LV.mini); mini.classList.toggle('lv-closed', !LV.mini); this.textContent = LV.mini ? '–' : '+'; topoMini(true); };
      var go = function (e, fly) { var p = miniPt(e, ms), v = T().TP.vb, to = { x: p.x - v.w / 2, y: p.y - v.h / 2, w: v.w, h: v.h }; if (fly) T().flyVb(to); else { T().TP.vb = to; T().applyVb(); } };
      ms.addEventListener('pointerdown', function (e) {
        e.preventDefault(); try { ms.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
        go(e, true);
        var mv = function (ev) { go(ev, false); }, up = function () { ms.removeEventListener('pointermove', mv); ms.removeEventListener('pointerup', up); };
        ms.addEventListener('pointermove', mv); ms.addEventListener('pointerup', up);
      });
    }
    return tp;
  }

  function reorgButton() {
    var tb = document.querySelector('#topo .toolbar'); if (!tb) return;
    var TP = T().TP, has = TP.tmp && Object.keys(TP.tmp).length, b = $('lvreorg');
    if (!has) { if (b) b.remove(); return; }
    if (!b) {
      b = document.createElement('button'); b.id = 'lvreorg'; b.className = 'tb lv-reorg'; b.type = 'button';
      b.title = L3('Volta os ativos que você arrastou para o layout automático', 'Devuelve los activos arrastrados al diseño automático', 'Puts dragged assets back into the automatic layout');
      b.onclick = function () { T().TP.tmp = null; T().draw(); };
      var fit = $('tfit'); if (fit && fit.parentNode === tb) tb.insertBefore(b, fit.nextSibling); else tb.appendChild(b);
    }
    b.textContent = '↺ ' + L3('Reorganizar', 'Reordenar', 'Re-arrange') + ' (' + Object.keys(TP.tmp).length + ')';
  }

  K.onTopoDraw = function () {
    if (!ensureTopoDom() || !T()) return;
    var TP = T().TP, tsvg = $('tsvg');
    if (tsvg) tsvg.classList.toggle('lv-hier', TP.mode !== 'graph');
    if (TV.cc !== TP.cc) { if (TV.cc !== null && TP.tmp) { TP.tmp = null; } TV.cc = TP.cc; }
    if (TP.tmp) Object.keys(TP.tmp).forEach(function (id) { var g = document.querySelector('#scene .node[data-nid="' + cssEsc(id) + '"]'); if (g) g.classList.add('lv-moved'); });
    TV.bbAt = 0; reorgButton(); topoMini(true); fitIz = null; fitSoon();
    if (!store.get('osc.topohint', false)) {
      store.set('osc.topohint', true);
      setTimeout(function () { K.toast(L3('Dica: arraste os ativos para abrir espaço. Nada é salvo; "Reorganizar" volta ao normal.', 'Consejo: arrastra los activos para abrir espacio. No se guarda nada; "Reordenar" vuelve a la normalidad.', 'Tip: drag assets to make room. Nothing is saved; "Re-arrange" puts them back.')); }, 900);
    }
  };
  K.onTopoVb = function () { topoMini(false); reorgButton(); fitSoon(); };

  /* zone, band and block titles shrink with an ellipsis so they never run into the neighbour
     (font size grows when you zoom out, so this runs again on every zoom) */
  var fitT = 0, fitIz = null;
  var fitLast = 0;
  function fitSoon() { var now = Date.now(); if (now - fitLast > 120) { fitLast = now; fitTexts(); } clearTimeout(fitT); fitT = setTimeout(function () { fitLast = Date.now(); fitTexts(); }, 140); }
  var fitCtx = null;
  function fitTexts() {
    var svg = $('tsvg'); if (!svg) return;
    var iz = svg.style.getPropertyValue('--izc') + '|' + (svg.getAttribute('class') || '');
    var list = svg.querySelectorAll('text.fitw');
    if (iz === fitIz && list.length && list[0].dataset.fit) return;
    fitIz = iz;
    // measure with a canvas: no forced layout per text (the DOM version cost seconds)
    if (!fitCtx) fitCtx = document.createElement('canvas').getContext('2d');
    var fonts = {};
    var fontOf = function (t) {
      var k = t.getAttribute('class'); if (fonts[k]) return fonts[k];
      var cs = getComputedStyle(t); fonts[k] = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily; return fonts[k];
    };
    var jobs = [];
    [].forEach.call(list, function (t) { jobs.push([t, fontOf(t)]); });
    jobs.forEach(function (j) {
      var t = j[0], full = t.dataset.t || '', w = +t.dataset.w || 0, out = full; t.dataset.fit = '1';
      fitCtx.font = j[1];
      var width = function (s) { return fitCtx.measureText(s).width; };
      if (w && width(full) > w) {
        var short = full.replace(/^(↗\s*)?[A-Z]{2,3} · /, '$1');
        if (width(short) <= w) out = short;
        else {
          var lo = 1, hi = short.length, best = 0;
          while (lo <= hi) { var mid = (lo + hi) >> 1; if (width(short.slice(0, mid) + '…') <= w) { best = mid; lo = mid + 1; } else hi = mid - 1; }
          out = best > 2 ? short.slice(0, best) + '…' : '';
        }
      }
      if (t.firstChild && t.firstChild.nodeType === 3 && t.childNodes.length === 1 && t.textContent === out) return;
      t.textContent = out;
      if (out !== full) addTitle(t, full);
    });
  }
  function addTitle(t, txt) { var ti = document.createElementNS('http://www.w3.org/2000/svg', 'title'); ti.textContent = txt; t.appendChild(ti); }

  function topoMini(rebox) {
    var s = $('lvtmsvg'), sc = $('scene'); if (!s || !sc || !LV.mini || !T()) return;
    var now = Date.now();
    if (rebox || !TV.bb || now - TV.bbAt > 400) {
      try { var b = sc.getBBox(); if (b.width > 0) { var pad = Math.max(b.width, b.height) * 0.04; TV.bb = { x: b.x - pad, y: b.y - pad, w: b.width + 2 * pad, h: b.height + 2 * pad }; TV.bbAt = now; } } catch (e) { return; }
      if (!TV.bb) return;
      s.setAttribute('viewBox', TV.bb.x + ' ' + TV.bb.y + ' ' + TV.bb.w + ' ' + TV.bb.h);
      s.style.setProperty('height', Math.round(clamp(s.parentNode.clientWidth * TV.bb.h / TV.bb.w, 50, 150)) + 'px', 'important');
    }
    var v = T().TP.vb, V = TV.bb, vp = $('lvtvp'); if (!v || !V || !vp) return;
    var x0 = Math.max(V.x, v.x), y0 = Math.max(V.y, v.y), x1 = Math.min(V.x + V.w, v.x + v.w), y1 = Math.min(V.y + V.h, v.y + v.h);
    vp.setAttribute('x', x0); vp.setAttribute('y', y0); vp.setAttribute('width', Math.max(0, x1 - x0)); vp.setAttribute('height', Math.max(0, y1 - y0));
  }
})();
