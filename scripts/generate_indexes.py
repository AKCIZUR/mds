from __future__ import annotations

from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
ASSETS = DOCS / "assets" / "json"
ASSETS.mkdir(parents=True, exist_ok=True)

def clean_title(text: str) -> str:
    m = re.search(r'^#\s+(.+)$', text, re.M)
    return m.group(1).strip() if m else "Untitled"

def first_para(text: str) -> str:
    lines = [ln.strip() for ln in text.splitlines()]
    buf = []
    seen_heading = False
    for ln in lines:
        if not seen_heading:
            if ln.startswith("# "):
                seen_heading = True
            continue
        if not ln:
            if buf:
                break
            continue
        if ln.startswith(("#", "```", "!!!", "|", "-", "*")):
            if buf:
                break
            continue
        buf.append(ln)
        if len(" ".join(buf)) > 120:
            break
    return " ".join(buf)[:160] or "Dokumentace"

def page_href(path: Path) -> str:
    rel = path.relative_to(DOCS).as_posix()
    return "/" + rel

items = []
for md in sorted(DOCS.rglob("*.md")):
    rel = md.relative_to(DOCS).as_posix()
    if rel.startswith("assets/"):
        continue
    text = md.read_text(encoding="utf-8")
    title = clean_title(text)
    summary = first_para(text)
    tags = [p for p in re.split(r"[/_.-]+", md.stem) if p]
    items.append({
        "title": title,
        "summary": summary,
        "href": page_href(md).replace(".md", "/"),
        "tags": tags,
    })

(ASSETS / "search-index.json").write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")

versions = [
    {"label": "v2.0", "path": "/versions/v2.0/"},
    {"label": "v1.0", "path": "/versions/v1.0/"},
]
(ASSETS / "versions.json").write_text(json.dumps(versions, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"Generated {len(items)} index entries.")
