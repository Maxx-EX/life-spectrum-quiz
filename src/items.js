// ============================================================
// LSM-120 题目库 —— 全部为原创内容
// 生命光谱模型（Life Spectrum Model, LSM-120）
// 120 道原创题，12 维度 × 10 题，覆盖认知/情绪/关系/内在锚定四大光谱域
// 本文件为项目原始数据，采用 Apache License 2.0 开源
// ============================================================

// 每题字段说明：
//   id        题目唯一编号（1-120）
//   dim       所属维度 key
//   text      题目文本（原创）
//   reverse   是否为反向题（true 表示作答方向需反转计分）
window.LSM_ITEMS = [
  // ============ 认知光谱 · 认知弹性 ============
  { id: 1,  dim: 'flex',   text: '当别人提出与我观点相反的有力证据时，我愿意重新考虑自己的看法。', reverse: false },
  { id: 2,  dim: 'flex',   text: '计划被打乱时，我能较快找到替代方案，而不是一直纠结原计划。', reverse: false },
  { id: 3,  dim: 'flex',   text: '我倾向于用"不一定只有一种对的做法"来看待多数问题。', reverse: true },
  { id: 4,  dim: 'flex',   text: '面对新情况，我能在第一反应之外想出第二种应对方式。', reverse: false },
  { id: 5,  dim: 'flex',   text: '我很难放弃已经投入很多时间的方法，即使它效果不佳。', reverse: true },
  { id: 6,  dim: 'flex',   text: '环境变化时，我比周围人更容易调整自己的节奏。', reverse: false },
  { id: 7,  dim: 'flex',   text: '我不喜欢我的日常安排被临时改动。', reverse: true },
  { id: 8,  dim: 'flex',   text: '遇到矛盾信息时，我可以暂时让两种观点并存，而不是急着选边站。', reverse: false },
  { id: 9,  dim: 'flex',   text: '我习惯用老办法处理熟悉的问题，即使有新方法也不愿尝试。', reverse: true },
  { id: 10, dim: 'flex',   text: '当我意识到某个想法行不通时，我能及时刹车转向。', reverse: false },

  // ============ 认知光谱 · 专注锚定 ============
  { id: 11, dim: 'focus',  text: '在嘈杂的环境中，我仍能把注意力集中在手头的事情上。', reverse: false },
  { id: 12, dim: 'focus',  text: '我工作时一旦被打断，需要很长时间才能重新进入状态。', reverse: true },
  { id: 13, dim: 'focus',  text: '我能连续较长时间做一件需要动脑的事而不觉得痛苦。', reverse: false },
  { id: 14, dim: 'focus',  text: '手机通知经常会把我从当前任务中拉走。', reverse: true },
  { id: 15, dim: 'focus',  text: '做重要事情时，我会有清晰的投入感，外界很难干扰我。', reverse: false },
  { id: 16, dim: 'focus',  text: '走神之后，我能很快把注意力拉回正事上。', reverse: false },
  { id: 17, dim: 'focus',  text: '做要紧的事时，我倾向于把手机和消息提醒暂时关掉。', reverse: false },
  { id: 18, dim: 'focus',  text: '我经常开始一件事后又转去做另一件，最后哪件都没做完。', reverse: true },
  { id: 19, dim: 'focus',  text: '阅读长文时，我能从头到尾保持思路连贯。', reverse: false },
  { id: 20, dim: 'focus',  text: '我容易被新出现的有趣事物分心，即使手头有要紧事。', reverse: true },

  // ============ 认知光谱 · 好奇探索 ============
  { id: 21, dim: 'curio',  text: '面对陌生的领域，我首先感到的是兴奋而非抗拒。', reverse: false },
  { id: 22, dim: 'curio',  text: '我愿意花时间弄明白一个"没用但有趣"的问题。', reverse: false },
  { id: 23, dim: 'curio',  text: '我很少主动去了解自己圈子以外的信息。', reverse: true },
  { id: 24, dim: 'curio',  text: '遇到不知道的概念，我会立刻想去查清楚。', reverse: false },
  { id: 25, dim: 'curio',  text: '新地方、新的人、新的想法总能激起我的兴趣。', reverse: false },
  { id: 26, dim: 'curio',  text: '对已经熟悉的东西，我缺乏继续深挖的耐心。', reverse: true },
  { id: 27, dim: 'curio',  text: '我愿意尝试没有明确回报的新体验。', reverse: false },
  { id: 28, dim: 'curio',  text: '我倾向于重复已经验证有效的做法，而不是尝试新路。', reverse: true },
  { id: 29, dim: 'curio',  text: '看到和自己专业无关的领域，我也会产生好奇。', reverse: false },
  { id: 30, dim: 'curio',  text: '好奇心常常驱使我主动给自己安排新的学习内容。', reverse: false },

  // ============ 认知光谱 · 决策权衡 ============
  { id: 31, dim: 'decide', text: '做重要决定前，我会尽量收集足够的信息再行动。', reverse: false },
  { id: 32, dim: 'decide', text: '我常常凭第一感觉快速做决定。', reverse: true },
  { id: 33, dim: 'decide', text: '面对几个差不多的选项，我会反复比较，很难下决心。', reverse: false },
  { id: 34, dim: 'decide', text: '我信任自己的直觉，即使缺少数据也能果断选择。', reverse: true },
  { id: 35, dim: 'decide', text: '做决定时，我更看重长期后果，而不是眼前的便利。', reverse: false },
  { id: 36, dim: 'decide', text: '我经常因为考虑太多而错过时机。', reverse: true },
  { id: 37, dim: 'decide', text: '我喜欢列出利弊清单来辅助决策。', reverse: false },
  { id: 38, dim: 'decide', text: '面对不确定的选择，我倾向于先行动、再调整。', reverse: true },
  { id: 39, dim: 'decide', text: '做出决定后，我很少反复后悔或推翻。', reverse: true },
  { id: 40, dim: 'decide', text: '我更能接受"大致正确"的方案，而不是追求万无一失。', reverse: true },

  // ============ 情绪光谱 · 情绪复原 ============
  { id: 41, dim: 'recov',  text: '遇到挫折后，我通常几天内就能恢复平常心态。', reverse: false },
  { id: 42, dim: 'recov',  text: '一次失败会让我长时间提不起精神。', reverse: true },
  { id: 43, dim: 'recov',  text: '我能从负性情绪中较快"走出来"。', reverse: false },
  { id: 44, dim: 'recov',  text: '被批评后，我会反复回想很久。', reverse: true },
  { id: 45, dim: 'recov',  text: '情绪低落时，我会主动去做能让自己好转的事情。', reverse: false },
  { id: 46, dim: 'recov',  text: '我不容易因为一件坏事而否定自己的整体状态。', reverse: false },
  { id: 47, dim: 'recov',  text: '糟糕的一天之后，睡一觉我基本能恢复元气。', reverse: false },
  { id: 48, dim: 'recov',  text: '我常常把小的不顺利放大成大的灾难。', reverse: true },
  { id: 49, dim: 'recov',  text: '即使情绪不好，我仍能维持正常的生活节奏。', reverse: false },
  { id: 50, dim: 'recov',  text: '挫折之后，我倾向于把它转化为下一次行动的动力。', reverse: false },

  // ============ 情绪光谱 · 压力代谢 ============
  { id: 51, dim: 'stress', text: '在高强度要求下，我仍能保持基本稳定。', reverse: false },
  { id: 52, dim: 'stress', text: '压力累积时，我常常感到身体也跟着紧绷不适。', reverse: true },
  { id: 53, dim: 'stress', text: '我有一套自己应对压力的方式，并且确实有效。', reverse: false },
  { id: 54, dim: 'stress', text: '长时间高压会让我的睡眠质量明显变差。', reverse: true },
  { id: 55, dim: 'stress', text: '面对截止日期，我能保持节奏，而不是被压垮。', reverse: false },
  { id: 56, dim: 'stress', text: '我倾向于把事情积压到最后再集中处理，导致压力集中爆发。', reverse: true },
  { id: 57, dim: 'stress', text: '压力大的时候，我会主动给自己的生活留出缓冲空间。', reverse: false },
  { id: 58, dim: 'stress', text: '我容易把别人的催促当成对自己的巨大压力。', reverse: true },
  { id: 59, dim: 'stress', text: '即使任务很多，我也能分清轻重缓急、依次完成。', reverse: false },
  { id: 60, dim: 'stress', text: '压力过去之后，我能较快恢复精力和干劲。', reverse: false },

  // ============ 情绪光谱 · 乐观基调 ============
  { id: 61, dim: 'optim',  text: '总体来看，我认为未来会往好的方向发展。', reverse: false },
  { id: 62, dim: 'optim',  text: '我相信自己的努力能带来想要的改变。', reverse: false },
  { id: 63, dim: 'optim',  text: '遇到困难时，我倾向于相信"总会有办法"。', reverse: false },
  { id: 64, dim: 'optim',  text: '我经常担心不好的事情会发生。', reverse: true },
  { id: 65, dim: 'optim',  text: '对不确定的结果，我愿意做乐观的预期。', reverse: false },
  { id: 66, dim: 'optim',  text: '我相信大部分人是善意且可以合作的。', reverse: false },
  { id: 67, dim: 'optim',  text: '失败后，我倾向于认为是暂时的、可以改变的。', reverse: false },
  { id: 68, dim: 'optim',  text: '我常常为最坏的情况做准备，以至于过度担忧。', reverse: true },
  { id: 69, dim: 'optim',  text: '我对自己的长期发展抱有积极的期待。', reverse: false },
  { id: 70, dim: 'optim',  text: '即使当下不顺，我也相信这段时期会过去。', reverse: false },

  // ============ 情绪光谱 · 情绪觉知 ============
  { id: 71, dim: 'aware',  text: '我通常能清楚地知道自己此刻是高兴还是难过。', reverse: false },
  { id: 72, dim: 'aware',  text: '情绪波动时，我能分辨出具体是哪一种情绪。', reverse: false },
  { id: 73, dim: 'aware',  text: '我常常"说不清"自己为什么烦躁。', reverse: true },
  { id: 74, dim: 'aware',  text: '我能注意到身体反应（如心跳、呼吸）与情绪之间的联系。', reverse: false },
  { id: 75, dim: 'aware',  text: '我能用语言比较准确地描述自己的内心感受。', reverse: false },
  { id: 76, dim: 'aware',  text: '情绪上来时，我往往来不及觉察，就已经被它带动。', reverse: true },
  { id: 77, dim: 'aware',  text: '我能区分"我现在的情绪"和"我这个人本身"。', reverse: false },
  { id: 78, dim: 'aware',  text: '我很少停下来体会自己的真实感受。', reverse: true },
  { id: 79, dim: 'aware',  text: '我知道哪些事情容易触发自己的情绪。', reverse: false },
  { id: 80, dim: 'aware',  text: '别人问我"感觉怎么样"时，我能给出比较具体的回答。', reverse: false },

  // ============ 关系光谱 · 边界建构 ============
  { id: 81, dim: 'bound',  text: '我能礼貌而坚定地对不合理的要求说"不"。', reverse: false },
  { id: 82, dim: 'bound',  text: '答应别人之前，我会先考虑自己的时间与精力是否允许。', reverse: false },
  { id: 83, dim: 'bound',  text: '当别人过度介入我的生活时，我会表达不满。', reverse: false },
  { id: 84, dim: 'bound',  text: '我常因为怕得罪人而答应自己不想做的事。', reverse: true },
  { id: 85, dim: 'bound',  text: '我能把工作或他人的问题，与我个人的情绪分开。', reverse: false },
  { id: 86, dim: 'bound',  text: '面对情感勒索式的请求，我能保持自己的立场。', reverse: false },
  { id: 87, dim: 'bound',  text: '我倾向于承担不属于自己的责任。', reverse: true },
  { id: 88, dim: 'bound',  text: '我能接受别人对我"有所期待"，但不会被其绑架。', reverse: false },
  { id: 89, dim: 'bound',  text: '当关系让我感到被消耗时，我会主动拉开距离。', reverse: false },
  { id: 90, dim: 'bound',  text: '我很难拒绝亲近之人的请求，即使自己很为难。', reverse: true },

  // ============ 关系光谱 · 社交能量 ============
  { id: 91, dim: 'social', text: '和人长时间待在一起之后，我通常会感到更有活力。', reverse: false },
  { id: 92, dim: 'social', text: '我需要在独处中"充电"才能恢复精力。', reverse: true },
  { id: 93, dim: 'social', text: '与陌生人交谈，对我来说是件轻松的事。', reverse: false },
  { id: 94, dim: 'social', text: '大型聚会后，我常常感到疲惫，需要安静休息。', reverse: true },
  { id: 95, dim: 'social', text: '我乐于主动发起社交邀请。', reverse: false },
  { id: 96, dim: 'social', text: '比起热闹的场合，我更偏好安静小范围的活动。', reverse: true },
  { id: 97, dim: 'social', text: '聊天中，我往往是那个带动话题的人。', reverse: false },
  { id: 98, dim: 'social', text: '我需要定期独处，否则会觉得被"掏空"。', reverse: true },
  { id: 99, dim: 'social', text: '我在人群中能自然放松，不会觉得拘束。', reverse: false },
  { id: 100, dim: 'social', text: '社交活动过多，会让我想提前离开。', reverse: true },

  // ============ 关系光谱 · 共情通道 ============
  { id: 101, dim: 'empat',  text: '朋友难过时，我能比较准确地体会他/她的感受。', reverse: false },
  { id: 102, dim: 'empat',  text: '看感人的故事时，我很容易被代入主角的情绪。', reverse: false },
  { id: 103, dim: 'empat',  text: '我能理解与我立场不同的人为什么那样想。', reverse: false },
  { id: 104, dim: 'empat',  text: '别人情绪不好时，我常常能第一时间察觉到。', reverse: false },
  { id: 105, dim: 'empat',  text: '我不太擅长揣摩别人话里的潜台词。', reverse: true },
  { id: 106, dim: 'empat',  text: '当别人向我倾诉时，我能忍住不打断、不急着给建议。', reverse: false },
  { id: 107, dim: 'empat',  text: '我有时会因为他人的情绪，而自己也跟着低落。', reverse: false },
  { id: 108, dim: 'empat',  text: '我很难从别人的表情和语气判断其真实感受。', reverse: true },
  { id: 109, dim: 'empat',  text: '我能站在对方的角度思考问题，即使我并不认同。', reverse: false },
  { id: 110, dim: 'empat',  text: '对陌生人的困境，我也会有情感上的触动。', reverse: false },

  // ============ 内在锚定域 · 独立自主 ============
  { id: 111, dim: 'auton',  text: '我的人生选择更多基于自己的判断，而非他人的期待。', reverse: false },
  { id: 112, dim: 'auton',  text: '即使大多数人不认同，我也能坚持自己认为对的事。', reverse: false },
  { id: 113, dim: 'auton',  text: '我常常需要别人的认可，才能确认自己做得对。', reverse: true },
  { id: 114, dim: 'auton',  text: '我能一个人做出重要决定，而不感到惶恐。', reverse: false },
  { id: 115, dim: 'auton',  text: '我的价值观是稳定成型的，不轻易随波逐流。', reverse: false },
  { id: 116, dim: 'auton',  text: '别人的评价，会明显影响我对自己的看法。', reverse: true },
  { id: 117, dim: 'auton',  text: '我乐于承担自己选择的后果，无论是好是坏。', reverse: false },
  { id: 118, dim: 'auton',  text: '当我与集体意见不同时，我倾向于压抑自己的声音。', reverse: true },
  { id: 119, dim: 'auton',  text: '我清楚自己想要什么，而不只是别人希望我要什么。', reverse: false },
  { id: 120, dim: 'auton',  text: '面对群体压力，我仍能保持自己的节奏和立场。', reverse: false }
];

// 自检：确认共 120 题，且每维 10 题
(function selfCheck() {
  if (!window.LSM_ITEMS) return;
  var count = window.LSM_ITEMS.length;
  var dimMap = {};
  window.LSM_ITEMS.forEach(function (it) { dimMap[it.dim] = (dimMap[it.dim] || 0) + 1; });
  console.log('[LSM-120 自检] 题目总数:', count, '| 各维度题数:', JSON.stringify(dimMap));
})();
