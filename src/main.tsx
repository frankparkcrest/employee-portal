import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Download,
  FileCheck2,
  FileText,
  Folder,
  HeartPulse,
  Phone,
  PlayCircle,
  Search,
} from "lucide-react";
import { filterResourceItems, type ResourceSearchItem } from "./resourceSearch";
import {
  filterSafetyDocuments,
  groupAvailableSafetyDocuments,
  type SafetyLibraryDocument,
} from "./safetyLibrary";
import "./styles.css";

type Company = {
  name: string;
  slug: string;
  logo: string;
  home: string;
  contact: string;
  benefits: string;
  taxLabor: string;
};

type DocumentLink = {
  title: string;
  href?: string;
  note?: string;
  company?: string;
  status?: "Available" | "Pending";
};

type ContactLocation = {
  group: string;
  city: string;
  rows: Array<[string, string]>;
};

const portalNote =
  "For document submissions or personal employment questions, contact your manager or HR representative directly.";

const companies: Company[] = [
  {
    name: "Andy's Xpress Wash",
    slug: "andys",
    logo: "assets/andys-xpress-wash-logo.png",
    home: "andys-xpress-wash.html",
    contact: "contact-form-andys.html",
    benefits: "benefits-andys.html",
    taxLabor: "tax-labor-andys.html",
  },
  {
    name: "AMPM",
    slug: "ampm",
    logo: "assets/ampm-logo.png",
    home: "ampm.html",
    contact: "contact-form-ampm.html",
    benefits: "benefits-ampm.html",
    taxLabor: "tax-labor-ampm.html",
  },
  {
    name: "Archibald's",
    slug: "archibalds",
    logo: "assets/archibalds-logo.png",
    home: "archibalds.html",
    contact: "contact-form-archibalds.html",
    benefits: "benefits-archibalds.html",
    taxLabor: "tax-labor-archibalds.html",
  },
  {
    name: "Parkcrest Properties",
    slug: "parkcrest",
    logo: "assets/parkcrest-properties-logo.png",
    home: "parkcrest-properties.html",
    contact: "contact-form-parkcrest.html",
    benefits: "benefits-parkcrest.html",
    taxLabor: "tax-labor-parkcrest.html",
  },
];

const benefitsDocuments: DocumentLink[] = [
  { title: "Cal Saver Employee Benefit", href: "docs/cal-saver-employee-benefit.pdf" },
  { title: "Cal Savers Program Disclosure", href: "docs/cal-savers-program-disclosure.pdf" },
  { title: "Cal Savers Overview", href: "docs/cal-savers-overview.pdf" },
  { title: "Health Coverage", href: "docs/health-coverage.pdf" },
  { title: "CA Paid Family Leave", href: "docs/ca-paid-family-leave.pdf" },
  { title: "CA Family Rights Act", href: "docs/ca-family-rights-act.pdf" },
  { title: "Sick Leave Policy", href: "docs/sick-leave-policy.pdf" },
];

const taxLaborDocuments: DocumentLink[] = [
  { title: "W-4 Form (English) 2026", href: "docs/w4-form-english-2026.pdf" },
  { title: "W-4 Form (Spanish) 2026", href: "docs/w4-form-spanish-2026.pdf" },
  { title: "CA EDD Form DE-4 (English) 2026", href: "docs/edd-form-de4-english-2026.pdf" },
  { title: "CA EDD Form DE-4 (Spanish) 2026", href: "docs/edd-form-de4-spanish-2026.pdf" },
  {
    title: "I-9 Employment Eligibility Verification (English)",
    href: "docs/i9-employment-eligibility-verification-english.pdf",
  },
  {
    title: "I-9 Employment Eligibility Verification (Spanish)",
    href: "docs/i9-employment-eligibility-verification-spanish.pdf",
  },
  { title: "Know Your Rights Notice (English)", href: "docs/know-your-rights-notice-english.pdf" },
  { title: "Know Your Rights Notice (Spanish)", href: "docs/know-your-rights-notice-spanish.pdf" },
  { title: "Sexual Harassment Fact Sheet", href: "docs/sexual-harassment-fact-sheet.pdf" },
];

