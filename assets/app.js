(function () {
  var B = window.BRB, S = B.STR, LANGS = B.LANGS;
  var NAME = '広中依緒璃 (Hironaka Iori)', TOPN = 15;
  var page = document.body.getAttribute('data-page');
  var st = { lang: 'en-GB', theme: 'dark', cat: 'all', sort: 'fast', scale: 'log' };

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function detect() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || 'en-GB';
    l = l.toLowerCase();
    if (l.indexOf('ja') === 0) return 'ja';
    if (l.indexOf('zh') === 0) return 'zh-Hant';
    if (l.indexOf('ga') === 0) return 'ga';
    if (l === 'en-us') return 'en-US';
    return 'en-GB';
  }
  var sl = store('brb.lang');
  st.lang = LANGS.some(function (x) { return x.code === sl; }) ? sl : detect();
  st.theme = store('brb.theme') === 'light' ? 'light' : 'dark';

  /* Data */
  var DAY = 864e5;
  var rows = B.DATA.map(function (r) {
    var out = Date.UTC(r[4][0], r[4][1] - 1, r[4][2]), back = Date.UTC(r[5][0], r[5][1] - 1, r[5][2]);
    return { name: r[0], role: r[1], org: r[2], cat: r[3], out: out, back: back, why: r[6], y: r[7], days: Math.round((back - out) / DAY) };
  });
  var sorted = rows.slice().sort(function (a, b) { return a.days - b.days || a.back - b.back; });
  sorted.forEach(function (r, i) { r.rank = (i && r.days === sorted[i - 1].days) ? sorted[i - 1].rank : i + 1; });
  var maxDays = sorted[sorted.length - 1].days;
  var ds = sorted.map(function (r) { return r.days; }), mid = Math.floor(ds.length / 2);
  var median = ds.length % 2 ? ds[mid] : Math.round((ds[mid - 1] + ds[mid]) / 2);
  var updated = Date.UTC(B.UPDATED[0], B.UPDATED[1] - 1, B.UPDATED[2]);

  /* Text helpers */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function sub(s, v) { return s.replace(/\{(\w+)\}/g, function (m, k) { return v && v[k] != null ? v[k] : m; }); }
  function raw(key) {
    var chain = st.lang === 'en-US' ? ['en-US', 'en-GB'] : [st.lang, 'en-GB'];
    for (var i = 0; i < chain.length; i++) if (S[chain[i]] && S[chain[i]][key] != null) return { s: S[chain[i]][key], src: chain[i] };
    return { s: key, src: 'en-GB' };
  }
  function t(key, v) { var r = raw(key); return sub(r.src === 'qaa' ? B.cune(r.s) : r.s, v); }
  function gloss(key, v) {
    if (st.lang !== 'qaa' || !S.qaa[key]) return '';
    return sub(S.qaa[key], v) + ' = ' + sub(S['en-GB'][key], v);
  }
  function title(key, v) { var g = gloss(key, v); return g ? ' title="' + esc(g) + '"' : ''; }
  function nf(n) { var loc = LANGS.filter(function (x) { return x.code === st.lang; })[0].locale; return new Intl.NumberFormat(loc).format(n); }
  function unit(n) { return t(n === 1 ? 'unit.day' : 'unit.days', { n: nf(n) }); }
  function unitKey(n) { return n === 1 ? 'unit.day' : 'unit.days'; }
  function fmt(ms) {
    var d = new Date(ms), y = d.getUTCFullYear(), m = d.getUTCMonth(), dd = d.getUTCDate(), L = st.lang;
    if (L === 'en-US') return B.MON.en[m] + ' ' + dd + ', ' + y;
    if (L === 'ga') return dd + ' ' + B.MON.ga[m] + ' ' + y;
    if (L === 'ja' || L === 'zh-Hant') return y + '年' + (m + 1) + '月' + dd + '日';
    if (L === 'qaa') return dd + '.' + (m + 1) + '.' + y;
    return dd + ' ' + B.MON.en[m] + ' ' + y;
  }
  function orgText(o) { return S['en-GB']['cc.' + o] ? t('cc.' + o) : o; }
  function roleLine(r) { return t('role.' + r.role) + ' · ' + orgText(r.org); }
  function roleTitle(r) { var g = gloss('role.' + r.role); return g ? ' title="' + esc(g) + '"' : ''; }
  function whyText(r) { return t('why.' + r.why, { y: r.y }); }
  function whyTitle(r) { return title('why.' + r.why, { y: r.y }); }
  function statics() { return { n: rows.length, k: TOPN, date: fmt(updated), name: NAME, m: unit(median) }; }

  /* Static i18n */
  function applyStatic() {
    var html = document.documentElement;
    html.lang = st.lang; html.setAttribute('data-theme', st.theme);
    document.title = t(page === 'full' ? 'title.full' : 'title.home');
    var V = statics();
    [].forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var k = el.getAttribute('data-i18n');
      el.textContent = t(k, V);
      var g = gloss(k, V);
      if (g) el.setAttribute('title', g); else el.removeAttribute('title');
    });
    var th = document.getElementById('theme');
    if (th) th.textContent = t(st.theme === 'dark' ? 'theme.light' : 'theme.dark');
    var ls = document.getElementById('lang');
    if (ls) { ls.value = st.lang; ls.setAttribute('aria-label', t('lang.label')); }
  }

  function barPct(d) {
    var p = st.scale === 'log' || page === 'home' ? Math.log(d + 1) / Math.log(maxDays + 1) : d / maxDays;
    return Math.max(1.5, p * 100).toFixed(2);
  }
  function rowHtml(r) {
    return '<li class="row c-' + r.cat + '">' +
      '<span class="rk">' + r.rank + '</span>' +
      '<div class="who"><span class="nm">' + esc(r.name) + '</span>' +
      '<span class="rl"' + roleTitle(r) + '>' + esc(roleLine(r)) + '</span>' +
      '<span class="why"' + whyTitle(r) + '>' + esc(whyText(r)) + '</span>' +
      (page === 'full' ? '<span class="why">' + esc(fmt(r.out)) + ' → ' + esc(fmt(r.back)) + '</span>' : '') + '</div>' +
      '<div class="bar" aria-hidden="true"><i style="width:' + barPct(r.days) + '%"></i></div>' +
      '<span class="d"' + title(unitKey(r.days), { n: nf(r.days) }) + '>' + esc(unit(r.days)) + '</span></li>';
  }

  /* Home */
  function renderHome() {
    var f = sorted.filter(function (r) { return r.name === B.FEATURED; });
    f = f.sort(function (a, b) { return b.back - a.back; })[0];
    var box = document.getElementById('feat');
    if (f && box) {
      box.innerHTML =
        '<div class="eyebrow"' + title('feat.eyebrow') + '>' + esc(t('feat.eyebrow')) + '</div>' +
        '<h2 class="fname">' + esc(f.name) + '</h2>' +
        '<div class="fsub"' + roleTitle(f) + '>' + esc(roleLine(f)) + '</div>' +
        '<div class="fbig">' + esc(unit(f.days)) + '</div>' +
        '<dl class="meta">' +
        '<div><dt' + title('feat.k1') + '>' + esc(t('feat.k1')) + '</dt><dd>' + esc(fmt(f.out)) + '</dd></div>' +
        '<div><dt' + title('feat.k2') + '>' + esc(t('feat.k2')) + '</dt><dd>' + esc(fmt(f.back)) + '</dd></div>' +
        '<div><dt' + title('feat.k4') + '>' + esc(t('feat.k4')) + '</dt><dd>#' + f.rank + ' <small>' + esc(t('feat.rankOf', { n: rows.length })) + '</small></dd></div>' +
        '<div><dt' + title('feat.why') + '>' + esc(t('feat.why')) + '</dt><dd' + whyTitle(f) + '>' + esc(whyText(f)) + '</dd></div></dl>';
    }
    var top = document.getElementById('top');
    if (top) top.innerHTML = sorted.slice(0, TOPN).map(rowHtml).join('');
  }

  /* Full ranking */
  function renderFull() {
    var cats = ['all', 'company', 'gov', 'org'];
    document.getElementById('tabs').innerHTML = cats.map(function (c) {
      return '<button type="button" data-cat="' + c + '" aria-pressed="' + (st.cat === c) + '"' + title('tab.' + c) + '>' + esc(t('tab.' + c)) + '</button>';
    }).join('');
    var so = document.getElementById('sort'), sc = document.getElementById('scale');
    so.innerHTML = ['fast', 'recent', 'name'].map(function (k) { return '<option value="' + k + '">' + esc(t('sort.' + k)) + '</option>'; }).join('');
    sc.innerHTML = ['log', 'lin'].map(function (k) { return '<option value="' + (k === 'lin' ? 'linear' : 'log') + '">' + esc(t('scale.' + k)) + '</option>'; }).join('');
    so.value = st.sort; sc.value = st.scale;
    document.getElementById('legend').innerHTML =
      '<span><i></i>' + esc(t('tab.company')) + '</span><span><i class="g"></i>' + esc(t('tab.gov')) + '</span><span><i class="o"></i>' + esc(t('tab.org')) + '</span>';
    var hd = ['rank', 'leader', '', 'days'].map(function (k) { return '<span' + (k ? title('h.' + k) : '') + '>' + (k ? esc(t('h.' + k)) : '') + '</span>'; });
    document.getElementById('head').innerHTML = hd.join('');
    var list = sorted.filter(function (r) { return st.cat === 'all' || r.cat === st.cat; });
    if (st.sort === 'recent') list = list.slice().sort(function (a, b) { return b.back - a.back; });
    if (st.sort === 'name') list = list.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    document.getElementById('all').innerHTML = list.map(rowHtml).join('');
    document.getElementById('count').textContent = t('count', { n: list.length, m: unit(median) });
  }

  function render() { applyStatic(); if (page === 'home') renderHome(); else renderFull(); }

  /* Controls */
  var ls = document.getElementById('lang');
  if (ls) {
    ls.innerHTML = LANGS.map(function (l) { return '<option value="' + l.code + '"' + (l.code === 'qaa' ? ' lang="qaa"' : '') + '>' + esc(l.label) + '</option>'; }).join('');
    ls.addEventListener('change', function () { st.lang = ls.value; store('brb.lang', st.lang); render(); });
  }
  var th = document.getElementById('theme');
  if (th) th.addEventListener('click', function () { st.theme = st.theme === 'dark' ? 'light' : 'dark'; store('brb.theme', st.theme); render(); });
  if (page === 'full') {
    document.getElementById('tabs').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return; st.cat = b.getAttribute('data-cat'); renderFull();
    });
    document.getElementById('sort').addEventListener('change', function (e) { st.sort = e.target.value; renderFull(); });
    document.getElementById('scale').addEventListener('change', function (e) { st.scale = e.target.value; renderFull(); });
  }
  render();
})();
