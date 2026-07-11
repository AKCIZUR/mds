from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUT = DOCS / "assets" / "search-index.json"

PATTERN = re.compile(r"^#\s+(.+)$", re.MULTILINE)

def title_from_markdown(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    match = PATTERN.search(text)
    if match:
        return match.group(1).strip()
    return path.stem.replace("-", " ").title()

def main() -> None:
    pages = []
    for path in sorted(DOCS.rglob("*.md")):
        rel = path.relative_to(DOCS).as_posix()
        if rel.startswith("overrides/"):
            continue
        pages.append(
            {
                "title": title_from_markdown(path),
                "path": rel,
            }
        )
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(pages, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUT}")

if __name__ == "__main__":
    main()
