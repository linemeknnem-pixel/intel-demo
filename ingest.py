#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OranAI 情报中台 · 数据抓取器 (ingester)
------------------------------------------------
这是「信息中台真正抓取数据」的引擎。GitHub Pages 是静态托管、浏览器受 CORS 限制，
无法自己爬取；所以抓取放在这里，由 .github/workflows/ingest.yml 定时（cron）在
GitHub Actions 里运行，把结果写回仓库的 data/knowledge.js，页面再读取它。

数据源：Google News RSS 搜索（合法、公开、无需密钥、服务器端可取）。
按「竞品 / 行业 / 政策 / 客户 / 消费者」五个桶各配一组关键词。

可选增强：设置环境变量 ANTHROPIC_API_KEY 后，用 Claude 对每条做中文摘要+打标签
（否则回退到 RSS 自带摘要 + 关键词标签）。纯标准库，CI 无需 pip install。

用法：
    python scripts/ingest.py            # 抓取并合并写入 data/knowledge.{js,json}
    python scripts/ingest.py --dry      # 只打印，不写文件
"""
import json, os, re, sys, hashlib, html, urllib.request, urllib.parse, datetime
from xml.etree import ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT, "data")
JSON_PATH = os.path.join(DATA_DIR, "knowledge.json")
JS_PATH   = os.path.join(DATA_DIR, "knowledge.js")
MAX_ITEMS = 400          # 知识库上限，超出丢弃最旧的
PER_QUERY = 8            # 每个查询最多取几条

# —— 五个情报桶：分类 -> 搜索关键词（Google News 语法，支持 OR）——
QUERIES = {
    "竞品":   ["特赞 Tezign", "钛动科技", "筷子科技", "奥创光年 Mogic", "AI营销 融资"],
    "行业":   ["AIGC 营销", "AI 营销 行业 趋势", "生成式AI 广告"],
    "政策":   ["TikTok 广告 政策 AI", "Meta 广告 AI", "Google Ads AI 政策"],
    "客户":   ["珀莱雅 AI", "美妆 品牌 AI营销", "DTC 品牌 出海 AI"],
    "消费者": ["小红书 趋势", "抖音 消费趋势", "种草 内容 趋势"],
}
# 标签抽取用的关键词
TAGWORDS = ["融资","独角兽","出海","数字人","合规","Agent","IPO","大模型","投放",
            "种草","直播","短视频","DAM","GEO","AI搜索","收购","发布会","财报"]

UA = {"User-Agent": "Mozilla/5.0 (OranAI-IntelBot; +https://oran.cn)"}


def gnews_url(q):
    qs = urllib.parse.urlencode({"q": q, "hl": "zh-CN", "gl": "CN", "ceid": "CN:zh-Hans"})
    return "https://news.google.com/rss/search?" + qs


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def clean(t):
    t = re.sub(r"<[^>]+>", "", t or "")
    return html.unescape(t).strip()


def parse_rss(xml_bytes):
    """返回 [{title, link, source, date, summary}]"""
    out = []
    try:
        root = ET.fromstring(xml_bytes)
    except Exception:
        return out
    for item in root.iter("item"):
        title = clean(item.findtext("title", ""))
        link = (item.findtext("link", "") or "").strip()
        desc = clean(item.findtext("description", ""))
        src_el = item.find("source")
        source = clean(src_el.text) if src_el is not None else "Google News"
        pub = item.findtext("pubDate", "")
        date = to_date(pub)
        if title and link:
            out.append({"title": title, "link": link, "source": source,
                        "date": date, "summary": desc[:180]})
    return out


def to_date(pub):
    for fmt in ("%a, %d %b %Y %H:%M:%S %Z", "%a, %d %b %Y %H:%M:%S %z"):
        try:
            return datetime.datetime.strptime(pub, fmt).strftime("%Y-%m-%d")
        except Exception:
            pass
    return datetime.date.today().strftime("%Y-%m-%d")


def norm_title(t):
    return re.sub(r"[\s\W_]+", "", (t or "").lower())


def make_tags(cat, text):
    tags = [cat]
    for w in TAGWORDS:
        if w.lower() in text.lower() and w not in tags:
            tags.append(w)
        if len(tags) >= 4:
            break
    return tags


# ——（可选）用 Claude 生成中文摘要 + 标签 ——
def llm_enrich(title, summary):
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        return None
    try:
        body = json.dumps({
            "model": "claude-haiku-4-5-20251001",
            "max_tokens": 200,
            "messages": [{"role": "user", "content":
                f"用一句中文（<=45字）概括这条 AI 营销情报，再给最多4个中文标签。"
                f"只输出 JSON：{{\"summary\":\"...\",\"tags\":[\"..\"]}}。\n标题：{title}\n摘要：{summary}"}],
        }).encode("utf-8")
        req = urllib.request.Request("https://api.anthropic.com/v1/messages", data=body,
            headers={"content-type": "application/json", "x-api-key": key,
                     "anthropic-version": "2023-06-01"})
        with urllib.request.urlopen(req, timeout=40) as r:
            j = json.loads(r.read())
        txt = j["content"][0]["text"]
        m = re.search(r"\{.*\}", txt, re.S)
        return json.loads(m.group(0)) if m else None
    except Exception as e:
        print("  ! LLM enrich skipped:", e, file=sys.stderr)
        return None


def load_existing():
    if os.path.exists(JSON_PATH):
        try:
            with open(JSON_PATH, encoding="utf-8") as f:
                return json.load(f).get("items", [])
        except Exception:
            pass
    return []


def main():
    dry = "--dry" in sys.argv
    existing = load_existing()
    seen = {norm_title(it["title"]) for it in existing}
    seen_ids = {it["id"] for it in existing}
    fresh = []

    for cat, queries in QUERIES.items():
        for q in queries:
            try:
                rows = parse_rss(fetch(gnews_url(q)))[:PER_QUERY]
            except Exception as e:
                print(f"  ! fetch failed [{cat}/{q}]:", e, file=sys.stderr)
                continue
            for r in rows:
                nt = norm_title(r["title"])
                if nt in seen:
                    continue
                seen.add(nt)
                _id = "n" + hashlib.md5(r["link"].encode()).hexdigest()[:10]
                if _id in seen_ids:
                    continue
                seen_ids.add(_id)
                summary, tags = r["summary"], make_tags(cat, r["title"] + r["summary"])
                enr = llm_enrich(r["title"], r["summary"])
                if enr:
                    summary = enr.get("summary", summary)
                    tags = [cat] + [t for t in enr.get("tags", []) if t != cat]
                fresh.append({
                    "id": _id, "category": cat, "company": "",
                    "title": r["title"], "source": r["source"], "url": r["link"],
                    "date": r["date"], "summary": summary or r["title"],
                    "body": (r["summary"] or r["title"]), "tags": tags[:4],
                })
            print(f"  · {cat} / {q}: +{len([x for x in fresh if x['category']==cat])} 累计")

    merged = (fresh + existing)[:MAX_ITEMS]
    payload = {"meta": {"generated": datetime.date.today().strftime("%Y-%m-%d"),
                        "origin": "ingest.py · Google News RSS",
                        "note": f"新增 {len(fresh)} 条，合计 {len(merged)} 条"}, "items": merged}

    print(f"\n抓取完成：新增 {len(fresh)} 条，知识库合计 {len(merged)} 条。")
    if dry:
        print("[--dry] 未写文件。样例：")
        for it in fresh[:5]:
            print("  -", it["category"], "|", it["title"][:40])
        return

    os.makedirs(DATA_DIR, exist_ok=True)
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)
    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write("/* 自动生成 by scripts/ingest.py —— 请勿手改 */\n")
        f.write("window.KB_DATA = ")
        json.dump(payload, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    print("已写入 data/knowledge.js 与 data/knowledge.json")


if __name__ == "__main__":
    main()
