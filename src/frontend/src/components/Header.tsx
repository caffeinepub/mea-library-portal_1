import { Link, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Lang, useLanguage } from "../contexts/LanguageContext";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

function getNavLinks(lang: Lang): NavLink[] {
  const isHi = lang === "hi";
  return [
    { label: isHi ? "होम" : "Home", href: "/" },
    {
      label: isHi ? "हमारे बारे में" : "About Us",
      href: "/",
      dropdown: [
        { label: isHi ? "संक्षिप्त इतिहास" : "Brief History", href: "/" },
        { label: isHi ? "मिशन और विज़न" : "Mission and Vision", href: "/" },
        {
          label: isHi
            ? "निदेशक और पुस्तकालय कर्मचारी"
            : "Directors and Library Staff",
          href: "/",
        },
        { label: isHi ? "संपर्क करें" : "Contact Us", href: "/" },
      ],
    },
    { label: isHi ? "ओपैक" : "OPAC", href: "/" },
    { label: isHi ? "सेवाएं" : "Services", href: "/membership" },
    {
      label: isHi
        ? "भारतीय मिशन पुस्तकालय नेटवर्क"
        : "Indian Mission Library Network",
      href: "/",
    },
    {
      label: isHi ? "आउटरीच गतिविधियां" : "Outreach Activities",
      href: "/",
      dropdown: [
        {
          label: isHi ? "प्रशिक्षण – ई-संसाधन" : "Training – E-Resources",
          href: "/",
        },
        { label: isHi ? "वीडियो" : "Videos", href: "/" },
        { label: isHi ? "गैलरी" : "Gallery", href: "/" },
        { label: isHi ? "कार्यक्रम" : "Events", href: "/" },
        {
          label: isHi ? "IR पर व्याख्यान श्रृंखला" : "Lecture Series on IR",
          href: "/",
        },
      ],
    },
  ];
}

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [highContrast, setHighContrast] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState<
    Record<string, boolean>
  >({});
  const navRef = useRef<HTMLDivElement>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isHi = lang === "hi";
  const NAV_LINKS = getNavLinks(lang);

  const changeFontSize = useCallback((size: "sm" | "md" | "lg") => {
    const root = document.documentElement;
    setFontSize(size);
    if (size === "sm") root.style.fontSize = "14px";
    else if (size === "lg") root.style.fontSize = "18px";
    else root.style.fontSize = "16px";
  }, []);

  const toggleContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("high-contrast");
      }
      return next;
    });
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Tricolor strip */}
      <div className="flex h-[5px] w-full" aria-hidden="true">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Dark Utility Bar */}
      <div className="bg-[#1E2B4A] text-white px-2 sm:px-4 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1">
          {/* Skip to content */}
          <a
            href="#main-content"
            className="hidden sm:block text-[10px] sm:text-[11px] text-white underline hover:text-[#FF9933] focus:outline-none focus:ring-1 focus:ring-[#FF9933] whitespace-nowrap shrink-0"
          >
            {isHi ? "मुख्य सामग्री पर जाएं" : "Skip to Content"}
          </a>

          {/* Right utilities */}
          <div
            className="flex items-center overflow-x-auto scrollbar-none text-[10px] sm:text-[11px] ml-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Screen Reader */}
            <button
              type="button"
              className="px-1.5 py-1 text-white/80 hover:text-white transition-colors whitespace-nowrap shrink-0"
              aria-label="Screen reader access"
            >
              <span className="hidden sm:inline">
                {isHi ? "स्क्रीन रीडर" : "Screen Reader"}
              </span>
              <span className="sm:hidden">{isHi ? "SR" : "SR"}</span>
            </button>
            <span className="text-white/40 select-none px-0.5">|</span>

            {/* Font Size */}
            <div className="flex items-center shrink-0" aria-label="Text size">
              <button
                type="button"
                onClick={() => changeFontSize("sm")}
                className={`px-1 sm:px-1.5 py-1 transition-colors text-[10px] sm:text-[11px] shrink-0 ${
                  fontSize === "sm"
                    ? "text-[#FF9933] font-bold"
                    : "text-white/80 hover:text-white"
                }`}
                aria-label="Small text"
                aria-pressed={fontSize === "sm"}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => changeFontSize("md")}
                className={`px-1 sm:px-1.5 py-1 transition-colors text-[12px] sm:text-[13px] shrink-0 ${
                  fontSize === "md"
                    ? "text-[#FF9933] font-bold"
                    : "text-white/80 hover:text-white"
                }`}
                aria-label="Medium text"
                aria-pressed={fontSize === "md"}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => changeFontSize("lg")}
                className={`px-1 sm:px-1.5 py-1 transition-colors text-[14px] sm:text-[15px] shrink-0 ${
                  fontSize === "lg"
                    ? "text-[#FF9933] font-bold"
                    : "text-white/80 hover:text-white"
                }`}
                aria-label="Large text"
                aria-pressed={fontSize === "lg"}
              >
                A+
              </button>
            </div>
            <span className="text-white/40 select-none px-0.5">|</span>

            {/* Language Toggle */}
            <div
              className="flex items-center shrink-0"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-1 sm:px-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
                  lang === "en"
                    ? "text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
                aria-pressed={lang === "en"}
                aria-label="English"
              >
                English
              </button>
              <span className="text-white/40 select-none">|</span>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`px-1 sm:px-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
                  lang === "hi"
                    ? "text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
                aria-pressed={lang === "hi"}
                aria-label="Hindi"
              >
                हिंदी
              </button>
            </div>
            <span className="text-white/40 select-none px-0.5">|</span>

            {/* High Contrast */}
            <button
              type="button"
              onClick={toggleContrast}
              className={`px-1 sm:px-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
                highContrast
                  ? "text-[#FF9933] font-bold"
                  : "text-white/80 hover:text-white"
              }`}
              aria-label="Toggle high contrast"
              aria-pressed={highContrast}
            >
              <span className="hidden sm:inline">
                {isHi ? "उच्च कंट्रास्ट" : "High Contrast"}
              </span>
              <span className="sm:hidden">HC</span>
            </button>
            <span className="text-white/40 select-none px-0.5">|</span>

            {/* Search */}
            <div className="flex items-center ml-1 shrink-0">
              <div className="relative flex">
                <input
                  type="search"
                  placeholder={isHi ? "खोजें..." : "Search..."}
                  className="h-7 pl-2 pr-1 bg-white/10 border border-white/30 text-white placeholder:text-white/40 text-[10px] sm:text-[11px] rounded-l focus:outline-none focus:border-[#FF9933] focus:bg-white/15 w-20 sm:w-36 md:w-56"
                  aria-label={
                    isHi ? "पुस्तकालय संसाधन खोजें" : "Search library resources"
                  }
                />
                <button
                  type="button"
                  className="h-7 w-7 sm:w-8 flex items-center justify-center bg-[#FF9933] text-white rounded-r hover:bg-[#e8871e] transition-colors shrink-0"
                  aria-label={isHi ? "खोजें" : "Submit search"}
                >
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White Branding Row */}
      <div className="bg-white border-b border-[#e0e0e0] py-3 sm:py-4 pl-[20px] pr-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          <Link
            to="/"
            className="flex items-center gap-4 shrink-0"
            aria-label={isHi ? "विदेश मंत्रालय पुस्तकालय होम" : "MEA Library Home"}
          >
            <img
              src="/assets/satymeve_jaytey-019d3e4a-0ea1-752f-8879-7f47f395f4e0.jpg"
              alt="Satyamev Jayate - Government of India Emblem"
              className="h-[60px] w-auto object-contain flex-shrink-0"
              style={{ imageRendering: "auto", display: "block" }}
            />
            <div>
              <p className="text-[#1E2B4A] font-bold text-lg sm:text-xl leading-tight">
                {isHi ? "विदेश मंत्रालय पुस्तकालय" : "MEA Library"}
              </p>
              <p className="text-[#555] text-[11px] sm:text-[12px] leading-snug">
                {isHi
                  ? "विदेश मंत्रालय, भारत सरकार"
                  : "Ministry of External Affairs, Government of India"}
              </p>
            </div>
          </Link>
          {/* Government initiative logos */}
          <div className="hidden sm:flex items-center gap-4 ml-auto shrink-0">
            <img
              src="/assets/dg_india-019d47b2-bbb4-7359-bf98-e2ed9d2a419e.png"
              alt="Digital India"
              className="h-10 w-auto object-contain"
            />
            <img
              src="/assets/mygov_0-019d47b2-bbbb-711d-b7a7-1b5c2a802db0.png"
              alt="MyGov"
              className="h-10 w-auto object-contain"
            />
            <img
              src="/assets/swach-019d47b2-bbc8-77a9-845a-9a00ca4fc8d0.jpg"
              alt="Swachh Bharat"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <nav
        className="bg-[#1a5c35]"
        aria-label={isHi ? "मुख्य नेविगेशन" : "Main navigation"}
        ref={navRef}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center">
            {NAV_LINKS.map((link, i) => {
              const isActive =
                link.href === "/"
                  ? currentPath === "/"
                  : currentPath === link.href;
              const hasDropdown = !!(link.dropdown && link.dropdown.length > 0);
              const isOpen = openDropdown === link.label;

              return (
                <li
                  key={`${link.label}-${i}`}
                  className="relative"
                  onMouseEnter={() =>
                    hasDropdown && setOpenDropdown(link.label)
                  }
                  onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                >
                  {hasDropdown ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : link.label)
                      }
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`nav-item flex items-center gap-1 px-4 py-[10px] text-sm font-medium text-white border-b-[3px] transition-colors whitespace-nowrap ${
                        isActive
                          ? "active border-b-[#e8a020] bg-[#0f3d24]"
                          : "border-b-transparent"
                      }`}
                      style={{ borderRadius: "2px" }}
                    >
                      {link.label}
                      <ChevronIcon
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`nav-item block px-4 py-[10px] text-sm font-medium text-white border-b-[3px] transition-colors whitespace-nowrap ${
                        isActive
                          ? "active border-b-[#e8a020] bg-[#0f3d24]"
                          : "border-b-transparent"
                      }`}
                      style={{ borderRadius: "2px" }}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown panel */}
                  {hasDropdown && (
                    <ul
                      role="menu"
                      className={`absolute top-full left-0 z-50 min-w-[210px] bg-white border border-[#e0e0e0] shadow-lg rounded-b transition-all duration-200 ${
                        isOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      {link.dropdown!.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center px-4 py-2.5 text-sm font-medium text-[#1E2B4A] hover:text-[#FF9933] hover:border-l-2 hover:border-[#FF9933] hover:pl-[14px] transition-all whitespace-nowrap border-l-2 border-transparent"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger toggle */}
          <div className="md:hidden flex items-center justify-between py-2">
            <span className="text-white text-sm font-medium">
              {isHi ? "नेविगेशन" : "Navigation"}
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="text-white p-2"
              aria-label={
                mobileOpen
                  ? isHi
                    ? "मेनू बंद करें"
                    : "Close menu"
                  : isHi
                    ? "मेनू खोलें"
                    : "Open menu"
              }
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <ul className="md:hidden pb-2">
              {NAV_LINKS.map((link, i) => {
                const hasDropdown = !!(
                  link.dropdown && link.dropdown.length > 0
                );
                const isMobileOpen = !!openMobileDropdowns[link.label];

                return (
                  <li key={`${link.label}-mob-${i}`}>
                    {hasDropdown ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleMobileDropdown(link.label)}
                          aria-expanded={isMobileOpen}
                          className="w-full flex items-center justify-between px-2 py-2 text-sm text-white hover:text-[#FF9933] transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronIcon
                            className={`transition-transform duration-200 ${
                              isMobileOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isMobileOpen && (
                          <ul className="pl-4 pb-1 space-y-0.5">
                            {link.dropdown!.map((item) => (
                              <li key={item.label}>
                                <Link
                                  to={item.href}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setOpenMobileDropdowns({});
                                  }}
                                  className="block px-2 py-1.5 text-sm text-white/80 hover:text-[#FF9933] border-l-2 border-[#FF9933]/40 hover:border-[#FF9933] transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-2 py-2 text-sm text-white hover:text-[#FF9933]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SearchIcon() {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}