const champDocuments: DocumentLink[] = [
  {
    title: "Organizational Announcement Email",
    href: "docs/champ/champ-organizational-announcement-email.docx",
  },
  {
    title: "Spanish Organizational Announcement",
    href: "docs/champ/spanish-champ-plan-organizational-announcement.docx",
  },
  { title: "Why CHAMP Flyer - Spanish", href: "docs/champ/why-champ-flyer-spanish.pdf" },
  { title: "Employee Flyer with Hotline", href: "docs/champ/employee-flyer-with-hotline.png" },
];

const safetyDocuments: DocumentLink[] = [
  {
    title: "Archibald's - CA Workplace Violence Plan",
    href: "docs/safety/archibalds-ca-workplace-violence-plan.pdf",
    company: "Archibald's",
    status: "Available",
  },
  {
    title: "Archibald's - CA Workplace Violence Training",
    href: "docs/safety/archibalds-ca-workplace-violence-training.pdf",
    company: "Archibald's",
    status: "Available",
  },
  {
    title: "AXW - CA Workplace Violence Plan",
    href: "docs/safety/axw-ca-workplace-violence-plan.pdf",
    company: "Andy's Xpress Wash",
    status: "Available",
  },
  {
    title: "AXW - CA Workplace Violence Training",
    href: "docs/safety/axw-ca-workplace-violence-training.pdf",
    company: "Andy's Xpress Wash",
    status: "Available",
  },
  {
    title: "AMPM Workplace Violence Plan",
    note: "I'm still working for the ampm's",
    company: "AMPM",
    status: "Pending",
  },
  {
    title: "Heat Illness",
    note: "Will provide you when it is done",
    status: "Pending",
  },
  {
    title: "Injury and Illness Prevention Plan",
    note: "Document pending",
    status: "Pending",
  },
  {
    title: "Safety and Health Protection On the Job - English",
    href: "docs/safety/safety-and-health-protection-on-the-job-english.pdf",
    status: "Available",
  },
  {
    title: "Safety and Health Protection On the Job - Spanish",
    href: "docs/safety/safety-and-health-protection-on-the-job-spanish.pdf",
    status: "Available",
  },
];

const safetyLibraryDocuments: SafetyLibraryDocument[] = [
  {
    title: "Workplace Violence Plan",
    href: "docs/safety/archibalds-ca-workplace-violence-plan.pdf",
    company: "Archibald's",
    status: "Available",
    category: "Workplace Violence",
  },
  {
    title: "Workplace Violence Training",
    href: "docs/safety/archibalds-ca-workplace-violence-training.pdf",
    company: "Archibald's",
    status: "Available",
    category: "Training",
  },
  {
    title: "Workplace Violence Plan",
    href: "docs/safety/axw-ca-workplace-violence-plan.pdf",
    company: "Andy's Xpress Wash",
    status: "Available",
    category: "Workplace Violence",
  },
  {
    title: "Workplace Violence Training",
    href: "docs/safety/axw-ca-workplace-violence-training.pdf",
    company: "Andy's Xpress Wash",
    status: "Available",
    category: "Training",
  },
  {
    title: "Safety and Health Protection On the Job",
    href: "docs/safety/safety-and-health-protection-on-the-job-english.pdf",
    status: "Available",
    category: "Policies",
    language: "English",
  },
  {
    title: "Safety and Health Protection On the Job",
    href: "docs/safety/safety-and-health-protection-on-the-job-spanish.pdf",
    status: "Available",
    category: "Policies",
    language: "Spanish",
  },
  {
    title: "AMPM Workplace Violence Plan",
    company: "AMPM",
    status: "Pending",
    category: "Pending",
  },
  {
    title: "Heat Illness",
    status: "Pending",
    category: "Pending",
  },
  {
    title: "Injury and Illness Prevention Plan",
    status: "Pending",
    category: "Pending",
  },
];

const safetyFilters = ["All", "Workplace Violence", "Training", "Policies", "Spanish", "Pending"];
const champEducationVideoUrl =
  "https://drive.google.com/file/d/14nL-LjqspS4LQd3SBl9AUDRY8rwA8Whv/view";
const champEducationVideoPreviewUrl =
  "https://drive.google.com/file/d/14nL-LjqspS4LQd3SBl9AUDRY8rwA8Whv/preview";

