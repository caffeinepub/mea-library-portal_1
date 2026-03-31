import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface Tender {
  sno: number;
  title: string;
  category: string;
  published: string;
  lastDate: string;
  corrigendum: boolean;
}

const ACTIVE_TENDERS: Tender[] = [
  {
    sno: 1,
    title: "Supply of Integrated Library Management System (ILMS)",
    category: "IT / Software",
    published: "01 Mar 2026",
    lastDate: "31 Mar 2026",
    corrigendum: true,
  },
  {
    sno: 2,
    title: "Annual Maintenance Contract for Library Equipment",
    category: "Maintenance",
    published: "15 Feb 2026",
    lastDate: "28 Mar 2026",
    corrigendum: false,
  },
  {
    sno: 3,
    title: "Supply of Books and Reference Material FY 2026-27",
    category: "Books & Journals",
    published: "20 Feb 2026",
    lastDate: "30 Mar 2026",
    corrigendum: false,
  },
  {
    sno: 4,
    title: "Digitization of Rare Books and Archival Records",
    category: "Digitization",
    published: "10 Mar 2026",
    lastDate: "01 Apr 2026",
    corrigendum: true,
  },
  {
    sno: 5,
    title: "Newspaper and Magazine Subscription FY 2026-27",
    category: "Subscriptions",
    published: "05 Mar 2026",
    lastDate: "29 Mar 2026",
    corrigendum: false,
  },
];

const ARCHIVED_TENDERS: Tender[] = [
  {
    sno: 1,
    title: "Library Furniture and Fixtures Procurement FY 2025-26",
    category: "Furniture",
    published: "01 Nov 2025",
    lastDate: "30 Nov 2025",
    corrigendum: false,
  },
  {
    sno: 2,
    title: "CCTV Surveillance System for Library Premises",
    category: "Security",
    published: "15 Oct 2025",
    lastDate: "15 Nov 2025",
    corrigendum: true,
  },
  {
    sno: 3,
    title: "E-resources Subscription Renewal 2025-26",
    category: "Subscriptions",
    published: "01 Sep 2025",
    lastDate: "30 Sep 2025",
    corrigendum: false,
  },
];

type SortField = "published" | "lastDate" | "title" | "category";

function isNearDeadline(dateStr: string): boolean {
  const parts = dateStr.split(" ");
  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const d = new Date(
    Number.parseInt(parts[2]),
    months[parts[1]],
    Number.parseInt(parts[0]),
  );
  const now = new Date();
  const diffDays = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 3;
}

