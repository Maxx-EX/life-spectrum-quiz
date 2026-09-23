// ============================================================
// 生命光谱模型 报告组装与分析
// 将计分结果组装为完整的多层报告结构
// 原创测评框架 · Apache License 2.0
// ============================================================

window.LSM_Analysis = (function () {
  'use strict';

  function dimCards(norm) {
    return LSM.DIMS.map(function (d) {
      var v = norm[d.key];
      if (typeof v !== 'number') return null;
      var band = LSM.bandOf(v);
      return {
        key: d.key, name: d.name, desc: d.desc,
        score: v, band: band, text: d[band.cls]
      };
    }).filter(Boolean);
  }

  // 四大光谱域汇总
  function domainSummaries(norm, cards) {
    return Object.keys(LSM.DOMAINS).map(function (dk) {
      var dom = LSM.DOMAINS[dk];
      var dims = cards.filter(function (c) {
        var def = LSM.DIMS.find(function (x) { return x.key === c.key; });
        return def && def.domain === dk;
      });
      var avg = dims.length
        ? dims.reduce(function (a, c) { return a + c.score; }, 0) / dims.length
        : null;
      return {
        key: dk, name: dom.name, note: dom.note,
        avg: avg !== null ? Math.round(avg * 10) / 10 : null,
        band: avg !== null ? LSM.bandOf(avg) : null,
        dims: dims
      };
    });
  }

  // 心理平衡指数解读
  function pbiText(pbi) {
    if (pbi === null) return '未完成全部维度，暂无法计算平衡指数。';
    if (pbi < 40) return '你的心理平衡指数处于低亮区间，说明多个光带同时较弱，近期可能处于资源紧张或调整期。请优先关照情绪与内在锚定域，必要时寻求专业支持。';
    if (pbi <= 70) return '你的心理平衡指数处于中亮区间，整体在合理范围，存在少数波动维度。这是最"常见且可成长"的状态——识别偏弱维度，做出针对性调整即可。';
    return '你的心理平衡指数处于高亮区间，多数光带较为充沛，整体状态积极。请把这些优势用在值得的目标上，同时留意是否有被忽略的暗带。';
  }

  // 光谱一致性解读
  function scText(sc) {
    if (sc === null) return '';
    if (sc < 12) return '你的光谱较为均衡，各维度亮度接近，状态稳定，不易被单一情境左右。';
    if (sc <= 22) return '你的光谱存在一定起伏，既有突出优势也有相对弱项，属于常见的"偏科"画像，方向感清晰。';
    return '你的光谱差异较大，优势与弱项对比明显。优势是你的杠杆点，弱项则是重要成长区——可聚焦最影响生活的那一项优先改善。';
  }

  // 综合画像
  function portrait(syn, norm) {
    if (!syn || syn.top3.length < 3 || syn.bottom3.length < 3) return '作答尚未完成，暂无法生成综合画像。';
    var t = syn.top3.map(function (x) { return x.name; }).join('、');
    var b = syn.bottom3.map(function (x) { return x.name; }).join('、');
    return '综合来看，你的光谱在「' + t + '」上较为明亮，这些是你的突出能量来源；在「' + b +
      '」上相对偏暗，是值得留意与培养的成长区。你更擅长用优势维度来应对生活，而真正的成长，往往发生在补足暗带、让光谱更均衡的过程里。';
  }

  // 认知性别画像（性别光谱域深层评估）
  function genderPortrait(norm) {
    var t = norm.tools, e = norm.expr;
    if (typeof t !== 'number' || typeof e !== 'number') return null;
    var TH = 55;
    var type, typeName, text, bal;
    if (t >= TH && e >= TH) {
      type = 'androgynous'; typeName = '双性化倾向'; bal = '工具—表达双高';
      text = '你在工具效能与表达温暖两条取向上都较为充沛，是认知风格最灵活的状态：既能果断推进目标，也能细腻经营关系。心理学称之为"心理双性化"，通常伴随更高的适应弹性。请让两种取向相互配合，而不必刻意二选一。';
    } else if (t >= TH) {
      type = 'instrumental'; typeName = '工具导向倾向'; bal = '工具偏强';
      text = '你的认知气质更偏工具导向：目标清晰、行动直接、以逻辑和结果驱动。这是高效的执行风格。提醒：在追求结果的同时，留意关系与情感的表达——补足表达温暖，会让你更有弹性、也更有人情味。';
    } else if (e >= TH) {
      type = 'expressive'; typeName = '表达导向倾向'; bal = '表达偏强';
      text = '你的认知气质更偏表达导向：情感细腻、善于关怀与共情，很会经营关系。这是珍贵的连接能力。提醒：在照顾他人的同时，也练习直接表达自己的需求与边界，让付出更可持续、也让自己被看见。';
    } else {
      type = 'exploring'; typeName = '探索型（待成形）'; bal = '两者都待发展';
      text = '目前两条取向都尚未稳定成型，你仍在探索自己的认知风格。这可能是"未定型"的阶段，也可能是两种倾向在你身上都很收敛。建议不必急于归类：在具体情境中分别练习"果断推进"与"细腻表达"，慢慢找到属于自己的平衡点。';
    }
    return {
      tools: t, expr: e, type: type, typeName: typeName, balance: bal, text: text,
      toolBand: LSM.bandOf(t), exprBand: LSM.bandOf(e),
      note: '本分类为认知性别「取向倾向」的探索性提示：阈值 55 为暂定值，需经常模与信效度研究校准后方可作为分类依据，不构成任何分类诊断。'
    };
  }

  // 组装完整报告
  function buildReport(norm) {
    var comp = LSM.composite(norm);
    var syn = LSM.synthesize(norm);
    var cards = dimCards(norm);
    return {
      cards: cards,
      domains: domainSummaries(norm, cards),
      composite: comp,
      pbiText: pbiText(comp.pbi),
      scText: scText(comp.sc),
      portrait: portrait(syn, norm),
      syn: syn,
      gender: genderPortrait(norm)
    };
  }

  return { buildReport: buildReport };
})();
