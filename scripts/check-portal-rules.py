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
    homepage_links = {}

    for html_file in sorted(ROOT.glob("*.html")):
        parser = PortalParser()
        parser.feed(html_file.read_text(encoding="utf-8"))
        if html_file.name == "index.html":
            homepage_links = {
                " ".join(link["text"].split()).lower(): link["href"]
                for link in parser.links
            }

        if parser.file_inputs:
            failures.append(f"{html_file.name}: public file upload input is not allowed")

        for link in parser.links:
            text = " ".join(link["text"].split()).lower()
            href = link["href"]
            if text == "archibald's" and href != "archibalds.html":
                failures.append(
                    f"{html_file.name}: Archibald's link points to {href}"
                )

    required_homepage_links = {
        "andy's xpress wash contact": "contact-form-andys.html",
        "andy's xpress wash benefits": "benefits-andys.html",
        "andy's xpress wash tax & labor": "tax-labor-andys.html",
        "ampm contact": "contact-form-ampm.html",
        "ampm benefits": "benefits-ampm.html",
        "ampm tax & labor": "tax-labor-ampm.html",
        "archibald's contact": "contact-form-archibalds.html",
        "archibald's benefits": "benefits-archibalds.html",
        "archibald's tax & labor": "tax-labor-archibalds.html",
        "parkcrest properties contact": "contact-form-parkcrest.html",
        "parkcrest properties benefits": "benefits-parkcrest.html",
        "parkcrest properties tax & labor": "tax-labor-parkcrest.html",
    }

    for text, href in required_homepage_links.items():
        if homepage_links.get(text) != href:
            failures.append(f"index.html: missing quick link {text} -> {href}")

    if failures:
        print("Portal rule violations found:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Portal rules passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