const nonEmergencyContacts: ContactLocation[] = [
  {
    group: "Archibald's",
    city: "Chino Hills",
    rows: [
      ["Ambulance", "(909) 477-5000"],
      ["Hospital", "PVHMC  (909)  865-9500"],
      ["Fire-Rescue", "(909) 902 -5260"],
      ["Physician", "Kaiser 951-353-4322; Concentra 909-393-7222"],
      ["Police", "(909) 465-6837"],
      ["Cal/Osha", "(909) 383-4334"],
    ],
  },
  {
    group: "Archibald's",
    city: "Menifee",
    rows: [
      ["Ambulance", "AMR (877) 267-6622"],
      ["Hospital", "MGMC (951) 679-8888"],
      ["Fire-Rescue", "MFD (951) 246-6215"],
      ["Physician", "Kaiser 951-353-4322; Concentra 951-600-9070"],
      ["Police", "(951) 677-4964"],
      ["Cal/Osha", "(909) 383-4334"],
    ],
  },
  {
    group: "Archibald's",
    city: "Ontario",
    rows: [
      ["Ambulance", "EMS Bureau 909-395-2529"],
      ["Hospital", "Kaiser: 909-427-3917"],
      ["Fire-Rescue", "(909)983-5911"],
      ["Physician", "Concentra 909-390-2799"],
      ["Police", "(909) 986-6711"],
      ["Cal/Osha", "(909) 383-4334"],
    ],
  },
  {
    group: "Archibald's",
    city: "Victorville",
    rows: [
      ["Ambulance", "AMR 800-474-1777"],
      ["Hospital", "DVMC (760) 241-8000"],
      ["Fire-Rescue", ""],
      ["Physician", "Kaiser: 909-427-3917"],
      ["Police", "(760) 241-2911"],
      ["Cal/Osha", "(909) 383-4334"],
    ],
  },
  {
    group: "Andy's Express Wash/AMPM",
    city: "Chino",
    rows: [
      ["Ambulance", "CPD 909-628-1234"],
      ["Hospital", "CVMC 909-464-8600"],
      ["Fire-Rescue", "(909) 902 -5260"],
      ["Physician", "Concentra 909-393-7222; Kaiser 951-353-4322"],
      ["Police", "(909) 628-1234"],
      ["Cal/Osha", "(909) 383-4334"],
    ],
  },
  {
    group: "Andy's Express Wash/AMPM",
    city: "Menifee",
    rows: [
      ["Ambulance", "AMR 877-267-6622"],
      ["Hospital", "MGMC (951) 679-8888"],
      ["Fire-Rescue", "MFD (951) 246-6215"],
      ["Physician", "Kaiser 951-353-4322; Concentra 951-600-9070"],
      ["Police", "(951) 677-4964"],
      ["Cal/Osha", "(909) 383-4334"],
    ],
  },
  {
    group: "Andy's Express Wash/AMPM",
    city: "Lakewood",
    rows: [
      ["Ambulance", "Premier Ambulance 888-353-9556"],
      ["Hospital", "UCI 562-531-2550"],
      ["Fire-Rescue", "LAFD #122 (562) 421-7713"],
      ["Physician", "Akeso 562-633-2273"],
      ["Police", "(562) 623-3500"],
      ["Cal/Osha", "(562) 590-5048"],
    ],
  },
];

