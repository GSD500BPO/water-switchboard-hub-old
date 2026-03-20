#!/usr/bin/env python3
"""
Parse 245 CWT blog .md files from public/blogs/ and generate TypeScript
blog data for the water-treatment-hub site.

Reads: public/blogs/*.md
Writes: src/data/blog/generatedBlogPosts.ts

Each .md file has this structure:
  ## Title
  First paragraph (excerpt)
  ### Section 1
  Content...
  ### Section 2
  Content...
"""

import os
import re
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
BLOGS_DIR = ROOT / "public" / "blogs"
OUTPUT = ROOT / "src" / "data" / "blog" / "generatedBlogPosts.ts"

# Category detection keywords (order matters — first match wins)
CATEGORY_RULES = [
    ("Reverse Osmosis", ["reverse osmosis", "ro system", "ro filter"]),
    ("Water Softeners", ["water softener", "soft water", "softening", "hard water"]),
    ("Filtration Systems", ["filtration", "whole house filter", "water filter", "carbon filter"]),
    ("Water Testing", ["water test", "water quality test", "free water test", "testing"]),
    ("Well Water", ["well water", "well pump", "private well"]),
    ("Water Quality", ["water quality", "contaminant", "tds", "dissolved solids", "chlorine"]),
    ("Health & Safety", ["health", "safe drinking", "lead", "pfas", "bacteria"]),
    ("City Water", ["municipal", "city water", "tap water", "public water"]),
    ("Maintenance", ["maintenance", "repair", "service", "annual"]),
    ("Buying Guide", ["buying", "cost", "price", "compare", "vs"]),
]


def detect_category(title: str, content: str) -> str:
    """Detect blog category from title and content keywords."""
    text = (title + " " + content[:1000]).lower()
    for cat_name, keywords in CATEGORY_RULES:
        for kw in keywords:
            if kw in text:
                return cat_name
    return "Water Quality"  # default


def extract_keywords(title: str, content: str, city: str, state: str) -> list:
    """Extract SEO keywords from content."""
    keywords = set()
    text = (title + " " + content[:2000]).lower()

    kw_patterns = [
        "water softener", "reverse osmosis", "water filter",
        "whole house filtration", "water treatment", "water testing",
        "hard water", "well water", "water quality", "water purification",
        "uv sterilization", "iron removal", "alkaline water",
        "water softener installation", "drinking water",
    ]
    for kw in kw_patterns:
        if kw in text:
            keywords.add(kw)

    if city:
        keywords.add(f"water treatment {city.replace('-', ' ')}")
    if state:
        keywords.add(f"water treatment {state.replace('-', ' ')}")

    return sorted(keywords)[:8]


