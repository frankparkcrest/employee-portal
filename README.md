# Parkcrest Employee Portal

Public employee resource portal for Parkcrest Properties and related companies.

## Companies

- Andy's Xpress Wash
- AMPM
- Archibald's
- Parkcrest Properties

## Purpose

The portal helps employees quickly find company-specific resources:

- Contact / HR help
- Benefits documents
- Tax and labor law documents

The site is intentionally public and read-only. Employees should not submit documents, medical records, Social Security numbers, or sensitive files through this public portal.

## Project Structure

```text
/
├── index.html
├── styles.css
├── andys-xpress-wash.html
├── ampm.html
├── archibalds.html
├── parkcrest-properties.html
├── contact-form-*.html
├── benefits-*.html
├── tax-labor-*.html
├── assets/
├── docs/
└── scripts/
```

## Local Preview

Run a simple local server from the repository root:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080/index.html
```

## Verification

Check that internal links point to existing files:

```bash
python3 scripts/check-links.py
```

Check portal safety/content rules:

```bash
python3 scripts/check-portal-rules.py
```

Both commands should pass before deploying changes.

## Public Upload Policy

Do not add public file upload fields to this site.

If employee document submission is needed later, use a protected workflow with authentication, file type limits, file size limits, malware scanning, and private storage. Do not store employee-submitted files in this repository or any public web folder.

## Deployment

The repository includes a `CNAME` file for:

```text
parkcrestinc.com
```

This indicates the current site is set up for a custom domain, likely through GitHub Pages with DNS managed separately. Production deployment should happen only after preview approval.
