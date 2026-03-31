import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const ALL_ANNOUNCEMENTS_EN = [
  {
    date: "13 Mar 2026",
    title: "Library closed on 14 March \u2013 Dr. Ambedkar Jayanti eve",
    category: "Notice",
    desc: "MEA Library will remain closed on 14th March 2026 on account of the eve of Dr. Ambedkar Jayanti.",
    isNew: true,
  },
  {
    date: "10 Mar 2026",
    title: "PressReader access extended to all Indian Missions",
    category: "Circular",
    desc: "The PressReader subscription is now available to all Indian missions and posts abroad with valid login.",
    isNew: true,
  },
  {
    date: "05 Mar 2026",
    title: "Tender notice: Library Management System upgrade",
    category: "Tender",
    desc: "Applications are invited for supply and implementation of an integrated library management system. Last date: 30 March 2026.",
    isNew: false,
  },
  {
    date: "28 Feb 2026",
    title: "Annual Book Exhibition \u2013 March 2026",
    category: "Events",
    desc: "MEA Library will host its Annual Book Exhibition from 20\u201325 March 2026 at Jawaharlal Nehru Bhavan.",
    isNew: false,
  },
  {
    date: "20 Feb 2026",
    title: "New batch of diplomatic law books received",
    category: "Notice",
    desc: "MEA Library has received 240 new titles in international law, diplomacy, and foreign policy.",
    isNew: false,
  },
  {
    date: "15 Feb 2026",
    title: "JSTOR database access renewed for FY 2026-27",
    category: "Circular",
    desc: "JSTOR online database subscription has been renewed. All registered members can access full-text journals.",
    isNew: false,
  },
  {
    date: "08 Feb 2026",
    title: "E-thesis portal integrated with OPAC",
    category: "Notice",
    desc: "Researchers and students can now access e-theses directly through the OPAC portal.",
    isNew: false,
  },
  {
    date: "01 Feb 2026",
    title: "Revised library timings effective from 1 February",
    category: "Circular",
    desc: "MEA Library timings have been revised to 9:00 AM \u2013 5:30 PM on all working days. Saturdays: 9:00 AM \u2013 1:00 PM.",
    isNew: false,
  },
];

const ALL_ANNOUNCEMENTS_HI = [
  {
    date: "13 मार्च 2026",
    title: "14 मार्च को पुस्तकालय बंद \u2013 डॉ. अंबेडकर जयंती संध्या",
    category: "सूचना",
    desc: "एमईए पुस्तकालय डॉ. अंबेडकर जयंती की संध्या के अवसर पर 14 मार्च 2026 को बंद रहेगा।",
    isNew: true,
  },
  {
    date: "10 मार्च 2026",
    title: "सभी भारतीय मिशनों तक PressReader की पहुंच बड़ाई गई",
    category: "परिपत्र",
    desc: "PressReader सदस्यता अब वैध लॉगिन के साथ विदेश में सभी भारतीय मिशनों को उपलब्ध है।",
    isNew: true,
  },
  {
    date: "05 मार्च 2026",
    title: "टेंडर सूचना: पुस्तकालय प्रबंधन प्रणाली उन्नयन",
    category: "टेंडर",
    desc: "एकीकृत पुस्तकालय प्रबंधन प्रणाली के आपूर्ति और कार्यान्वयन के लिए आवेदन आमंत्रित। अंतिम तिथि: 30 मार्च 2026।",
    isNew: false,
  },
  {
    date: "28 फरवरी 2026",
    title: "वार्षिक पुस्तक प्रदर्शनी \u2013 मार्च 2026",
    category: "कार्यक्रम",
    desc: "एमईए पुस्तकालय जवाहरलाल नेहरू भवन में 20\u201325 मार्च 2026 से अपनी वार्षिक पुस्तक प्रदर्शनी आयोजित करेगा।",
    isNew: false,
  },
  {
    date: "20 फरवरी 2026",
    title: "कूटनीतिक विधि पुस्तकों की नई खेप प्राप्त",
    category: "सूचना",
    desc: "एमईए पुस्तकालय को अंतर्राष्ट्रीय विधि, कूटनीति और विदेश नीति में 240 नए शीर्षक प्राप्त हुए हैं।",
    isNew: false,
  },
  {
    date: "15 फरवरी 2026",
    title: "JSTOR डेटाबेस सदस्यता वित्त वर्ष 2026-27 के लिए नवीनीकृत",
    category: "परिपत्र",
    desc: "JSTOR ऑनलाइन डेटाबेस सदस्यता नवीनीकृत की गई है। सभी पंजीकृत सदस्य पूर्ण-पाठ जर्नल तक पहुंच सकते हैं।",
    isNew: false,
  },
  {
    date: "08 फरवरी 2026",
    title: "ई-थीसिस पोर्टल OPAC के साथ एकीकृत",
    category: "सूचना",
    desc: "शोधकर्ता और छात्र अब OPAC पोर्टल के माध्यम से सीधे ई-थीसिस तक पहुंच सकते हैं।",
    isNew: false,
  },
  {
    date: "01 फरवरी 2026",
    title: "1 फरवरी से संशोधित पुस्तकालय समय",
    category: "परिपत्र",
    desc: "एमईए पुस्तकालय का समय सभी कार्य दिवसों पर 9:00 बजे से 5:30 बजे तक संशोधित किया गया है। शनिवार: 9:00 क – 1:00 बजे।",
    isNew: false,
  },
];