const resourceSearchItems: ResourceSearchItem[] = [
  ...companies.flatMap((company) => [
    {
      title: `${company.name} Contact`,
      type: "Company Resource",
      href: company.contact,
      keywords: [company.name, "contact", "general message", "request follow-up"],
    },
    {
      title: `${company.name} Benefits`,
      type: "Company Resource",
      href: company.benefits,
      keywords: [company.name, "benefits", "leave information", "coverage documents"],
    },
    {
      title: `${company.name} Tax & Labor`,
      type: "Company Resource",
      href: company.taxLabor,
      keywords: [company.name, "tax forms", "employment eligibility", "workplace notices"],
    },
    {
      title: `${company.name} Incident Report`,
      type: "Incident Report",
      href: "incident-report.html",
      keywords: [company.name, "workplace violence", "threats", "safety concerns", "incidents"],
    },
  ]),
  ...benefitsDocuments.map((document) => ({
    title: document.title,
    type: "Benefits Document",
    href: document.href ?? "#resources",
    keywords: ["benefits", "coverage", "leave"],
  })),
  ...taxLaborDocuments.map((document) => ({
    title: document.title,
    type: "Tax and Labor Law Document",
    href: document.href ?? "#resources",
    keywords: ["tax", "labor", "forms", "workplace notices"],
  })),
  ...champDocuments.map((document) => ({
    title: document.title,
    type: "CHAMP Plan Attachment",
    href: document.href ?? "champ-plan.html",
    keywords: ["CHAMP Plan", "Champion Health", "health benefit"],
  })),
  ...safetyDocuments.map((document) => ({
    title: document.title,
    type: document.status === "Pending" ? "Pending Safety Resource" : "Safety Resource",
    href: document.href ?? "#safety",
    keywords: [document.company ?? "", document.note ?? "", "safety", "compliance", "WVP"],
  })),
  ...nonEmergencyContacts.map((location) => ({
    title: `${location.group}: ${location.city}`,
    type: "Non-emergency Contact",
    href: "#contacts",
    keywords: [
      location.group,
      location.city,
      ...location.rows.flatMap(([label, value]) => [label, value]),
    ],
  })),
  {
    title: "CHAMP Plan Effective May 1",
    type: "Health Benefit",
    href: "champ-plan.html",
    keywords: [
      "Champion Health",
      "primary care",
      "urgent care",
      "virtual care",
      "prescription coverage",
      "$0 out-of-pocket cost",
    ],
  },
  {
    title: "Employee Education CHAMP Plan",
    type: "CHAMP Plan Education",
    href: champEducationVideoUrl,
    keywords: ["employee education", "virtual education sessions", "Champion Health", "CHAMP Plan"],
  },
];

