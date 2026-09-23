// ============================================================
// 生命光谱模型 核心框架引擎
// Life Spectrum Model (LSM-120) — 计分与分析引擎
// 原创测评框架 · Apache License 2.0
// ============================================================

window.LSM = (function () {
  'use strict';

  // ---------- 维度定义 ----------
  var DOMAINS = {
    cog:   { name: '认知光谱',   note: '思维的灵活、专注、好奇与决策方式' },
    emo:   { name: '情绪光谱',   note: '情绪的复原、代谢、基调与觉知' },
    rel:   { name: '关系光谱',   note: '人际的边界、能量与共情' },
    anch:  { name: '内在锚定域', note: '不依赖外部确认的独立自主' }
  };

  // 每个维度的定义、所属域、低中高分带解读
  var DIMS = [
    {
      key: 'flex',  name: '认知弹性', domain: 'cog',
      desc: '面对新信息与环境变化时，调整既有观点与行为策略的灵活程度——"松动而不失锚"。',
      low:  '你倾向于坚守既有的方法与观点，稳定可靠，但环境变化时可能略显僵化。可练习"小步试错"，在低风险情境中主动尝试一种新做法。',
      mid:  '你在灵活与稳定之间能基本取得平衡：多数情况下愿意调整，但遇到投入很深的既有路径时仍会迟疑。无需强求，找到"值得坚持"与"值得改变"的区分即可。',
      high: '你思维灵活，面对新情况能快速调整策略，善于在矛盾信息中共存多种观点。注意保持"锚"——灵活性应以不丢失自己的核心价值为前提。'
    },
    {
      key: 'focus', name: '专注锚定', domain: 'cog',
      desc: '在干扰环境下将注意力稳定附着于目标任务，并在分心后快速"回锚"的能力。',
      low:  '你的注意力容易漂移，干扰因素（如消息通知、多任务）常把你带离当前任务。可尝试番茄工作法、关闭非必要通知、为深度工作预留整块时间。',
      mid:  '在安静、无干扰的环境里你多数能保持专注，但被打断后恢复较慢。找到你专注的"黄金时段"，把最重要的工作安排在此时段。',
      high: '你具备较强的"注意力锚点"，能在干扰中维持投入，且分心后能快速回锚。注意张弛有度，长时间高强度专注后记得安排缓冲。'
    },
    {
      key: 'curio', name: '好奇探索', domain: 'cog',
      desc: '对未知与陌生事物内在兴趣的强度，以及主动接近不确定性的倾向。',
      low:  '你对熟悉与确定的事物更有安全感，偏好已验证的做法。这带来稳定，也可能让视野收窄。不妨从"微小好奇"开始，每月探索一个陌生话题。',
      mid:  '你对感兴趣的新事物会主动了解，但程度随领域而异。平衡在于：既保持专业深度，又留出探索的余量。',
      high: '你好奇心充沛，乐于接近不确定与未知，常主动扩展认知边界。这是很好的学习引擎，注意避免"浅尝辄止"，适时把探索收敛为深度积累。'
    },
    {
      key: 'decide', name: '决策权衡', domain: 'cog',
      desc: '决策时偏好审慎分析权衡，还是依赖直觉快速行动（高分=审慎型，低分=直觉型）。',
      low:  '你倾向直觉与快速行动，适合不确定性高、需果断的场合，但复杂决策可能欠周全。重大选择前，可刻意为自己设置"24小时冷静期"收集信息。',
      mid:  '你能在直觉与分析之间切换，视情境而定。关键是识别哪些决策值得慢、哪些必须快，避免在不重要的事上过度权衡。',
      high: '你偏好审慎权衡，考虑周全、着眼长期，适合复杂决策。注意"分析瘫痪"的风险——为决策设置信息上限与截止时间，避免错过时机。'
    },
    {
      key: 'recov', name: '情绪复原', domain: 'emo',
      desc: '经历挫败、冲突或负性事件后，情绪强度回落至基线水平的速度与彻底性。',
      low:  '负性事件后你的情绪回落较慢，容易反复回味。这是敏感而非脆弱——可练习把"事件"与"自我评价"分开，用身体活动加速情绪代谢。',
      mid:  '你多数时候能在合理时间内恢复，但重大挫折会拉长复原周期。给自己设定"情绪处理的专属时段"，避免全天反复缠绕。',
      high: '你的情绪复原力较强，能较快走出低谷并转化为行动动力。注意不要过度压抑低落的正当性——快速复原不等于从不允许自己难过。'
    },
    {
      key: 'stress', name: '压力代谢', domain: 'emo',
      desc: '对持续压力输入的"消化"效率——压力感知阈值与压力后的恢复资源。',
      low:  '你压力感知阈值较低，容易把外部要求感知为压迫，且恢复资源有限。请主动建立缓冲：规律作息、运动、明确工作边界，都是压力"代谢"的关键。',
      mid:  '你能应对常规压力，但长时间高压会逐渐侵蚀稳定与睡眠。注意早期信号（睡眠、紧绷感），在压力累积前就安排放松。',
      high: '你的压力代谢效率较高，能在高压下保持节奏，且有较清晰的应对方法。请警惕"习惯性硬扛"——再好的代谢也需要定期的彻底休整。'
    },
    {
      key: 'optim', name: '乐观基调', domain: 'emo',
      desc: '基于自我效能感的建设性未来预期，一种"有把握的乐观"底色。',
      low:  '你更关注可能的风险与坏的结果，倾向为最坏情况做准备。这种审慎有保护价值，但过度担忧会消耗行动力。可用"最坏/最好/最可能"三栏法平衡视角。',
      mid:  '你的预期随情境与证据波动，既不盲目乐观也不持续悲观。这种现实感是稳定的基石，注意在证据不明时不要自动滑向消极。',
      high: '你具备建设性的乐观，相信努力能带来改变，对未来抱有积极期待。这是强大的行动燃料，只需让乐观建立在真实努力之上，避免盲目乐观。'
    },
    {
      key: 'aware', name: '情绪觉知', domain: 'emo',
      desc: '对自身情绪的识别、命名与定位能力，是情绪调节的前提。',
      low:  '你较少停下来体会自己的情绪，常被情绪带动而不自知。可以从"身体信号"入手：每天两次，记录此刻的身体感受与对应的可能情绪，慢慢建立联结。',
      mid:  '你大体能识别主要情绪，但在强烈或复杂情绪中会出现盲区。给自己一个"情绪命名时刻"，把"心情不好"具体化为一种情绪名称，会显著提升调节力。',
      high: '你对自身情绪有清晰的觉察，能准确识别与命名，并理解情绪与身体、情境的关联。这是情绪智慧的基石。注意避免过度分析情绪而失去行动的果断。'
    },
    {
      key: 'bound', name: '边界建构', domain: 'rel',
      desc: '在亲近与疏离之间建立清晰、灵活、可协商的人际界限的能力。',
      low:  '你容易为了维系关系而牺牲自己的边界，习惯承担不属于自己的责任。温和而坚定的"拒绝练习"可以从低风险请求开始——说"不"不损害关系，反而赢得尊重。',
      mid:  '你多数时候能维护基本边界，但在亲近关系或情感压力下会松动。关键是区分"讨好"与"善意"——确认边界是为了让关系更可持续。',
      high: '你能清晰而灵活地建构边界，在亲近与疏离之间保持可协商的空间，不被他人的期待绑架。注意在高边界下仍保留亲密联结的入口，避免过于疏离。'
    },
    {
      key: 'social', name: '社交能量', domain: 'rel',
      desc: '人际互动中的能量收支：互动带来充盈还是耗竭，以及独处恢复的偏好。',
      low:  '你偏向独处恢复型——社交会消耗你的能量，安静独处是主要的充电方式。这完全正常。为自己安排"社交配额"，在重要互动后留出恢复空间即可。',
      mid:  '你的社交能量随对象与场合而变化，能识别哪些人、哪些场合让你充盈或耗竭。据此主动选择社交结构，比强迫自己"更外向"更有价值。',
      high: '你是社交充电型——互动让你感到更有活力，乐于主动发起社交。注意尊重独处型伙伴的节奏，并给自己保留必要的独处时刻以防透支。'
    },
    {
      key: 'empat', name: '共情通道', domain: 'rel',
      desc: '理解并感受他人立场与情绪的能力，涵盖情感共情与认知共情。',
      low:  '你更偏重就事论事，对他人情绪的捕捉与代入相对有限。这让你在需要冷静判断的场合有优势，但可在信任的关系中练习"先复述对方感受再回应"。',
      mid:  '你能在多数情境中理解他人，但共情深浅因对象与距离而异。保持"理解但不失自我"的平衡，既不要冷眼旁观，也不要过度卷入。',
      high: '你的共情通道较为通畅，既能体会他人情绪，也能站在对方立场思考。这是关系中的珍贵能力。注意情感过载的风险——共情者需要更用心地照顾自己的情绪边界。'
    },
    {
      key: 'auton', name: '独立自主', domain: 'anch',
      desc: '在决策与价值取向上不依赖外部确认、保持内在一致性的程度。',
      low:  '你比较在意他人的评价与认可，容易随群体意见调整自己。这让你亲和而合作，但也可能削弱内在方向感。可练习写下"我真正看重什么"，建立自己的价值坐标。',
      mid:  '你大体有内在的方向感，但在群体压力或重要他人面前会动摇。平衡在于：听取反馈而不被其定义，尊重集体但保留自己的声音。',
      high: '你的自主性较强，决策与价值取向主要源于内在判断，能坚持自己认为对的事并承担后果。这是稳定的锚。注意在高度自主时保持开放的耳朵，避免固执。'
    }
  ];

  // ---------- 常量 ----------
  var ITEMS_PER_DIM = 10;
  var MIN_SCORE = 10, MAX_SCORE = 40;

  // ---------- 工具函数 ----------
  function bandOf(v) {
    if (v <= 40) return { label: '低亮', cls: 'low' };
    if (v <= 70) return { label: '中亮', cls: 'mid' };
    return { label: '高亮', cls: 'high' };
  }

  // 计分核心：输入作答 {id: 1-4}（每题 4 选项），输出每维原始分与标准化分
  function score(responses) {
    var raw = {}, sum = {}, count = {};
    DIMS.forEach(function (d) { raw[d.key] = 0; sum[d.key] = 0; count[d.key] = 0; });

    LSM_ITEMS.forEach(function (item) {
      var val = responses[item.id];
      if (typeof val !== 'number') return;
      var scoreVal = item.reverse ? (5 - val) : val;
      raw[item.dim] += scoreVal;
      sum[item.dim] += scoreVal;
      count[item.dim] += 1;
    });

    var norm = {}, answered = {};
    DIMS.forEach(function (d) {
      answered[d.key] = count[d.key];
      if (count[d.key] === ITEMS_PER_DIM) {
        norm[d.key] = Math.round(((raw[d.key] - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 1000) / 10;
      } else if (count[d.key] > 0) {
        var avg = sum[d.key] / count[d.key];
        norm[d.key] = Math.round(((avg - 1) / 4) * 1000) / 10;
      } else {
        norm[d.key] = null;
      }
    });

    return { raw: raw, norm: norm, answered: answered };
  }

  // 综合指标：心理平衡指数 PBI + 光谱一致性 SC
  function composite(norm) {
    var vals = Object.keys(norm).map(function (k) { return norm[k]; })
      .filter(function (v) { return typeof v === 'number'; });
    if (vals.length === 0) return { pbi: null, sc: null, count: 0 };

    var pbi = vals.reduce(function (a, b) { return a + b; }, 0) / vals.length;
    var mean = pbi;
    var variance = vals.reduce(function (acc, v) { return acc + (v - mean) * (v - mean); }, 0) / vals.length;
    var sc = Math.sqrt(variance);
    return {
      pbi: Math.round(pbi * 10) / 10,
      sc: Math.round(sc * 10) / 10,
      count: vals.length
    };
  }

  // 综合分析：找出最高/最低维度，生成综合画像
  function synthesize(norm) {
    var entries = Object.keys(norm)
      .filter(function (k) { return typeof norm[k] === 'number'; })
      .map(function (k) {
        var d = DIMS.find(function (x) { return x.key === k; });
        return { key: k, name: d ? d.name : k, score: norm[k] };
      })
      .sort(function (a, b) { return b.score - a.score; });

    return {
      top3: entries.slice(0, 3),
      bottom3: entries.slice(-3).reverse()
    };
  }

  // ---------- 对外暴露 ----------
  return {
    DOMAINS: DOMAINS,
    DIMS: DIMS,
    bandOf: bandOf,
    score: score,
    composite: composite,
    synthesize: synthesize
  };
})();
