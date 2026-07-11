from __future__ import annotations

from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
ASSETS = DOCS / "assets" / "json"
ASSETS.mkdir(parents=True, exist_ok=True)

def title_from_md(text: str) -> str:
    m = re.search(r'^#\s+(.+)$', text, re.M)
    return m.group(1).strip() if m else "Untitled"

def summary_from_md(text: str) -> str:
    seen_heading = False
    parts = []
    for raw in text.splitlines():
        line = raw.strip()
        if not seen_heading:
            if line.startswith("# "):
                seen_heading = True
            continue
        if not line:
            if parts:
                break
            continue
        if line.startswith(("```", "|", "-", "*", "!!!")):
            if parts:
                break
            continue
        if line.startswith("# "):
            break
        parts.append(line)
        if len(" ".join(parts)) > 160:
            break
    return " ".join(parts)[:180] or "Dokumentace"

def rel_href(path: Path) -> str:
    return "/" + path.relative_to(DOCS).with_suffix("").as_posix().rstrip("/")

items = []
for md in sorted(DOCS.rglob("*.md")):
    rel = md.relative_to(DOCS).as_posix()
    if rel.startswith("assets/"):
        continue
    text = md.read_text(encoding="utf-8")
    title = title_from_md(text)
    summary = summary_from_md(text)
    tags = [t for t in re.split(r"[/_.-]+", md.stem) if t]
    items.append({
        "title": title,
        "summary": summary,
        "href": rel_href(md) + "/",
        "tags": tags,
    })

(ASSETS / "search-index.json").write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")

versions = [
    {"label": "v3.0", "path": "/cs/versions/v3.0/"},
    {"label": "v2.0", "path": "/cs/versions/v2.0/"},
    {"label": "v1.0", "path": "/cs/versions/v1.0/"},
]
(ASSETS / "versions.json").write_text(json.dumps(versions, ensure_ascii=False, indent=2), encoding="utf-8")

blog = []
for lang in ("cs", "en"):
    for post in ("release-launch", "design-update", "roadmap"):
        p = DOCS / lang / "blog" / f"{post}.md"
        if p.exists():
            text = p.read_text(encoding="utf-8")
            blog.append({
                "lang": lang,
                "title": title_from_md(text),
                "href": f"/{lang}/blog/{post}/",
                "summary": summary_from_md(text),
            })
(ASSETS / "blog-index.json").write_text(json.dumps(blog, ensure_ascii=False, indent=2), encoding="utf-8")

nav = {
    "languages": [
        {"code": "cs", "label": "CZ", "path": "/cs/"},
        {"code": "en", "label": "EN", "path": "/en/"},
    ],
    "main": [
        {"title": "Docs", "path": "/cs/"},
        {"title": "Blog", "path": "/cs/blog/"},
        {"title": "API", "path": "/cs/api/"},
        {"title": "Versions", "path": "/cs/versions/"},
        {"title": "Changelog", "path": "/changelog/"},
    ]
}
(ASSETS / "nav-index.json").write_text(json.dumps(nav, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"Generated {len(items)} indexed pages.")