function App() {
  const [resourceQuery, setResourceQuery] = useState("");
  const [safetyQuery, setSafetyQuery] = useState("");
  const [safetyFilter, setSafetyFilter] = useState("All");
  const filteredResources = useMemo(
    () => filterResourceItems(resourceSearchItems, resourceQuery).slice(0, 10),
    [resourceQuery],
  );
  const filteredSafetyDocuments = useMemo(
    () => filterSafetyDocuments(safetyLibraryDocuments, safetyQuery, safetyFilter),
    [safetyFilter, safetyQuery],
  );
  const groupedSafetyDocuments = useMemo(
    () => groupAvailableSafetyDocuments(filteredSafetyDocuments),
    [filteredSafetyDocuments],
  );
  const pendingSafetyDocuments = filteredSafetyDocuments.filter(
    (document) => document.status === "Pending",
  );

  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Parkcrest Properties portal home">
          <img src="assets/parkcrest-properties-logo.png" alt="Parkcrest Properties Logo" />
        </a>
        <nav className="main-nav" aria-label="Portal navigation">
          <a href="#resources">Resources</a>
          <a href="#safety">Safety</a>
          <a href="#contacts">Contacts</a>
          <a href="incident-report.html" className="nav-action">
            Report Incident
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Parkcrest Properties</p>
            <h1>Employee Portal</h1>
            <p className="lede">Direct access to company resources, forms, and support contacts.</p>
            <p className="portal-note">{portalNote}</p>
            <div className="hero-actions">
              <a href="#resources" className="primary-button">
                Browse Resources <ArrowRight size={18} />
              </a>
              <a href="#safety" className="secondary-button">
                Safety Documents
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-labelledby="champ-title">
            <div className="panel-kicker">
              <HeartPulse size={18} />
              New Health Benefit
            </div>
            <h2 id="champ-title">CHAMP Plan Effective May 1</h2>
            <p>
              Champion Health's CHAMP Plan is designed to complement existing healthcare coverage,
              with primary care, urgent care, virtual care, preventive care, prescription coverage,
              and covered services with $0 out-of-pocket cost.
            </p>
            <a href="champ-plan.html" className="inline-link">
              View CHAMP Plan <ArrowRight size={16} />
            </a>
          </aside>
        </section>

        <section className="resource-finder" aria-labelledby="resource-finder-title">
          <div className="finder-copy">
            <p className="eyebrow">Resource Finder</p>
            <h2 id="resource-finder-title">Search the portal without knowing where to start.</h2>
            <p>
              Search by company, form, safety topic, city, benefit, or contact type. Results link to
              existing pages and documents.
            </p>
          </div>
          <div className="finder-panel">
            <label htmlFor="resource-search">Search resources</label>
            <div className="search-field">
              <Search size={19} />
              <input
                id="resource-search"
                value={resourceQuery}
                onChange={(event) => setResourceQuery(event.target.value)}
                placeholder="Try WVP, Lakewood, CHAMP, W-4, Archibald's..."
              />
            </div>
            <div className="finder-results" aria-live="polite">
              {filteredResources.map((item) => (
                <a href={item.href} className="finder-result" key={`${item.type}-${item.title}`}>
                  <span>
                    <small>{item.type}</small>
                    <strong>{item.title}</strong>
                  </span>
                  <ArrowRight size={16} />
                </a>
              ))}
              {filteredResources.length === 0 ? (
                <div className="finder-empty">No matching resources found.</div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section-block" id="resources">
          <SectionIntro
            eyebrow="Company Resource Matrix"
            title="Choose the company and resource area you need."
            text="The existing company contact, benefits, tax and labor, and incident report links remain available."
          />
          <div className="company-matrix">
            {companies.map((company) => (
              <article className="company-row" key={company.slug}>
                <a href={company.home} className="company-identity">
                  <span className="logo-frame">
                    <img src={company.logo} alt={company.name} />
                  </span>
                  <span>
                    <strong>{company.name}</strong>
                    <small>Employee resources</small>
                  </span>
                </a>
                <div className="company-actions">
                  <ResourceButton href={company.contact} label="Contact" />
                  <ResourceButton href={company.benefits} label="Benefits" />
                  <ResourceButton href={company.taxLabor} label="Tax & Labor" />
                  <ResourceButton href="incident-report.html" label="Report Incident" emphasis />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="split-section">
          <div className="section-block compact">
            <SectionIntro
              eyebrow="Benefits Documents"
              title="Current benefit resources."
              text="Eligibility depends on your role, hours worked, and length of employment. Review the documents below for official program details."
            />
            <DocumentList documents={benefitsDocuments} />
          </div>
          <div className="section-block compact">
            <SectionIntro
              eyebrow="Tax and Labor Law Documents"
              title="Required workplace and tax resources."
              text="These forms and notices are available for tax withholding, employment eligibility, and required workplace information."
            />
            <DocumentList documents={taxLaborDocuments} />
          </div>
        </section>

        <section className="champ-onboarding">
          <SectionIntro
            eyebrow="CHAMP Plan"
            title="New health insurance benefit."
            text="Effective May 1, Parkcrest will introduce a new health benefit through Champion Health. The CHAMP Plan is designed to complement existing healthcare coverage, not replace it."
          />
          <div className="enrollment-flow">
            <InfoCard title="Eligibility">
              Depending on individual circumstances, some employees may be automatically enrolled,
              while others will have the option to opt in. Specific eligibility and paycheck impact
              information will be provided by Champion Health.
            </InfoCard>
            <InfoCard title="Education Sessions">
              During open enrollment, employees will receive emails from Champion Health with
              additional details and optional virtual education sessions. Meeting links will be
              shared by email once scheduled.
            </InfoCard>
          </div>
          <article className="education-video-section" aria-labelledby="champ-education-video">
            <div className="education-video-copy">
              <span className="video-icon">
                <PlayCircle size={20} />
              </span>
              <p className="eyebrow">Employee Education</p>
              <h3 id="champ-education-video">Employee Education CHAMP Plan</h3>
              <p>Watch the CHAMP Plan employee education video or open the file directly.</p>
            </div>
            <iframe
              allow="autoplay; fullscreen"
              allowFullScreen
              src={champEducationVideoPreviewUrl}
              title="Employee Education CHAMP Plan video"
            />
            <a href={champEducationVideoUrl} className="inline-link">
              Open Video <ArrowRight size={16} />
            </a>
          </article>
        </section>

        <section className="section-block" id="safety">
          <SectionIntro
            eyebrow="Compliance and Safety"
            title="Safety document center."
            text="Search and filter required safety documents by topic, company, language, or status."
          />
          <div className="safety-library">
            <div className="safety-library-toolbar">
              <label htmlFor="safety-search">Search documents</label>
              <div className="search-field safety-search-field">
                <Search size={19} />
                <input
                  id="safety-search"
                  value={safetyQuery}
                  onChange={(event) => setSafetyQuery(event.target.value)}
                  placeholder="Search documents"
                />
              </div>
              <div className="filter-chips" aria-label="Safety document filters">
                {safetyFilters.map((filter) => (
                  <button
                    className={filter === safetyFilter ? "filter-chip active" : "filter-chip"}
                    key={filter}
                    onClick={() => setSafetyFilter(filter)}
                    type="button"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="safety-document-groups">
              {Object.entries(groupedSafetyDocuments).map(([category, documents]) => (
                <section className="safety-document-group" key={category}>
                  <h3>
                    <Folder size={18} />
                    {category}
                  </h3>
                  <div className="safety-document-list">
                    {documents.map((document) => (
                      <SafetyDocumentRow document={document} key={`${document.title}-${document.company ?? document.language}`} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="pending-documents" aria-labelledby="pending-safety-title">
              <h3 id="pending-safety-title">Pending</h3>
              <div className="safety-document-list">
                {pendingSafetyDocuments.map((document) => (
                  <SafetyDocumentRow document={document} key={document.title} />
                ))}
                {pendingSafetyDocuments.length === 0 ? (
                  <p className="empty-state">No pending documents match the current filters.</p>
                ) : null}
              </div>
            </section>
          </div>
        </section>

        <section className="section-block" id="contacts">
          <SectionIntro
            eyebrow="Non-emergency Contact Information"
            title="Location-specific contacts."
            text="Use emergency services immediately for emergencies. This section preserves the non-emergency contact information provided for company locations."
          />
          <div className="contact-grid">
            {nonEmergencyContacts.map((location) => (
              <article className="contact-card" key={`${location.group}-${location.city}`}>
                <div className="contact-card-header">
                  <span>
                    <small>{location.group}</small>
                    <strong>{location.city}</strong>
                  </span>
                  <Phone size={18} />
                </div>
                <dl>
                  {location.rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value || "\u00a0"}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Parkcrest Properties</strong>
          <span>Employee Resource Portal</span>
        </div>
        <p>
          The site is intentionally public and read-only. Employees should not submit documents,
          medical records, Social Security numbers, or sensitive files through this public portal.
        </p>
      </footer>
    </div>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function ResourceButton({ href, label, emphasis = false }: { href: string; label: string; emphasis?: boolean }) {
  return (
    <a href={href} className={emphasis ? "resource-button emphasis" : "resource-button"}>
      {label}
    </a>
  );
}

function DocumentList({ documents, dense = false }: { documents: DocumentLink[]; dense?: boolean }) {
  return (
    <div className={dense ? "document-list dense" : "document-list"}>
      {documents.map((doc) =>
        doc.href ? (
          <a href={doc.href} className="document-link" key={doc.title}>
            <FileText size={18} />
            <span>{doc.title}</span>
            <Download size={16} />
          </a>
        ) : (
          <div className="document-link pending" key={doc.title}>
            <FileText size={18} />
            <span>{doc.title}</span>
          </div>
        ),
      )}
    </div>
  );
}

function DocumentCard({ document }: { document: DocumentLink }) {
  const isAvailable = document.status === "Available";

  const content = (
    <>
      <div className="document-card-top">
        <span className={isAvailable ? "status available" : "status pending"}>
          {isAvailable ? <BadgeCheck size={14} /> : <AlertTriangle size={14} />}
          {document.status}
        </span>
        {document.company ? <small>{document.company}</small> : null}
      </div>
      <h3>{document.title}</h3>
      {document.note ? <p>{document.note}</p> : <p>Open or download the current resource.</p>}
      <span className="document-card-action">
        {isAvailable ? "Open Document" : "Pending"} {isAvailable ? <ArrowRight size={16} /> : null}
      </span>
    </>
  );

  if (document.href) {
    return (
      <a href={document.href} className="document-card">
        {content}
      </a>
    );
  }

  return <article className="document-card unavailable">{content}</article>;
}

function SafetyDocumentRow({ document }: { document: SafetyLibraryDocument }) {
  const meta = [document.company, document.language].filter(Boolean).join(" · ");
  const rowContent = (
    <>
      <span className={document.status === "Available" ? "row-status available" : "row-status pending"}>
        {document.status === "Available" ? <BadgeCheck size={16} /> : <AlertTriangle size={16} />}
      </span>
      <span className="row-copy">
        <strong>{document.title}</strong>
        {meta ? <small>{meta}</small> : null}
      </span>
      {document.href ? <Download size={16} className="row-action-icon" /> : null}
    </>
  );

  if (document.href) {
    return (
      <a href={document.href} className="safety-document-row">
        {rowContent}
      </a>
    );
  }

  return <div className="safety-document-row pending-row">{rowContent}</div>;
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="info-card-modern">
      <FileCheck2 size={18} />
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
