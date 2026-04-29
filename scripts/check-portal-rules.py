from html.parser import HTMLParser
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]


class PortalParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.file_inputs = []
        self._current_anchor = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a":
            self._current_anchor = {"href": attrs.get("href", ""), "text": ""}
        if tag == "input" and attrs.get("type", "").lower() == "file":
            self.file_inputs.append(attrs)

    def handle_data(self, data):
        if self._current_anchor is not None:
            self._current_anchor["text"] += data

    def handle_endtag(self, tag):
        if tag == "a" and self._current_anchor is not None:
            self.links.append(self._current_anchor)
            self._current_anchor = None


def main():
    failures = []

    for html_file in sorted(ROOT.glob("*.html")):
        parser = PortalParser()
        parser.feed(html_file.read_text(encoding="utf-8"))

        if parser.file_inputs:
            failures.append(f"{html_file.name}: public file upload input is not allowed")

        for link in parser.links:
            text = " ".join(link["text"].split()).lower()
            href = link["href"]
            if "archibald" in text and href != "archibalds.html":
                failures.append(
                    f"{html_file.name}: Archibald's link points to {href}"
                )

    if failures:
        print("Portal rule violations found:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Portal rules passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