const CATEGORIES_EN = ["All", "Notices", "Circulars", "Events", "Tenders"];
const CATEGORIES_HI = ["सभी", "सूचनाएं", "परिपत्र", "कार्यक्रम", "टेंडर"];

export default function AnnouncementsPage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const ALL_ANNOUNCEMENTS = isHi ? ALL_ANNOUNCEMENTS_HI : ALL_ANNOUNCEMENTS_EN;
  const CATEGORIES = isHi ? CATEGORIES_HI : CATEGORIES_EN;

  const [category, setCategory] = useState(isHi ? "सभी" : "All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const TOTAL_PAGES = 10;

  const filtered = ALL_ANNOUNCEMENTS.filter((a) => {
    const matchCat =
      category === "All" ||
      category === "सभी" ||
      a.category.toLowerCase().includes(category.slice(0, -1).toLowerCase()) ||
      a.category === category;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-sm text-[#888]">
          <li>
            <Link to="/" className="hover:text-olive">
              {isHi ? "होम" : "Home"}
            </Link>
          </li>
          <li>&rsaquo;</li>
          <li className="text-olive font-medium">
            {isHi ? "घोषणाएं" : "Announcements"}
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-olive mb-1">
        {isHi ? "घोषणाएं एवं ताज़ा समाचार" : "Announcements & Latest News"}
      </h1>
      <div className="w-16 h-[3px] bg-saffron mb-6" aria-hidden="true" />

      {/* Filter bar */}
      <div className="bg-white border border-border rounded p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div>
          <label
            htmlFor="cat-filter"
            className="block text-xs text-[#888] mb-1"
          >
            {isHi ? "श्रेणी" : "Category"}
          </label>
          <select
            id="cat-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 px-3 border border-border rounded text-sm focus:outline-none focus:border-olive"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="from-date" className="block text-xs text-[#888] mb-1">
            {isHi ? "से" : "From"}
          </label>
          <input
            type="date"
            id="from-date"
            className="h-9 px-3 border border-border rounded text-sm focus:outline-none focus:border-olive"
          />
        </div>
        <div>
          <label htmlFor="to-date" className="block text-xs text-[#888] mb-1">
            {isHi ? "तक" : "To"}
          </label>
          <input
            type="date"
            id="to-date"
            className="h-9 px-3 border border-border rounded text-sm focus:outline-none focus:border-olive"
          />
        </div>
        <div className="flex-1 min-w-40">
          <label
            htmlFor="search-ann"
            className="block text-xs text-[#888] mb-1"
          >
            {isHi ? "खोजें" : "Search"}
          </label>
          <input
            id="search-ann"
            type="text"
            placeholder={isHi ? "घोषणाएं खोजें..." : "Search announcements..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 border border-border rounded text-sm focus:outline-none focus:border-olive"
          />
        </div>
        <button
          type="button"
          className="h-9 px-5 bg-olive text-white text-sm font-semibold rounded hover:bg-olive-dark"
        >
          {isHi ? "फ़िल्टर" : "Filter"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[#888]">
          {isHi ? "कोई घोषणा नहीं मिली।" : "No announcements found."}
        </div>
      ) : (
        <div className="space-y-0">
          {filtered.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col sm:flex-row gap-4 p-5 border-b border-border ${i % 2 === 0 ? "bg-white" : "bg-[#F5F3EE]"}`}
            >
              <div className="shrink-0">
                <span className="inline-block px-3 py-1 bg-saffron text-white text-xs font-semibold rounded">
                  {item.date}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-sm font-semibold text-olive">
                    {item.title}
                  </h2>
                  <span className="px-2 py-0.5 text-xs rounded bg-[#E8F0E8] text-olive font-medium">
                    {item.category}
                  </span>
                  {item.isNew && (
                    <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 font-semibold">
                      {isHi ? "नया" : "NEW"}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  aria-label="Download PDF"
                  className="w-8 h-8 flex items-center justify-center border border-border rounded text-[#555] hover:border-olive hover:text-olive"
                >
                  <PDFIcon />
                </button>
                <span className="text-xs font-semibold text-olive hover:text-saffron whitespace-nowrap cursor-pointer">
                  {isHi ? "और पढ़ें →" : "Read More \u2192"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <nav
        className="flex items-center justify-center gap-1 mt-8"
        aria-label="Pagination"
      >
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1.5 text-sm border border-border rounded hover:bg-secondary disabled:opacity-40"
        >
          {isHi ? "पिछला" : "Previous"}
        </button>
        {[1, 2, 3].map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => setPage(n)}
            className={`w-8 h-8 text-sm rounded ${page === n ? "bg-olive text-white" : "border border-border hover:bg-secondary"}`}
          >
            {n}
          </button>
        ))}
        <span className="px-1 text-[#888]">...</span>
        <button
          type="button"
          onClick={() => setPage(TOTAL_PAGES)}
          className="w-8 h-8 text-sm border border-border rounded hover:bg-secondary"
        >
          {TOTAL_PAGES}
        </button>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          disabled={page === TOTAL_PAGES}
          className="px-3 py-1.5 text-sm border border-border rounded hover:bg-secondary disabled:opacity-40"
        >
          {isHi ? "अगला" : "Next"}
        </button>
      </nav>
    </div>
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
