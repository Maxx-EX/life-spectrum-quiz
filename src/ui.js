// ============================================================
// 生命光谱模型 LSM-120 · 界面逻辑
// 答题流程 + 结果渲染 + 原创 SVG 雷达图谱
// 原创测评框架 · Apache License 2.0
// ============================================================

window.LSM_UI = (function () {
  'use strict';

  var state = { idx: 0, answers: {} };

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
    else if (Object.keys(state.answers).length >= LSM_ITEMS.length) showResults();
  }
  function prev() { if (state.idx > 0) { state.idx--; renderQuestion(); } }

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
  }

  // ---------- 初始化 ----------
  function init() {
    document.getElementById('startBtn').addEventListener('click', function () {
      document.getElementById('startScreen').style.display = 'none';
      document.getElementById('quizScreen').style.display = 'block';
      state.idx = 0; state.answers = {};
      renderQuestion();
    });
    $('prevBtn').addEventListener('click', prev);
    $('nextBtn').addEventListener('click', next);
    document.getElementById('restartBtn').addEventListener('click', function () {
      state.idx = 0; state.answers = {};
      document.getElementById('resultScreen').style.display = 'none';
      document.getElementById('quizScreen').style.display = 'block';
      renderQuestion();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  return { ORDER: ORDER };
})();
