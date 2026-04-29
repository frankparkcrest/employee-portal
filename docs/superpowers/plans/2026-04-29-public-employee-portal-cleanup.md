# Public Employee Portal Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the public Parkcrest employee portal with safer read-only language, consistent navigation, cleaned documentation, and local verification.

**Architecture:** Keep the current static HTML/CSS architecture. Make the smallest high-ROI changes first: fix incorrect links, remove stale upload-oriented guidance, add explicit public/read-only expectations, and consolidate visible UI language around employee resources.

**Tech Stack:** Static HTML, CSS, GitHub Pages custom domain, Python local HTTP server for preview.

---

## File Structure

- Modify `index.html`: improve homepage language and add a no-upload/read-only support note.
- Modify company pages: `andys-xpress-wash.html`, `ampm.html`, `archibalds.html`, `parkcrest-properties.html`.
- Modify resource/contact pages as needed for safe wording and link consistency.
- Modify `README.md` and `QUICK-START.md`: update stale instructions to match the current public static portal.
- Add `scripts/check-links.py`: verify local internal links point to files that exist.

## Task 1: Add Internal Link Verification

**Files:**
- Create: `scripts/check-links.py`

- [ ] **Step 1: Write the failing verification script**

Create `scripts/check-links.py`:

```python
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import sys


ROOT = Path(__file__).resolve().parents[1]


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "img" and attrs.get("src"):
            self.links.append(attrs["src"])


def is_internal(link):
    parsed = urlparse(link)
    if parsed.scheme in {"http", "https", "mailto", "tel"}:
        return False
    return bool(link) and not link.startswith("#")


def target_exists(source, link):
    parsed = urlparse(link)
    path = unquote(parsed.path)
    if not path:
        return True
    target = (source.parent / path).resolve()
    try:
        target.relative_to(ROOT)
    except ValueError:
        return False
    return target.exists()


def main():
    failures = []
    for html_file in sorted(ROOT.glob("*.html")):
        parser = LinkParser()
        parser.feed(html_file.read_text(encoding="utf-8"))
        for link in parser.links:
            if is_internal(link) and not target_exists(html_file, link):
                failures.append(f"{html_file.name}: missing target {link}")

    if failures:
        print("Broken internal links found:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("All internal links point to existing files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 2: Run verification**

Run: `python3 scripts/check-links.py`

Expected: It may fail if broken internal links exist. Record the broken links before fixing them.

## Task 2: Fix Navigation and Read-Only Safety Language

**Files:**
- Modify: all root `.html` pages where navigation or contact/resource language is stale or inconsistent.

- [ ] **Step 1: Fix incorrect company dropdown targets**

Search for links where Archibald's points to Andy's page:

```bash
rg "Archibald.*andys-xpress-wash|andys-xpress-wash.html.*Archibald" *.html
```

Replace those targets with `archibalds.html`.

- [ ] **Step 2: Add public read-only guidance**

Add concise language where employees will see it:

```html
<p class="portal-note">This public portal provides read-only employee resources. For document submissions or personal employment questions, contact your manager or HR representative directly.</p>
```

Use this on the homepage and contact pages. Do not add upload inputs.

- [ ] **Step 3: Run link verification**

Run: `python3 scripts/check-links.py`

Expected: `All internal links point to existing files.`

## Task 3: Improve Shared Styling for the First Pass

**Files:**
- Modify: `styles.css`
- Modify: pages that use shared note classes.

- [ ] **Step 1: Add reusable public portal styling**

Add shared CSS for `.portal-note`, `.quick-actions`, `.resource-list`, and focus-visible states.

- [ ] **Step 2: Apply classes where needed**

Use the shared classes on homepage/contact/resource pages without changing the portal's basic content model.

- [ ] **Step 3: Run link verification**

Run: `python3 scripts/check-links.py`

Expected: `All internal links point to existing files.`

## Task 4: Update Documentation

**Files:**
- Modify: `README.md`
- Modify: `QUICK-START.md`

- [ ] **Step 1: Replace stale scaffold instructions**

Update docs to describe the current site, current files, public/read-only policy, local preview, and deployment approval rule.

- [ ] **Step 2: Run documentation scan**

Run:

```bash
rg "placeholder|Create this folder|logo.png|purple|upload capabilities|backend processing|TODO|TBD" README.md QUICK-START.md
```

Expected: No stale scaffold guidance remains, except where explaining that public uploads are intentionally not supported.

## Task 5: Preview and Final Verification

**Files:**
- No additional file changes expected.

- [ ] **Step 1: Run internal link check**

Run: `python3 scripts/check-links.py`

Expected: `All internal links point to existing files.`

- [ ] **Step 2: Start local preview**

Run: `python3 -m http.server 8080`

Expected: local site available at `http://localhost:8080`.

- [ ] **Step 3: Browser preview**

Open `http://localhost:8080/index.html` in the Codex in-app browser. Check homepage, at least one company page, one benefits page, one tax/labor page, and one contact page.

- [ ] **Step 4: Review diff**

Run: `git diff --stat` and `git diff --check`.

Expected: focused HTML/CSS/docs/script changes and no whitespace errors.
