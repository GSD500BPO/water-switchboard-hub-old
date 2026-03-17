#!/usr/bin/env python3
"""
Generate sitemap.xml from companies.json for communitywatertest.org.
Also generates a URL list for Google indexing.

Includes: static, state, city, company, service+city, best-of,
water quality, and water problem pages.

Usage:
    python3 scripts/generate-sitemap.py
"""

import json
from datetime import datetime, timezone
from pathlib import Path

BASE_URL = "https://communitywatertest.org"
COMPANIES_JSON = Path(__file__).parent.parent / "src" / "data" / "companies.json"
OUTPUT_SITEMAP = Path(__file__).parent.parent / "public" / "sitemap.xml"
OUTPUT_URLS = Path(__file__).parent.parent / "scripts" / "urls.txt"

# Must match seoData.ts SERVICES
SERVICES = [
    "water-softener", "reverse-osmosis", "whole-house-filtration",
    "alkaline-water", "uv-sterilization", "iron-removal",
    "water-testing", "well-water", "commercial",
]

SERVICE_KEYS = {
    "water-softener": "water_softener",
    "reverse-osmosis": "reverse_osmosis",
    "whole-house-filtration": "whole_house_filtration",
    "alkaline-water": "alkaline_water",
    "uv-sterilization": "uv_sterilization",
    "iron-removal": "iron_removal",
    "water-testing": "water_testing",
    "well-water": "well_water",
    "commercial": "commercial",
}

# Must match seoData.ts WATER_PROBLEMS
WATER_PROBLEMS = [
    "hard-water", "chlorine-taste", "lead-contamination",
    "iron-staining", "bad-taste-odor", "well-water-problems",
    "scale-buildup", "contaminants",
]


def main():
    with open(COMPANIES_JSON) as f:
        data = json.load(f)

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    urls = []

    # Static pages
    urls.append({"loc": BASE_URL, "priority": "1.0", "changefreq": "weekly"})
    urls.append({"loc": f"{BASE_URL}/schedule-test", "priority": "0.9", "changefreq": "monthly"})
    urls.append({"loc": f"{BASE_URL}/scam-alerts", "priority": "0.6", "changefreq": "monthly"})

    service_city_count = 0
    best_of_count = 0
    water_quality_count = 0
    problem_count = 0

    for state_slug, state_data in data["states"].items():
        # State page
        urls.append({
            "loc": f"{BASE_URL}/water-treatment/{state_slug}",
            "priority": "0.8",
            "changefreq": "weekly",
        })

        for city_slug, city_data in state_data["cities"].items():
            # City page
            urls.append({
                "loc": f"{BASE_URL}/water-treatment/{state_slug}/{city_slug}",
                "priority": "0.7",
                "changefreq": "weekly",
            })

            # Best-of page per city
            rated = [c for c in city_data["companies"] if c.get("googleRating")]
            if rated:
                urls.append({
                    "loc": f"{BASE_URL}/best-water-treatment/{state_slug}/{city_slug}",
                    "priority": "0.7",
                    "changefreq": "monthly",
                })
                best_of_count += 1

            # Water quality report per city
            urls.append({
                "loc": f"{BASE_URL}/water-quality/{city_slug}",
                "priority": "0.7",
                "changefreq": "monthly",
            })
            water_quality_count += 1

            # Service+City pages (only if companies offer that service)
            all_services_in_city = set()
            for company in city_data["companies"]:
                for svc in company.get("services", []):
                    all_services_in_city.add(svc)

            for svc_slug, svc_key in SERVICE_KEYS.items():
                if svc_key in all_services_in_city:
                    urls.append({
                        "loc": f"{BASE_URL}/water-treatment/{state_slug}/{city_slug}/services/{svc_slug}",
                        "priority": "0.6",
                        "changefreq": "monthly",
                    })
                    service_city_count += 1

            # Water problem pages per city
            for problem_slug in WATER_PROBLEMS:
                urls.append({
                    "loc": f"{BASE_URL}/water-problems/{state_slug}/{city_slug}/{problem_slug}",
                    "priority": "0.5",
                    "changefreq": "monthly",
                })
                problem_count += 1

            # Company pages
            for company in city_data["companies"]:
                slug = company.get("slug", "")
                if slug:
                    urls.append({
                        "loc": f"{BASE_URL}/water-treatment/{state_slug}/{city_slug}/{slug}",
                        "priority": "0.6",
                        "changefreq": "monthly",
                    })

    # Generate sitemap XML
    xml_parts = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml_parts.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for url in urls:
        xml_parts.append("  <url>")
        xml_parts.append(f"    <loc>{url['loc']}</loc>")
        xml_parts.append(f"    <lastmod>{now}</lastmod>")
        xml_parts.append(f"    <changefreq>{url['changefreq']}</changefreq>")
        xml_parts.append(f"    <priority>{url['priority']}</priority>")
        xml_parts.append("  </url>")
    xml_parts.append("</urlset>")

    OUTPUT_SITEMAP.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_SITEMAP.write_text("\n".join(xml_parts))

    # Generate URL list for indexing
    OUTPUT_URLS.write_text("\n".join(u["loc"] for u in urls))

    # Stats
    state_count = len(data["states"])
    city_count = sum(len(s["cities"]) for s in data["states"].values())
    company_count = sum(
        len(c["companies"])
        for s in data["states"].values()
        for c in s["cities"].values()
    )

    print(f"Sitemap: {OUTPUT_SITEMAP} ({len(urls)} URLs)")
    print(f"URL list: {OUTPUT_URLS}")
    print(f"  Static pages:     3")
    print(f"  State pages:      {state_count}")
    print(f"  City pages:       {city_count}")
    print(f"  Company pages:    {company_count}")
    print(f"  Service+City:     {service_city_count}")
    print(f"  Best-of:          {best_of_count}")
    print(f"  Water quality:    {water_quality_count}")
    print(f"  Water problems:   {problem_count}")
    print(f"  ──────────────────")
    print(f"  TOTAL:            {len(urls)}")


if __name__ == "__main__":
    main()