def parse_md_file(filepath: Path) -> dict | None:
    """Parse a markdown blog file into structured data."""
    text = filepath.read_text(encoding="utf-8").strip()
    if not text:
        return None

    lines = text.split("\n")

    # Extract H2 title
    title = ""
    content_start = 0
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("## "):
            title = stripped[3:].strip()
            content_start = i + 1
            break

    if not title:
        # Fallback: use first non-empty line
        for i, line in enumerate(lines):
            if line.strip():
                title = line.strip().lstrip("#").strip()
                content_start = i + 1
                break

    if not title:
        return None

    # Parse sections (H3 headers)
    sections = []
    current_section = None
    excerpt_lines = []
    in_preamble = True

    for line in lines[content_start:]:
        stripped = line.strip()
        if stripped.startswith("### "):
            in_preamble = False
            if current_section:
                sections.append(current_section)
            current_section = {
                "title": stripped[4:].strip(),
                "content": "",
            }
        elif current_section is not None:
            if current_section["content"]:
                current_section["content"] += "\n" + line
            else:
                if stripped:
                    current_section["content"] = line
        elif in_preamble and stripped:
            excerpt_lines.append(stripped)

    if current_section:
        sections.append(current_section)

    # Clean section content
    for s in sections:
        s["content"] = s["content"].strip()

    # Build excerpt from preamble
    excerpt = " ".join(excerpt_lines)
    if len(excerpt) > 300:
        excerpt = excerpt[:297] + "..."

    # Full content = preamble text
    content = "\n\n".join(excerpt_lines)

    # Slug from filename
    slug = filepath.stem

    # Try to detect city/state from slug
    city = ""
    state = ""
    known_cities = {
        "miami": "florida", "jacksonville": "florida", "phoenix": "arizona",
        "el-paso": "texas", "new-york": "new-york", "chicago": "illinois",
        "denver": "colorado", "las-vegas": "nevada", "sacramento": "california",
        "san-antonio": "texas", "dallas": "texas", "houston": "texas",
        "austin": "texas", "san-diego": "california", "los-angeles": "california",
        "atlanta": "georgia", "salt-lake-city": "utah", "ogden": "utah",
        "provo": "utah", "st-george": "utah",
    }
    slug_lower = slug.lower()
    for c, s in known_cities.items():
        if c in slug_lower:
            city = c
            state = s
            break

    # Word count → read time
    word_count = len(text.split())
    read_minutes = max(2, round(word_count / 200))

    category = detect_category(title, text)
    keywords = extract_keywords(title, text, city, state)

    return {
        "slug": slug,
        "title": title,
        "excerpt": excerpt if excerpt else title,
        "date": "2026-03-17",
        "author": "CWT Editorial Team",
        "category": category,
        "image": "",
        "readTime": f"{read_minutes} min read",
        "content": content if content else excerpt,
        "sections": sections,
        "keywords": keywords,
        "city": city,
        "state": state,
    }


def escape_ts_string(s: str) -> str:
    """Escape string for TypeScript template literal."""
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def generate_ts(posts: list) -> str:
    """Generate TypeScript file content."""
    lines = [
        "// AUTO-GENERATED by scripts/generate-blog-data.py",
        "// Do not edit manually. Regenerate with: python3 scripts/generate-blog-data.py",
        "",
        "import { BlogPost } from './types';",
        "",
        f"export const generatedBlogPosts: BlogPost[] = [",
    ]

    for i, post in enumerate(posts):
        post_id = i + 100  # Start at 100 to avoid collision with manual posts (1-99)
        sections_str = json.dumps(post["sections"], ensure_ascii=False)
        keywords_str = json.dumps(post["keywords"], ensure_ascii=False)

        lines.append(f"  {{")
        lines.append(f"    id: {post_id},")
        lines.append(f"    slug: {json.dumps(post['slug'])},")
        lines.append(f"    title: {json.dumps(post['title'])},")
        lines.append(f"    excerpt: {json.dumps(post['excerpt'])},")
        lines.append(f"    date: {json.dumps(post['date'])},")
        lines.append(f"    author: {json.dumps(post['author'])},")
        lines.append(f"    category: {json.dumps(post['category'])},")
        lines.append(f"    image: {json.dumps(post['image'])},")
        lines.append(f"    readTime: {json.dumps(post['readTime'])},")
        lines.append(f"    content: {json.dumps(post['content'])},")
        lines.append(f"    sections: {sections_str},")
        lines.append(f"    keywords: {keywords_str},")
        lines.append(f"  }},")

    lines.append("];")
    lines.append("")
    return "\n".join(lines)


def main():
    md_files = sorted(BLOGS_DIR.glob("*.md"))
    print(f"Found {len(md_files)} blog .md files in {BLOGS_DIR}")

    posts = []
    skipped = 0
    for f in md_files:
        parsed = parse_md_file(f)
        if parsed:
            posts.append(parsed)
        else:
            print(f"  SKIP (empty/no title): {f.name}")
            skipped += 1

    # Sort by slug for stable output
    posts.sort(key=lambda p: p["slug"])

    ts_content = generate_ts(posts)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(ts_content, encoding="utf-8")

    # Category stats
    from collections import Counter
    cats = Counter(p["category"] for p in posts)

    print(f"\nGenerated: {OUTPUT}")
    print(f"  Posts: {len(posts)}")
    print(f"  Skipped: {skipped}")
    print(f"\n  Categories:")
    for cat, count in cats.most_common():
        print(f"    {cat}: {count}")


if __name__ == "__main__":
    main()
