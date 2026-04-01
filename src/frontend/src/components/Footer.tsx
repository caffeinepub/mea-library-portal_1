import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const VISITOR_KEY = "mea_visitor_count";
const VISITOR_BASE = 124500;

function getVisitorCount(): number {
  try {
    const stored = localStorage.getItem(VISITOR_KEY);
    const count = stored ? Number.parseInt(stored, 10) : VISITOR_BASE;
    const next = count + 1;
    localStorage.setItem(VISITOR_KEY, String(next));
    return next;
  } catch {
    return VISITOR_BASE;
  }
}

function formatCount(n: number): string {
  return n.toLocaleString("en-IN");
}

type FooterCol = {
  heading: string;
  links: string[];
  isContact?: boolean;
};

const FOOTER_COLS_EN: FooterCol[] = [
  {
    heading: "About",
    links: [
      "About MEA Library",
      "Mission & Vision",
      "History",
      "Staff Directory",
      "RTI",
    ],
  },
  {
    heading: "Services",
    links: [
      "Online Library Membership",
      "Book Recommendation",
      "No Demand Certificate",
      "Documentation Services",
      "Inter-Library Loan",
    ],
  },
  {
    heading: "Resources",
    links: [
      "OPAC",
      "E-Books",
      "Online Journals",
      "IR Databases",
      "Archival Databases",
    ],
  },
  {
    heading: "Quick Links",
    links: [
      "MEA Official Website",
      "Indian Missions Abroad",
      "SAARC Countries",
      "UN Resources",
      "NIC Portal",
    ],
  },
  {
    heading: "Downloads",
    links: [
      "Annual Reports",
      "Library Forms",
      "Membership Form",
      "NDC Form",
      "Circulars / Notices",
      "PDF Resources",
    ],
  },
  {
    heading: "Contact",
    links: [
      "Jawaharlal Nehru Bhavan",
      "New Delhi - 110011",
      "Tel: +91-11-23012600",
      "Email: library@mea.gov.in",
      "Timings: 9AM \u2013 5:30PM",
    ],
  },
];

const FOOTER_COLS_HI: FooterCol[] = [
  {
    heading: "परिचय",
    links: [
      "एमईए पुस्तकालय के बारे में",
      "मिशन और विज़न",
      "इतिहास",
      "कर्मचारी निर्देशिका",
      "आरटीआई",
    ],
  },
  {
    heading: "सेवाएं",
    links: [
      "ऑनलाइन पुस्तकालय सदस्यता",
      "पुस्तक अनुशंसा",
      "निःशुल्क मांग प्रमाणपत्र",
      "प्रलेखन सेवाएं",
      "अंतर-पुस्तकालय ठन",
    ],
  },
  {
    heading: "संसाधन",
    links: ["ओपैक", "ई-बुक", "ऑनलाइन जर्नल", "आईआर डेटाबेस", "अभिलेखागार डेटाबेस"],
  },
  {
    heading: "त्वरित लिंक",
    links: [
      "एमईए आधिकारिक वेबसाइट",
      "विदेश में भारतीय मिशन",
      "सार्क देश",
      "संयुक्त राष्ट्र संसाधन",
      "एनआईसी पोर्टल",
    ],
  },
  {
    heading: "डाउनलोड",
    links: [
      "वार्षिक रिपोर्ट",
      "पुस्तकालय प्रपत्र",
      "सदस्यता प्रपत्र",
      "एनडीसी प्रपत्र",
      "परिपत्र / सूचनाएं",
      "पीडीएफ संसाधन",
    ],
  },
  {
    heading: "संपर्क",
    links: [],
    isContact: true,
  },
];

export default function Footer() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const footerCols = isHi ? FOOTER_COLS_HI : FOOTER_COLS_EN;
  const year = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    setVisitorCount(getVisitorCount());
  }, []);

  return (
    <footer className="bg-olive text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {footerCols.map((col) => (
            <div key={col.heading}>
              <h3 className="text-saffron font-semibold text-sm uppercase tracking-widest mb-3">
                {col.heading}
              </h3>
              {col.isContact ? (
                <ContactColumn isHi={isHi} />
              ) : (
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <span className="text-[#F5D89E] text-sm cursor-pointer hover:text-white hover:underline transition-colors">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-white/20 pt-6">
          {/* Visitor Counter */}
          <div className="flex justify-center mb-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e8a020]/50 bg-white/5"
              data-ocid="footer.visitors.panel"
            >
              <EyeIcon />
              <span className="text-[#e8a020] text-xs font-semibold uppercase tracking-wider">
                {isHi ? "आगंतुक:" : "Visitors:"}
              </span>
              <span className="text-[#FF9933] text-sm font-bold tabular-nums">
                {visitorCount > 0 ? formatCount(visitorCount) : "—"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4 justify-center">
            {[
              { label: "Twitter/X", Icon: XIcon },
              { label: "Facebook", Icon: FacebookIcon },
              { label: "YouTube", Icon: YouTubeIcon },
              { label: "LinkedIn", Icon: LinkedInIcon },
            ].map(({ label, Icon }) => (
              <span
                key={label}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/30 text-[#F5D89E] hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              >
                <Icon />
              </span>
            ))}
          </div>
          <p className="text-center text-xs text-white/60 leading-relaxed">
            {isHi
              ? "एनआईसी/एनआईसीएसआई द्वारा डिज़ाइन, विकसित एवं होस्ट किया गया | सामग्री एमईए पुस्तकालय, भारत सरकार द्वारा प्रदान की गई"
              : "Designed, Developed & Hosted by NIC/NICSI | Content provided by MEA Library, Government of India"}
          </p>
          <p className="text-center text-xs text-white/50 mt-1">
            &copy; {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline"
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ContactColumn({ isHi }: { isHi: boolean }) {
  return (
    <ul className="space-y-3 text-sm">
      <li>
        <div className="flex items-start gap-2">
          <LocationIcon />
          <span className="text-[#F5D89E] leading-snug">
            {isHi
              ? "मिनिस्ट्री ऑफ एक्सटर्नल अफेयर्स लाइब्रेरी, सप्रू हाउस, बाराखम्बा रोड, नई दिल्ली - 110001"
              : "Ministry of External Affairs Library, Sapru House, Barakhamba Road, New Delhi - 110001"}
          </span>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-2">
          <PhoneIcon />
          <span className="text-[#F5D89E]">
            {isHi ? "011-23317246 Ext. 617" : "011-23317246 Ext. 617"}
          </span>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-2">
          <MailIcon />
          <a
            href="mailto:dirlib@mea.gov.in"
            className="text-[#B5D4F4] hover:text-white transition-colors underline-offset-2 hover:underline"
          >
            dirlib@mea.gov.in
          </a>
        </div>
      </li>
      <li>
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <span className="text-[#F5D89E] text-xs">
            {isHi ? "अंतिम अपडेट: 31 मार्च 2026" : "Last Updated: 31 March 2026"}
          </span>
        </div>
      </li>
    </ul>
  );
}

function LocationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B5D4F4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: "2px" }}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B5D4F4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.12-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B5D4F4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B5D4F4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e8a020"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
