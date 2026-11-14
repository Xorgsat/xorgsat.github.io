#!/usr/bin/env python3
"""
validate_content.py — Senior SDET Portfolio Content Integrity Validator

Performs automated pre-commit and CI verification:
1. Asserts exactly 12 project case studies exist in src/content/projects/.
2. Validates frontmatter attributes (title, description, category, status, URL format).
3. Asserts engineering notes contain required metadata and non-empty content.
4. Distinguishes completed projects from in-development/planned projects.

Zero external dependencies — runs on Python 3.8+ standard library.
"""

import os
import sys
import re
from pathlib import Path

VALID_PROJECT_CATEGORIES = {
    'UI & E2E Automation',
    'API & Backend Quality',
    'Mobile Automation',
    'Performance Engineering',
    'Test Infrastructure',
    'Enterprise Systems',
    'Commercial Project',
}

VALID_PROJECT_TYPES = {
    'Independent Framework',
    'Commercial Production',
    'Demonstration Architecture',
    'Experimental Prototype',
}

VALID_STATUSES = {'Completed', 'In Development', 'Planned', 'Archived'}

VALID_ARTICLE_CATEGORIES = {
    'Automation Architecture',
    'Test Reliability',
    'API Quality',
    'CI/CD & DevOps',
    'Performance Engineering',
    'Quality Strategy',
}


def parse_frontmatter(file_path: Path):
    """Simple, robust YAML frontmatter parser for markdown files."""
    content = file_path.read_text(encoding='utf-8')
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if not match:
        return {}, content

    raw_yaml, body = match.groups()
    metadata = {}
    current_key = None

    for line in raw_yaml.splitlines():
        line = line.rstrip()
        if not line or line.startswith('#'):
            continue

        # List item continuation
        if line.startswith('  - ') or line.startswith('- '):
            item = line.lstrip(' -').strip().strip('"\'')
            if current_key and isinstance(metadata.get(current_key), list):
                metadata[current_key].append(item)
            continue

        # Key-Value pair
        if ':' in line:
            parts = line.split(':', 1)
            key = parts[0].strip()
            val = parts[1].strip()
            current_key = key

            # Empty value might indicate start of a list
            if not val:
                metadata[key] = []
            elif val.startswith('[') and val.endswith(']'):
                # Inline list format e.g. ['a', 'b']
                items = [i.strip().strip('"\'') for i in val[1:-1].split(',') if i.strip()]
                metadata[key] = items
            else:
                metadata[key] = val.strip('"\'')

    return metadata, body


def validate_projects(projects_dir: Path):
    """Validates the 12 portfolio projects."""
    print(f"\n🔍 [1/2] Auditing Project Catalog in: {projects_dir}")
    errors = []
    
    if not projects_dir.is_dir():
        return [f"Directory not found: {projects_dir}"]

    project_files = sorted([f for f in projects_dir.glob('*.md')])
    total_projects = len(project_files)
    print(f"   Found {total_projects} project markdown files.")

    if total_projects != 12:
        errors.append(f"Expected exactly 12 portfolio entries as mandated by Project Charter, found {total_projects}.")

    for pf in project_files:
        meta, body = parse_frontmatter(pf)
        rel_path = pf.name

        # Check required fields
        required_fields = [
            'title', 'description', 'category', 'projectType',
            'status', 'repositoryUrl', 'businessProblem', 'engineeringFocus', 'techStack'
        ]
        for field in required_fields:
            if field not in meta or not meta[field]:
                errors.append(f"{rel_path}: Missing or empty required field '{field}'")

        # Validate category enum
        cat = meta.get('category')
        if cat and cat not in VALID_PROJECT_CATEGORIES:
            errors.append(f"{rel_path}: Invalid category '{cat}'")

        # Validate status enum
        status = meta.get('status')
        if status and status not in VALID_STATUSES:
            errors.append(f"{rel_path}: Invalid status '{status}'")

        # Validate projectType enum
        ptype = meta.get('projectType')
        if ptype and ptype not in VALID_PROJECT_TYPES:
            errors.append(f"{rel_path}: Invalid projectType '{ptype}'")

        # Validate repository URL
        repo_url = meta.get('repositoryUrl', '')
        if repo_url and not (repo_url.startswith('https://') or repo_url.startswith('http://')):
            errors.append(f"{rel_path}: repositoryUrl must be a valid HTTP(S) URL. Found: '{repo_url}'")

        # Validate case-study content length
        if len(body.strip()) < 100:
            errors.append(f"{rel_path}: Case study content is too brief (< 100 characters).")

    return errors


def validate_engineering_notes(notes_dir: Path):
    """Validates technical articles and engineering notes."""
    print(f"\n🔍 [2/2] Auditing Engineering Notes in: {notes_dir}")
    errors = []

    if not notes_dir.is_dir():
        return [f"Directory not found: {notes_dir}"]

    note_files = sorted([f for f in notes_dir.glob('*.md')])
    print(f"   Found {len(note_files)} engineering note markdown files.")

    if len(note_files) == 0:
        errors.append("No engineering notes found in directory.")

    for nf in note_files:
        meta, body = parse_frontmatter(nf)
        rel_path = nf.name

        required_fields = ['title', 'publishDate', 'summary', 'category', 'tags']
        for field in required_fields:
            if field not in meta or not meta[field]:
                errors.append(f"{rel_path}: Missing or empty required field '{field}'")

        cat = meta.get('category')
        if cat and cat not in VALID_ARTICLE_CATEGORIES:
            errors.append(f"{rel_path}: Invalid category '{cat}'")

        if len(body.strip()) < 150:
            errors.append(f"{rel_path}: Article body is too brief (< 150 characters).")

    return errors


def main():
    repo_root = Path(__file__).resolve().parent.parent
    projects_dir = repo_root / 'src' / 'content' / 'projects'
    notes_dir = repo_root / 'src' / 'content' / 'engineering-notes'

    print("==================================================================")
    print(" SDET Quality Gate: Content & Schema Completeness Verification   ")
    print("==================================================================")

    all_errors = []
    all_errors.extend(validate_projects(projects_dir))
    all_errors.extend(validate_engineering_notes(notes_dir))

    print("\n------------------------------------------------------------------")
    if all_errors:
        print(f"❌ VALIDATION FAILED: {len(all_errors)} error(s) discovered:")
        for err in all_errors:
            print(f"   • {err}")
        print("------------------------------------------------------------------\n")
        sys.exit(1)
    else:
        print("✅ VALIDATION PASSED: All 12 projects & engineering notes verified.")
        print("   • Exactly 12 projects cataloged.")
        print("   • All metadata schemas, enums, and URLs validated.")
        print("   • All case studies and technical articles meet length standards.")
        print("------------------------------------------------------------------\n")
        sys.exit(0)


if __name__ == '__main__':
    main()
