from __future__ import annotations

from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
ASSETS_JSON = DOCS / "assets" / "json"
ASSETS_JSON.mkdir(parents=True, exist_ok=True)

def heading_title(text: str) -> str:
    m = re.search(r'^#\s+(.+)$', text, re.M)
    return m.group(1).strip() if m else "Untitled"

def first_paragraph(text: str) -> str:
    lines = text.splitlines()
    started = False
    buf = []
    for raw in lines:
        line = raw.strip()
        if not started:
            if line.startswith("# "):
                started = True
            continue
        if not line:
            if buf:
                break
            continue
        if line.startswith(("#", "```", "|", "-", "*", "!!!")):
            if buf:
                break
            continue
        buf.append(line)
        if len(" ".join(buf)) > 160:
            break
    return " ".join(buf)[:180] or "Dokumentace"

items = []
for md in sorted(DOCS.rglob("*.md")):
    rel = md.relative_to(DOCS).as_posix()
    if rel.startswith("assets/"):
        continue
    text = md.read_text(encoding="utf-8")
    title = heading_title(text)
    items.append({
        "title": title,
        "summary": first_paragraph(text),
        "href": "/" + rel.replace(".md", "/"),
        "tags": [p for p in re.split(r"[\/_.-]+", md.stem) if p],
    })

(ASSETS_JSON / "search-index.json").write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")

versions = [
    {"label": "latest", "path": "/versions/latest/"},
    {"label": "2.0", "path": "/versions/2.0/"},
    {"label": "1.0", "path": "/versions/1.0/"},
]
(ASSETS_JSON / "versions.json").write_text(json.dumps(versions, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"Generated {len(items)} search entries.")