export default function TendersPage() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortAsc((a) => !a);
    else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sorted = [...ACTIVE_TENDERS].sort((a, b) => {
    if (!sortField) return 0;
    const av = a[sortField].toString();
    const bv = b[sortField].toString();
    return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-sm text-[#888]">
          <li>
            <Link to="/" className="hover:text-olive">
              Home
            </Link>
          </li>
          <li>&rsaquo;</li>
          <li className="text-olive font-medium">Tenders</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-olive mb-1">Tenders</h1>
      <div className="w-16 h-[3px] bg-saffron mb-6" aria-hidden="true" />

      <section aria-labelledby="active-tenders-heading">
        <h2
          id="active-tenders-heading"
          className="font-semibold text-olive text-sm uppercase tracking-wider mb-4"
        >
          Active Tenders
        </h2>
        <div className="overflow-x-auto rounded border border-border">
          <table className="w-full text-sm" data-ocid="tenders.table">
            <thead>
              <tr className="bg-olive text-white">
                <th className="px-4 py-3 text-left font-semibold w-12">S.No</th>
                <TH
                  label="Tender Title"
                  field="title"
                  current={sortField}
                  asc={sortAsc}
                  onSort={handleSort}
                />
                <TH
                  label="Category"
                  field="category"
                  current={sortField}
                  asc={sortAsc}
                  onSort={handleSort}
                />
                <TH
                  label="Published Date"
                  field="published"
                  current={sortField}
                  asc={sortAsc}
                  onSort={handleSort}
                />
                <TH
                  label="Last Date"
                  field="lastDate"
                  current={sortField}
                  asc={sortAsc}
                  onSort={handleSort}
                />
                <th className="px-4 py-3 text-left font-semibold">Download</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Corrigendum
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t, i) => (
                <tr
                  key={t.sno}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#F5F3EE]"}
                  data-ocid={`tenders.row.${i + 1}`}
                >
                  <td className="px-4 py-3 text-[#888]">{t.sno}</td>
                  <td className="px-4 py-3 font-medium text-olive">
                    {t.title}
                  </td>
                  <td className="px-4 py-3 text-[#555]">{t.category}</td>
                  <td className="px-4 py-3 text-[#555]">{t.published}</td>
                  <td
                    className={`px-4 py-3 font-medium ${isNearDeadline(t.lastDate) ? "text-red-600" : "text-[#555]"}`}
                  >
                    {t.lastDate}
                    {isNearDeadline(t.lastDate) && (
                      <span className="text-xs ml-1">(Closing Soon)</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      aria-label={`Download tender ${t.sno}`}
                      className="w-8 h-8 flex items-center justify-center border border-border rounded text-olive hover:bg-olive hover:text-white transition-colors"
                      data-ocid="tenders.button"
                    >
                      <PDFIcon />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {t.corrigendum ? (
                      <span
                        className="text-xs font-semibold text-olive hover:text-saffron underline cursor-pointer"
                        data-ocid="tenders.link"
                      >
                        View
                      </span>
                    ) : (
                      <span className="text-[#aaa]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="archived-tenders-heading">
        <button
          type="button"
          onClick={() => setArchiveOpen((o) => !o)}
          className="flex items-center gap-2 font-semibold text-olive text-sm uppercase tracking-wider hover:text-saffron"
          aria-expanded={archiveOpen}
          aria-controls="archived-content"
          id="archived-tenders-heading"
          data-ocid="tenders.toggle"
        >
          View Archived Tenders
          <span aria-hidden="true">{archiveOpen ? "▲" : "▼"}</span>
        </button>
        {archiveOpen && (
          <div
            id="archived-content"
            className="mt-4 overflow-x-auto rounded border border-border opacity-70"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#888] text-white">
                  {[
                    "S.No",
                    "Tender Title",
                    "Category",
                    "Published Date",
                    "Last Date",
                    "Download",
                    "Corrigendum",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ARCHIVED_TENDERS.map((t, i) => (
                  <tr
                    key={t.sno}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#F5F3EE]"}
                  >
                    <td className="px-4 py-3 text-[#888]">{t.sno}</td>
                    <td className="px-4 py-3 text-[#555]">{t.title}</td>
                    <td className="px-4 py-3 text-[#888]">{t.category}</td>
                    <td className="px-4 py-3 text-[#888]">{t.published}</td>
                    <td className="px-4 py-3 text-[#888]">{t.lastDate}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        aria-label="Download"
                        className="w-8 h-8 flex items-center justify-center border border-border rounded text-[#888]"
                      >
                        <PDFIcon />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {t.corrigendum ? (
                        <span className="text-xs text-[#888] underline cursor-pointer">
                          View
                        </span>
                      ) : (
                        <span className="text-[#aaa]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function TH({
  label,
  field,
  current,
  asc,
  onSort,
}: {
  label: string;
  field: SortField;
  current: SortField | null;
  asc: boolean;
  onSort: (f: SortField) => void;
}) {
  const active = current === field;
  return (
    <th className="px-4 py-3 text-left font-semibold">
      <button
        type="button"
        onClick={() => onSort(field)}
        className="flex items-center gap-1 hover:text-saffron-light"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <span aria-hidden="true" className="text-xs opacity-70">
          {active ? (asc ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
  );
}

function PDFIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
}
