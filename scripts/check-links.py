from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
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
