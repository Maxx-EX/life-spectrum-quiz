// ============================================================
// 生命光谱模型 LSM-120 · 界面逻辑
// 答题流程 + 结果渲染 + 原创 SVG 雷达图谱
// 原创测评框架 · Apache License 2.0
// ============================================================

window.LSM_UI = (function () {
  'use strict';

  var state = { idx: 0, answers: {}, safetyIdx: 0, safetyAnswers: {}, inSafety: false };

  // ---------- 题目排序：维度交错，避免连续同类题影响作答 ----------
  function buildOrder() {
    var byDim = {};
    LSM_ITEMS.forEach(function (it) {
      (byDim[it.dim] = byDim[it.dim] || []).push(it);
    });
    var dims = Object.keys(byDim);
    var order = [];
    var i = 0, added = true;
    while (added) {
      added = false;
      dims.forEach(function (d) {
        if (i < byDim[d].length) { order.push(byDim[d][i]); added = true; }
      });
      i++;
    }
    return order;
  }
  var ORDER = buildOrder();

  var $ = function (id) { return document.getElementById(id); };

  function progress() {
    var answered = Object.keys(state.answers).length;
    $('progressFill').style.width = (answered / LSM_ITEMS.length * 100) + '%';
    $('qCount').textContent = (state.idx + 1) + ' / ' + ORDER.length;
  }

  function renderQuestion() {
    var it = ORDER[state.idx];
    $('qDim').textContent = LSM.DIMS.find(function (d) { return d.key === it.dim; }).name;
    $('qText').textContent = it.text;
    var box = $('qOpts');
    box.innerHTML = '';
    var labels = ['非常不符合', '较不符合', '较符合', '非常符合'];
    labels.forEach(function (lab, v) {
      var btn = document.createElement('button');
      btn.className = 'opt' + (state.answers[it.id] === v + 1 ? ' sel' : '');
      btn.textContent = lab;
      btn.addEventListener('click', function () { pick(v + 1); });
      box.appendChild(btn);
    });
    $('prevBtn').disabled = state.idx === 0;
    $('nextBtn').disabled = typeof state.answers[it.id] !== 'number';
    progress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function pick(v) {
    state.answers[ORDER[state.idx].id] = v;
    // 更新选中态
    Array.prototype.forEach.call($('qOpts').children, function (el, i) {
      el.classList.toggle('sel', i === v - 1);
    });
    $('nextBtn').disabled = false;
    progress();
  }

  function next() {
    if (state.idx < ORDER.length - 1) { state.idx++; renderQuestion(); }
    else if (Object.keys(state.answers).length >= LSM_ITEMS.length) startSafety();
  }
  function prev() { if (state.idx > 0) { state.idx--; renderQuestion(); } }

  // ---------- 处方药用药安全自检（独立模块，不参与 12 维计分） ----------
  function startSafety() {
    state.inSafety = true; state.safetyIdx = 0; state.safetyAnswers = {};
    if ($('safetyIntro')) $('safetyIntro').textContent = LSM_SAFETY.intro;
    $('quizScreen').style.display = 'none';
    $('safetyScreen').style.display = 'block';
    renderSafetyItem();
  }
  function renderSafetyItem() {
    var items = LSM_SAFETY.items;
    $('safetyCount').textContent = (state.safetyIdx + 1) + ' / ' + items.length;
    $('safetyText').textContent = items[state.safetyIdx].text;
    var box = $('safetyOpts');
    box.innerHTML = '';
    var labels = ['非常不符合', '较不符合', '较符合', '非常符合'];
    labels.forEach(function (lab, v) {
      var btn = document.createElement('button');
      btn.className = 'opt' + (state.safetyAnswers[items[state.safetyIdx].id] === v + 1 ? ' sel' : '');
      btn.textContent = lab;
      btn.addEventListener('click', function () { safetyPick(v + 1); });
      box.appendChild(btn);
    });
    $('safetyPrev').disabled = state.safetyIdx === 0;
    $('safetyNext').disabled = typeof state.safetyAnswers[items[state.safetyIdx].id] !== 'number';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function safetyPick(v) {
    var items = LSM_SAFETY.items;
    state.safetyAnswers[items[state.safetyIdx].id] = v;
    Array.prototype.forEach.call($('safetyOpts').children, function (el, i) {
      el.classList.toggle('sel', i === v - 1);
    });
    $('safetyNext').disabled = false;
  }
  function safetyPrev() { if (state.safetyIdx > 0) { state.safetyIdx--; renderSafetyItem(); } }
  function safetyNext() {
    var items = LSM_SAFETY.items;
    if (state.safetyIdx < items.length - 1) { state.safetyIdx++; renderSafetyItem(); }
    else showResults();
  }

  // 用药安全评分（6–24 分 → 0–100）
  function safetyReport() {
    var items = LSM_SAFETY.items;
    var sum = 0;
    items.forEach(function (it) { sum += (state.safetyAnswers[it.id] || 0); });
    var pct = Math.round(((sum - items.length) / (items.length * 3)) * 1000) / 10;
    var band = pct >= 80 ? 'high' : (pct >= 50 ? 'mid' : 'low');
    return { sum: sum, pct: pct, band: band };
  }

  // ---------- 原创 SVG 雷达图谱 ----------
  function radarSVG(norm) {
    var size = 560, cx = size / 2, cy = size / 2, R = 200;
    var dims = LSM.DIMS;
    var n = dims.length;
    var angle = function (i) { return -Math.PI / 2 + (2 * Math.PI * i) / n; };
    var pt = function (i, r) {
      return { x: cx + r * Math.cos(angle(i)), y: cy + r * Math.sin(angle(i)) };
    };
    var toPts = function (r) {
      return dims.map(function (_, i) { var p = pt(i, r); return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
    };

    var s = '<svg viewBox="0 0 ' + size + ' ' + size + '" xmlns="http://www.w3.org/2000/svg">';
    // 背景网格（5 层）
    for (var lvl = 1; lvl <= 5; lvl++) {
      s += '<polygon points="' + toPts(R * lvl / 5) + '" fill="none" stroke="#2a3150" stroke-width="1"/>';
    }
    // 放射线
    for (var i = 0; i < n; i++) {
      var p = pt(i, R);
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p.x + '" y2="' + p.y + '" stroke="#2a3150" stroke-width="1"/>';
    }
    // 维度标签
    for (var j = 0; j < n; j++) {
      var lp = pt(j, R + 34);
      var dim = dims[j];
      s += '<text x="' + lp.x + '" y="' + lp.y + '" text-anchor="middle" dominant-baseline="middle" ' +
        'fill="#9aa0c0" font-size="13">' + dim.name + '</text>';
    }
    // 数据多边形
    var dataPts = dims.map(function (d, k) {
      var v = typeof norm[d.key] === 'number' ? norm[d.key] : 0;
      var r = (v / 100) * R;
      var p = pt(k, r);
      return p.x.toFixed(1) + ',' + p.y.toFixed(1);
    }).join(' ');
    s += '<polygon points="' + dataPts + '" fill="rgba(124,108,255,.25)" stroke="#7c6cff" stroke-width="2" stroke-linejoin="round"/>';
    // 数据点
    for (var m = 0; m < n; m++) {
      var dp = pt(m, (typeof norm[dims[m].key] === 'number' ? norm[dims[m].key] : 0) / 100 * R);
      s += '<circle cx="' + dp.x + '" cy="' + dp.y + '" r="3.5" fill="#4dd4ff"/>';
    }
    s += '</svg>';
    return s;
  }

  // ---------- 结果渲染 ----------
  function showResults() {
    var norm = LSM.score(state.answers).norm;
    var report = LSM_Analysis.buildReport(norm);

    $('quizScreen').style.display = 'none';
    if ($('safetyScreen')) $('safetyScreen').style.display = 'none';
    $('resultScreen').style.display = 'block';

    // 雷达图
    $('radarChart').innerHTML = radarSVG(norm);
    // KPI
    var c = report.composite;
    $('kpiPbi').innerHTML = (c.pbi !== null ? c.pbi : '--') + '<span class="unit"> / 100</span>';
    $('kpiSc').innerHTML = (c.sc !== null ? c.sc : '--') + '<span class="unit"> 标准差</span>';
    $('pbiText').innerHTML = report.pbiText;
    $('scText').innerHTML = report.scText;

    // 维度卡
    var dg = $('dimGrid');
    dg.innerHTML = '';
    report.cards.forEach(function (card) {
      var col = card.band.cls === 'low' ? 'var(--low)' : (card.band.cls === 'high' ? 'var(--high)' : 'var(--mid)');
      var el = document.createElement('div');
      el.className = 'dim-card';
      el.innerHTML =
        '<h4>' + card.name + '<span class="tag ' + card.band.cls + '">' + card.band.label + '</span></h4>' +
        '<div class="scorebar"><i style="width:' + card.score + '%;background:' + col + '"></i></div>' +
        '<div class="scoreval">' + card.score + '</div>' +
        '<p>' + card.desc + '</p>' +
        '<div class="anlys">' + card.text + '</div>';
      dg.appendChild(el);
    });

    // 光谱域汇总
    var dsum = $('domainSum');
    dsum.innerHTML = '';
    report.domains.forEach(function (dom) {
      var el = document.createElement('div');
      el.className = 'domain-card';
      var tag = dom.band ? '<span class="tag ' + dom.band.cls + '">' + dom.band.label + ' · ' + dom.avg + '</span>' : '<span class="tag mid">未完整</span>';
      el.innerHTML =
        '<div class="dh"><h4>' + dom.name + '</h4>' + tag + '</div>' +
        '<div class="note">' + dom.note + '</div>' +
        '<div class="note" style="margin:0">' + dom.dims.map(function (d) { return d.name + ' ' + d.score; }).join(' · ') + '</div>';
      dsum.appendChild(el);
    });

    // 综合画像
    $('portrait').innerHTML = report.portrait;

    // 处方药用药安全结果
    if (typeof LSM_SAFETY !== 'undefined' && $('safetyScore')) {
      var sr = safetyReport();
      var g = LSM_SAFETY.guidance;
      var bandColor = sr.band === 'high' ? 'var(--high)' : (sr.band === 'mid' ? 'var(--mid)' : 'var(--low)');
      $('safetyScore').innerHTML = sr.pct + '<span class="unit"> / 100</span>';
      $('safetyBand').textContent = sr.band === 'high' ? '安全意识良好' : (sr.band === 'mid' ? '基本安全' : '需要重视');
      $('safetyBand').style.color = bandColor;
      var txt = g[sr.band];
      if (sr.band !== 'low') txt += '　' + g.always;
      $('safetyGuidance').textContent = txt;
    }

    // 认知性别画像（性别光谱域深层评估）
    if (report.gender && $('genderType')) {
      var gp = report.gender;
      $('genderType').innerHTML =
        '<span class="tag ' + gp.type + '">' + gp.typeName + '</span>' +
        '<span class="tag mid">' + gp.balance + '</span>';
      $('genderTools').innerHTML = gp.tools + '<span class="unit"> / 100</span>';
      $('genderExpr').innerHTML = gp.expr + '<span class="unit"> / 100</span>';
      $('genderText').textContent = gp.text;
    }
  }

  // ---------- 初始化 ----------
  function init() {
    document.getElementById('startBtn').addEventListener('click', function () {
      document.getElementById('startScreen').style.display = 'none';
      document.getElementById('quizScreen').style.display = 'block';
      state.idx = 0; state.answers = {}; state.safetyIdx = 0; state.safetyAnswers = {};
      renderQuestion();
    });
    $('prevBtn').addEventListener('click', prev);
    $('nextBtn').addEventListener('click', next);
    if ($('safetyPrev')) $('safetyPrev').addEventListener('click', safetyPrev);
    if ($('safetyNext')) $('safetyNext').addEventListener('click', safetyNext);
    document.getElementById('restartBtn').addEventListener('click', function () {
      state.idx = 0; state.answers = {}; state.safetyIdx = 0; state.safetyAnswers = {};
      document.getElementById('resultScreen').style.display = 'none';
      if ($('safetyScreen')) $('safetyScreen').style.display = 'none';
      document.getElementById('quizScreen').style.display = 'block';
      renderQuestion();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  return { ORDER: ORDER };
})();
