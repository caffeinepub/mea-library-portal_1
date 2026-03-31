import { Link } from "@tanstack/react-router";
import { useState } from "react";

const SERVICE_LINKS = [
  {
    key: "membership",
    label: "Online Library Membership",
    href: "/membership" as const,
  },
  { key: "book-rec", label: "Online Book Recommendation", href: "/" as const },
  { key: "ndc", label: "No Demand Certificate (NDC)", href: "/ndc" as const },
  { key: "librarian", label: "Ask Librarian", href: "/" as const },
  { key: "docs", label: "Documentation Services", href: "/" as const },
  { key: "opac", label: "OPAC", href: "/" as const },
];

export default function ServiceSidebar({ active }: { active: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <aside className="lg:w-56 shrink-0">
      <button
        type="button"
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-secondary border border-border rounded text-sm font-semibold text-olive mb-2"
        onClick={() => setMobileOpen((o) => !o)}
        aria-expanded={mobileOpen}
        data-ocid="sidebar.toggle"
      >
        Services Menu
        <span aria-hidden="true">{mobileOpen ? "▲" : "▼"}</span>
      </button>
      <nav
        className={`${mobileOpen ? "block" : "hidden"} lg:block`}
        aria-label="Service navigation"
      >
        <h2 className="hidden lg:block text-xs font-semibold uppercase tracking-widest text-[#888] mb-3">
          Services
        </h2>
        <ul className="space-y-0.5">
          {SERVICE_LINKS.map((link) => {
            const isActive = link.key === active;
            return (
              <li key={link.key}>
                <Link
                  to={link.href}
                  className={`flex items-center text-sm px-3 py-2.5 border-l-[3px] transition-colors ${
                    isActive
                      ? "border-saffron text-saffron font-semibold bg-saffron-pale"
                      : "border-transparent text-[#444] hover:border-olive/40 hover:text-olive hover:bg-secondary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  data-ocid="sidebar.link"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
