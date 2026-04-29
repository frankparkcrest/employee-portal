# Quick Start

## Preview the Site

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080/index.html
```

## Before You Deploy

Run:

```bash
python3 scripts/check-links.py
python3 scripts/check-portal-rules.py
```

Expected output:

```text
All internal links point to existing files.
Portal rules passed.
```

## Editing Guidelines

- Keep the portal public and read-only.
- Do not add public file upload fields.
- Add employee documents to `docs/`.
- Add logos and images to `assets/`.
- Keep company navigation consistent across pages.
- Preview on desktop and mobile before production deployment.

## Deployment Rule

Deploy only after the preview has been reviewed and approved.
