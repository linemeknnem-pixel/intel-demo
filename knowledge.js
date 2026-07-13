/* OranAI 情报中台 · 知识库数据
 * 由 scripts/ingest.py 生成（GitHub Actions 定时运行后覆盖本文件）。
 * 本份为种子数据：2026-07-13 通过公开网络检索人工整理，均附真实来源链接。
 * 前端通过 <script src> 直接读取 window.KB_DATA（无需后端 / 免 CORS）。
 */
window.KB_DATA = {
  meta: { generated: "2026-07-13", origin: "seed（公开检索整理）", note: "上线 GitHub Actions 后由 ingest.py 自动刷新" },
  items: [
    /* ============ 竞品动态 ============ */
    { id: "c-tezign-unicorn", category: "竞品", company: "特赞 Tezign",
      title: "特赞成 AIGC 内容科技独角兽，推企业级智能体 GEA",
      source: "阿里创业 / 特赞官网", url: "https://startup.aliyun.com/info/1033873.html", date: "2026-06",
      summary: "特赞完成 D1 轮融资，估值超 10 亿美金，成 AIGC 内容科技赛道独角兽；投资方含淡马锡、红杉、软银中国、赫斯特、线性资本。",
      body: "特赞升级为企业级人工智能公司，推出企业级智能体 GEA（Generative Enterprise Agent），让智能体持续参与企业关键工作。产品覆盖内容生产、数据管理、专有 AIGC 模型训练、内容分析优化四大板块，主打企业内容资产全生命周期数字化。",
      tags: ["竞品", "融资", "独角兽", "企业智能体", "内容中台"] },

    { id: "c-tezign-gea", category: "竞品", company: "特赞 Tezign",
      title: "特赞主推「企业级创意内容数字新基建」四板块",
      source: "特赞官网", url: "https://www.tezign.com/en", date: "2026-05",
      summary: "特赞以生成式 AI 为核心，构建内容生产、数据管理、专有 AIGC 模型训练、内容分析优化的一体化平台。",
      body: "定位从「创意资源匹配」升级为「企业创意内容中台」，强调专有模型训练与内容分析优化，服务大型品牌的内容治理与复用。与橙果 OranAI 在 AI 生成创意环节重叠，但特赞偏内容资产管理（DAM），橙果偏投放增长与仿真决策。",
      tags: ["竞品", "产品", "DAM", "内容中台"] },

    { id: "c-tec-do-ipo", category: "竞品", company: "钛动科技 Tec-Do",
      title: "钛动科技筹备港股 IPO，管理超 4 亿条广告策略",
      source: "DoNews", url: "https://www.donews.com/article/detail/5458/97518.html", date: "2026-02",
      summary: "作为中国本土出海 AI 营销规模第一的公司，钛动管理超 4 亿条广告策略、1400 万个 SPU，服务超 10 万家广告主，覆盖 200+ 国家和地区，转道抢跑港股窗口。",
      body: "钛动以出海全链路服务 + SaaS 为主，服务重、规模大。截至 2026-02-18 已管理超 4 亿条广告策略与 1400 万个 SPU。与橙果在出海投放场景高度重叠，但钛动 agency 属性更重、毛利更低。",
      tags: ["竞品", "出海", "IPO", "投放", "规模"] },

    { id: "c-kuaizi-aplus", category: "竞品", company: "筷子科技 Kuaizi",
      title: "筷子科技获数千万 A+ 轮，自研 FusionX 内容结构化引擎",
      source: "毕友网", url: "http://www.beeui.com/p/4434.html", date: "2026-03",
      summary: "筷子科技获数千万人民币 A+ 轮融资，投资方为赛意产业基金；自研内容结构化分析引擎 FusionX，实现「编、拍、剪、投、管」全链路。",
      body: "企业级 AIGC 内容商业 SaaS 平台，基于 FusionX 智能解构创意元素。偏中小商家走量与账号矩阵裂变；橙果偏品牌高客单，且多一层仿真预测与合规模特库。",
      tags: ["竞品", "融资", "视频生成", "编拍剪投"] },

    { id: "c-mogic-aplus", category: "竞品", company: "奥创光年 Mogic",
      title: "奥创光年完成 1500 万美元 A+ 轮，美图与凯辉领投",
      source: "4A广告网 / 腾讯新闻", url: "https://www.4anet.com/p/11v81244bf20732b", date: "2026-01",
      summary: "AI native 营销公司奥创光年完成 1500 万美元 A+ 轮，美图公司与凯辉基金领投，彬复资本、万物创投跟投。",
      body: "推出 Mogic Content AI Studio 与 Mogic Copilot，提供从策略洞察、AI 内容制作、智能投流到 DAM 管理的全链路方案。已服务阿里、百事、欧莱雅、联合利华等上百家一线品牌，客户与橙果高度重叠；强在洞察与代运营，橙果强在生成资产与仿真建模。",
      tags: ["竞品", "融资", "全链路", "客户重叠"] },

    /* ============ 行业 / 趋势 ============ */
    { id: "i-social-report-2026", category: "行业", company: "",
      title: "《2026 AI 重构下的社交媒体营销趋势报告》发布",
      source: "界面新闻 · 第十届社交媒体风向大会", url: "https://www.jiemian.com/article/14484731.html", date: "2026-06",
      summary: "报告指出 AI 正从辅助工具变为社媒营销的核心生产力，重构内容生产、达人协作与投放决策链路。",
      body: "AIGC 从辅助走向创意生产主链路，出海营销场景渗透最快。营销竞争的关键从渠道红利转向「数据 + 生成 + 决策」的一体化能力。",
      tags: ["行业", "趋势", "报告", "社媒"] },

    { id: "i-content-as-trainingdata", category: "行业", company: "",
      title: "社媒内容正成为 AI 大模型的训练数据",
      source: "知乎 · 2026 小红书八大趋势", url: "https://zhuanlan.zhihu.com/p/1991105890716247188", date: "2026-05",
      summary: "不同大模型抓取不同平台内容：豆包→抖音、文心→小红书/百科、通义→淘宝/微博，社媒内容成为模型「燃料」。",
      body: "内容资产的价值外溢到 AI 训练层面，品牌在各平台的内容沉淀会影响其在 AI 搜索/推荐中的可见性（GEO）。这也是橙果 OranGEO 的机会点。",
      tags: ["行业", "趋势", "GEO", "AI搜索"] },

    { id: "i-kol-trust-ai", category: "行业", company: "",
      title: "KOL 营销进入「真人信任资产 + AI 生产力」时代",
      source: "知乎", url: "https://zhuanlan.zhihu.com/p/1991105890716247188", date: "2026-05",
      summary: "真人提供人格与情感共鸣的信任，AI 负责参数到场景的转化、素材优化与多圈层适配。",
      body: "达人营销从「找人投放」升级为「人机协同生产」。橙果 AI MCN 模式（真实达人账号矩阵 + AI 批量生产）正好卡在这一趋势上。",
      tags: ["行业", "达人", "AI MCN", "趋势"] },

    /* ============ 平台 / 政策 ============ */
    { id: "p-meta-e2e", category: "政策", company: "Meta",
      title: "Meta 推端到端 AI 自动化广告：给 URL 和预算，AI 全包",
      source: "HuiiMedia / DigitalApplied", url: "https://www.huiimedia.com/blog/303.html", date: "2026-04",
      summary: "广告主只需提供业务 URL 与预算，Meta AI 自动完成创意生成、人群定向、版位与竞价优化，投手从「操作员」变「AI 合伙人」。",
      body: "2026 投放优势从「竞价技术」转向「素材迭代速度」，素材成为算法的「燃料」——谁能提供更丰富、更高质量的素材，越易被算法青睐。这直接抬高了 AI 批量生成能力的价值。",
      tags: ["政策", "Meta", "投放", "自动化", "素材"] },

    { id: "p-tiktok-symphony", category: "政策", company: "TikTok",
      title: "TikTok 强化 Smart+ 与 Symphony，收紧合成媒体合规",
      source: "品牌方舟 / TikTok Ads", url: "https://www.brandark.com/t/U4y3EmDd", date: "2026-03",
      summary: "TikTok 升级 Smart+ AI 广告方案并推出 Symphony，可将创意快速拆解重组为不同节奏、比例、动作版本；同时要求含真人肖像/声音的合成媒体须获授权并合规。",
      body: "对出海短视频投放意味着：AI 一键从文本生成完整视频广告成为常态，但数字人/换脸类素材的版权与隐私合规成为硬门槛——与橙果自建版权合规模特库的定位契合。",
      tags: ["政策", "TikTok", "数字人", "合规", "创意"] },

    { id: "p-google-ai-mode", category: "政策", company: "Google",
      title: "Google 在 AI Mode 搜索内推出 Direct Offers 购物广告",
      source: "DigitalApplied", url: "https://www.digitalapplied.com/blog/social-media-ai-advertising-april-2026-meta-google", date: "2026-02",
      summary: "Google 于 2026-02 在 AI 生成式对话搜索结果内放置赞助商品推荐（Direct Offers），广告进入 AI 搜索结果页。",
      body: "标志着「被 AI 搜索看见」成为新的流量入口，GEO（生成引擎优化）从概念走向可投放。品牌需要让自己被 AI 主动推荐——对应橙果 OranGEO 前瞻引擎。",
      tags: ["政策", "Google", "AI搜索", "GEO"] },

    /* ============ 甲方 / 客户动态 ============ */
    { id: "k-proya-ai", category: "客户", company: "珀莱雅 PROYA",
      title: "珀莱雅全流程 AI 化：图像生成做包装、视频生成做抖音营销",
      source: "新华网 / 新浪财经", url: "https://www.news.cn/fashion/20260427/ddba9be826fe4ced9d68fb506d389259/c.html", date: "2026-04",
      summary: "珀莱雅将图像生成算法用于包装设计、视频生成算法用于抖音营销视频，并用 AI 分析电商评论与社交讨论洞察消费者（肤感、功效、色号、价格）。",
      body: "美妆龙头把 AI 嵌入研发—开品—营销全流程。这是橙果 PROYA 案例（AI 创作效率 +60%）的行业背景；美妆客户对 AI 内容生产与消费者洞察的需求正在爆发。",
      tags: ["客户", "美妆", "数字化", "标杆"] },

    { id: "k-proya-global", category: "客户", company: "珀莱雅 PROYA",
      title: "珀莱雅投资花知晓出海，海外占比 10%、美国为最大市场",
      source: "界面新闻", url: "https://m.jiemian.com/article/13288116.html", date: "2026-03",
      summary: "珀莱雅投资的彩妆品牌花知晓已覆盖数十国，海外营收占比达 10%，美国成最大海外市场，2025 全年营收预计破 10 亿元。",
      body: "国货美妆出海加速，内容本地化与合规是刚需。橙果的多语言生成 + 合规模特库 + AI MCN 分发正对应这类出海品牌的增长诉求。",
      tags: ["客户", "美妆", "出海", "增长"] },

    { id: "k-proya-digital", category: "客户", company: "珀莱雅 PROYA",
      title: "珀莱雅：智能绘图系统提效电商素材，AI 客服撑大促流量",
      source: "飞书客户案例", url: "https://www.feishu.cn/customers/proya", date: "2026-02",
      summary: "珀莱雅建立智能绘图系统提升电商素材生产效率，并与蚂蚁集团合作「智能客服」支撑大促高峰流量。",
      body: "甲方在「素材生产 + 服务」两端同时上 AI。信息中台可持续跟踪此类客户动态，识别橙果的进入与扩单机会。",
      tags: ["客户", "美妆", "数字化", "大促"] },

    { id: "k-beauty-ai", category: "客户", company: "",
      title: "AI 深度渗透美妆产业链，驱动行业智能变革",
      source: "新华网", url: "https://www.news.cn/fashion/20260427/ddba9be826fe4ced9d68fb506d389259/c.html", date: "2026-04",
      summary: "美妆行业正朝「整体美容健康、情绪与科技体验、AI 全面渗透研发链路、可持续系统化升级」方向演进，中国美妆成国际「并跑者」。",
      body: "美妆是橙果核心行业之一。行业级 AI 渗透意味着甲方预算向 AI 内容与洞察倾斜，是橙果 TAM 扩张的顺风。",
      tags: ["客户", "美妆", "行业", "趋势"] },

    /* ============ 消费者动态 ============ */
    { id: "u-xhs-4e", category: "消费者", company: "小红书",
      title: "小红书月活破 4 亿，全面押注中长视频与深度内容",
      source: "虎嗅网", url: "https://www.huxiu.com/article/4861801.html", date: "2026-05",
      summary: "小红书月活突破 4 亿，获 2026 世界杯转播权，投入数千万创作者基金与 5000 亿流量扶持 15 个内容领域，上线长图文、播客与 4K 视频。",
      body: "消费者内容消费从图文向中长视频迁移，平台内容供给扩容。品牌需要更多样、更长的优质内容——利好 AI 规模化内容生产。",
      tags: ["消费者", "小红书", "中长视频", "平台"] },

    { id: "u-xhs-interest", category: "消费者", company: "小红书",
      title: "小红书从「生活指南」转向「生活兴趣社区」",
      source: "人人都是产品经理", url: "https://www.woshipm.com/operate/6336917.html", date: "2026-04",
      summary: "内容消费从美妆、美食等实用品类，向游戏、动漫、科技、文化等精神消费迁移；兴趣成为跨越城市、阶层、人群的连接。",
      body: "消费者兴趣圈层碎片化，种草需要更精细的人群与内容匹配。对橙果意味着「洞察 + 仿真」在选题与达人匹配上的价值上升。",
      tags: ["消费者", "小红书", "兴趣圈层", "种草"] },

    { id: "u-seeding-2026", category: "消费者", company: "",
      title: "2026 种草趋势：细分垂类精准流量，转化效果更优",
      source: "玖叁鹿 / 知乎", url: "https://www.zjlyb.com/index.php?c=show&id=552", date: "2026-05",
      summary: "越发细分且高价值的内容赛道（如一人游、citywalk 路线、特定品类）吸引精准流量，种草转化效果更好。",
      body: "泛流量红利见顶，垂类深耕成为种草主旋律。信息中台可帮助品牌部持续捕捉细分赛道热点，指导 OranHub 洞察与选题。",
      tags: ["消费者", "种草", "垂类", "转化"] },

    { id: "u-consumer-emotion", category: "消费者", company: "",
      title: "情绪消费与科技体验成为消费者新驱动",
      source: "新华网 / 珀莱雅致辞", url: "https://finance.sina.com.cn/wm/2026-04-23/doc-inhvnnxh3768746.shtml", date: "2026-04",
      summary: "消费者需求向「情绪消费、科技体验、整体健康」演进，内容营销从功能诉求转向情绪与体验共鸣。",
      body: "内容创意的「情绪价值」权重上升，纯参数堆砌的素材失效。对 AI 生成提出更高的「懂人」要求——橙果的行业 Know-how + 仿真选卖点是差异点。",
      tags: ["消费者", "情绪消费", "内容", "趋势"] }
  ]
};
