# Public Employee Portal Cleanup Design

## Goal

Improve the Parkcrest employee portal as a public, read-first resource site for hundreds of employees while keeping the live deployment low risk.

## Approved Direction

The portal remains public. Employees can choose their company, read company-specific resources, download documents, and contact the appropriate team. The public site must not accept file uploads in this pass.

## Safety Rules

- Keep the site static and simple.
- Do not add public upload fields.
- Do not store submitted files in the repository, GitHub Pages, or public web folders.
- If uploads are needed later, use a protected workflow with authentication, file type limits, file size limits, malware scanning, and private storage.
- Deploy only after preview approval.

## User Experience

The homepage should make company selection clear and fast. Company pages should consistently present three primary actions: Contact / HR Help, Benefits, and Tax & Labor Law Documents. Document pages should use plain English labels and be easy to scan on mobile.

## Technical Design

The site remains static HTML and CSS. Shared styling should live in `styles.css` so visual fixes can be made once instead of repeated across every page. The first implementation pass focuses on navigation/link correctness, consistent read-only language, mobile polish, and documentation updates.

## Deployment Model

The repository contains a `CNAME` file for `parkcrestinc.com`, so the current model appears to be GitHub Pages with a custom domain. Cloudflare may be used for DNS or later migrated to Cloudflare Pages, but the first cleanup pass should not change hosting.
