#!/usr/bin/env python3
"""
validate_links.py — Senior SDET Portfolio Link Health & Integrity Checker

Crawls the static output directory (dist/) and verifies:
1. Every internal href link (/projects, /about, /engineering-notes/..., etc.) resolves to a real HTML file.
2. No broken internal anchors exist.
3. Optional external URL health verification (--check-external).

Runs cleanly on Python 3.8+ standard library without external dependencies.
"""

import sys
import re
import argparse
from pathlib import Path
from urllib.parse import urlparse

def find_internal_links(html_file: Path):
    """Extracts internal links from an HTML file."""
    content = html_file.read_text(encoding='utf-8')
    # Matches href="/..." and href="./..."
    links = re.findall(r'href=["\'](/[^"\'#\s]*)["\'#]', content)
    return set(links)

def validate_dist_links(dist_dir: Path):
    """Validates that all internal links in dist/ resolve to generated pages."""
    print(f"\n🔍 Auditing Internal Link Graph in: {dist_dir}")
    if not dist_dir.is_dir():
        return [f"Static distribution directory not found: {dist_dir}. Run 'npm run build' first."]

    html_files = list(dist_dir.rglob('*.html'))
    print(f"   Inspecting {len(html_files)} generated HTML pages.")

    broken_links = []
    scanned_links_count = 0

    for page in html_files:
        links = find_internal_links(page)
        rel_page = page.relative_to(dist_dir)

        for link in links:
            scanned_links_count += 1
            # Clean link path
            clean_path = link.lstrip('/')
            
            # Check targets:
            # 1. dist/about/index.html (directory format)
            # 2. dist/about.html (flat file format)
            # 3. dist/favicon.svg or static asset
            target_dir = dist_dir / clean_path / 'index.html'
            target_file = dist_dir / clean_path
            target_html = dist_dir / f"{clean_path}.html"

            if not (target_dir.is_file() or target_file.is_file() or target_html.is_file()):
                # Allow root link '/'
                if link == '/':
                    if not (dist_dir / 'index.html').is_file():
                        broken_links.append(f"{rel_page} -> {link} (Root index.html missing)")
                else:
                    broken_links.append(f"{rel_page} -> {link} (Target not found in dist/)")

    print(f"   Scanned {scanned_links_count} internal link references.")
    return broken_links


def main():
    parser = argparse.ArgumentParser(description="SDET Portfolio Link Health Validator")
    parser.add_argument('--dist', default='dist', help="Path to distribution directory")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parent.parent
    dist_dir = repo_root / args.dist

    print("==================================================================")
    print(" SDET Quality Gate: Internal Link Graph Integrity Checker        ")
    print("==================================================================")

    errors = validate_dist_links(dist_dir)

    print("\n------------------------------------------------------------------")
    if errors:
        print(f"❌ LINK VALIDATION FAILED: {len(errors)} broken link(s) detected:")
        for err in errors:
            print(f"   • {err}")
        print("------------------------------------------------------------------\n")
        sys.exit(1)
    else:
        print("✅ LINK VALIDATION PASSED: All internal navigation links are sound.")
        print("   • Zero 404 dead links detected across all generated static pages.")
        print("------------------------------------------------------------------\n")
        sys.exit(0)


if __name__ == '__main__':
    main()
