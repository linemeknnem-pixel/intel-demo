# OranAI 情报中台 (intel-demo)

面向 AI 营销赛道的**情报知识库 + RAG 问答**中台：持续抓取竞品、行业、平台政策、甲方客户、消费者五类动态，沉淀为知识库，由 RAG 检索问答调用（附引用来源）。

> 从「只是一个壳子」升级为**真正能抓数据、能检索问答**的系统。

---

## 为什么不是「网站自己去爬」

GitHub Pages 是**静态托管**——没有服务器，且浏览器受同源/CORS 限制，无法直接爬取第三方网站。所以本系统把职责拆成三块：

```
        ┌──────────────────────────────────────────────┐
        │  ① 抓取  scripts/ingest.py                     │
        │     Google News RSS × 五类关键词 → 去重/打标签  │
        │     （可选 Claude 生成中文摘要）                 │
        └───────────────┬──────────────────────────────┘
                        │ 写回仓库
                        ▼
        ┌──────────────────────────────────────────────┐
        │  ② 调度  .github/workflows/ingest.yml          │
        │     GitHub Actions 每天 cron 运行 ①，commit 数据 │  ← 静态站「持续抓取」靠这里
        └───────────────┬──────────────────────────────┘
                        │ data/knowledge.js
                        ▼
        ┌──────────────────────────────────────────────┐
        │  ③ 应用  index.html （GitHub Pages）            │
        │     读取知识库 → 客户端 RAG 检索(TF-IDF) → 带引用回答 │
        └──────────────────────────────────────────────┘
```

---

## 目录结构

```
intel-demo/
├── index.html                 # 前端应用（工作台/情报/知识库/问答/权限）
├── data/
│   ├── knowledge.js           # 知识库（前端读取；由 ingest.py 生成）
│   └── knowledge.json         # 同内容 JSON（供 ingest.py 合并/其他程序用）
├── scripts/
│   └── ingest.py              # 抓取器（纯标准库，无需 pip install）
├── .github/workflows/
│   └── ingest.yml             # 定时抓取工作流
└── README.md
```

## 部署（GitHub Pages）

1. 把本目录内容推到你的 `intel-demo` 仓库根目录。
2. 仓库 **Settings → Pages**，Source 选 `main` 分支根目录，保存。
3. 访问 `https://<用户名>.github.io/intel-demo/` 即可。

## 开启「持续抓取」

1. 仓库 **Settings → Actions → General**，勾选允许工作流读写（Workflow permissions: Read and write）。
2. `.github/workflows/ingest.yml` 已配置每天自动运行；也可在 **Actions** 页点 “Run workflow” 手动触发。
3. 想立刻本地抓一批真实数据：
   ```bash
   python scripts/ingest.py         # 抓取并写入 data/（约 100+ 条真实情报）
   python scripts/ingest.py --dry   # 只预览不写文件
   ```

## RAG 问答的两种模式

- **抽取式（默认，零后端）**：客户端用 TF-IDF 检索 Top-K 相关情报，给出带引用的答案。无需任何密钥，纯静态即可用。
- **生成式（可选）**：把 `index.html` 里的 `window.RAG_CONFIG.endpoint` 指向你的 serverless 代理（Cloudflare Workers / Vercel），代理持有大模型密钥、拿检索到的上下文生成自然语言回答。**切勿把密钥写进前端**——它是公开的会被盗用。

serverless 代理约定（自行实现）：`POST {question, contexts:[{title,summary,body,url,...}]} → {answer:"..."}`。

## 数据源与调参

在 `scripts/ingest.py` 顶部：
- `QUERIES`：五类桶（竞品/行业/政策/客户/消费者）各自的搜索关键词，按需增删。
- `PER_QUERY` / `MAX_ITEMS`：每查询取数、知识库总量上限。
- 设 `ANTHROPIC_API_KEY`（仓库 Secret）后自动用 Claude 做中文摘要+打标签。

## 现实边界（诚实说明）

- **社交平台正文（小红书/抖音逐条内容、消费者评论）**受 ToS/反爬限制，不做直接抓取；消费者与甲方动态经由**新闻/RSS/研究报告**等公开渠道获取。要更深的社媒数据，需接入官方开放平台 API 或合规数据供应商。
- 当前 RAG 检索是轻量 TF-IDF（够用、零依赖）。要更准可升级为向量嵌入检索（在 ingest 阶段预计算 embedding，前端做余弦召回），或走生成式代理。
- 种子数据 `data/knowledge.js` 为 2026-07-13 公开检索整理，均附真实来源链接；上线 Actions 后会被自动刷新的数据合并扩充。
