import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const SLIDES_EN = [
  {
    title: "Empowering Diplomacy Through Knowledge",
    subtitle: "Your gateway to global information resources",
    img: "/assets/generated/hero-banner-1.dim_1400x500.jpg",
  },
  {
    title: "India's Diplomatic Heritage at Your Fingertips",
    subtitle: "Explore 70+ years of foreign policy research and documentation",
    img: "/assets/generated/hero-banner-2.dim_1400x500.jpg",
  },
  {
    title: "Connect with the World's Knowledge",
    subtitle:
      "50,000+ books, journals, and digital resources for MEA officials",
    img: "/assets/generated/hero-banner-3.dim_1400x500.jpg",
  },
];

const SLIDES_HI = [
  {
    title: "ज्ञान के माध्यम से कूटनीति को सशक्त बनाना",
    subtitle: "वैश्विक सूचना संसाधनों का आपका प्रवेश द्वार",
    img: "/assets/generated/hero-banner-1.dim_1400x500.jpg",
  },
  {
    title: "आपकी उंगलियों पर भारत की कूटनीतिक विरासत",
    subtitle: "विदेश नीति अनुसंधान और दस्तावेज़ीकरण के 70+ वर्षों का अन्वेषण करें",
    img: "/assets/generated/hero-banner-2.dim_1400x500.jpg",
  },
  {
    title: "विश्व के ज्ञान से जुड़ें",
    subtitle: "एमईए अधिकारियों के लिए 50,000+ पुस्तकें, पत्रिकाएं और डिजिटल संसाधन",
    img: "/assets/generated/hero-banner-3.dim_1400x500.jpg",
  },
];

const READING_ROOM_EN = [
  {
    title: "Online Newspapers & Magazines",
    desc: "Access leading national and international newspapers and magazines digitally.",
  },
  {
    title: "Online Journals",
    desc: "Full-text access to peer-reviewed journals in International Relations, Law, Economics and more.",
  },
  {
    title: "E-Books",
    desc: "Browse and read thousands of e-books on diplomacy, foreign policy, and world affairs.",
  },
  {
    title: "PressReader",
    desc: "Unlimited access to 7,000+ newspapers and magazines from 100+ countries via PressReader.",
  },
];

const READING_ROOM_HI = [
  {
    title: "ऑनलाइन समाचार पत्र एवं पत्रिकाएं",
    desc: "राष्ट्रीय और अंतर्राष्ट्रीय अग्रणी समाचार पत्रों और पत्रिकाओं तक डिजिटल पहुंच।",
  },
  {
    title: "ऑनलाइन जर्नल",
    desc: "अंतर्राष्ट्रीय संबंध, कानून, अर्थशास्त्र आदि में समीक्षा पत्रिकाओं तक पूर्ण-पाठ पहुंच।",
  },
  {
    title: "ई-बुक",
    desc: "कूटनीति, विदेश नीति और विश्व मामलों पर हज़ारों ई-पुस्तकें पढ़ें और डाउनलोड करें।",
  },
  {
    title: "प्रेस रीडर",
    desc: "प्रेस रीडर के माध्यम से 100+ देशों के 7,000+ समाचार पत्रों और पत्रिकाओं तक असीमित पहुंच।",
  },
];

const DIGITAL_SERVICES_EN = [
  {
    title: "Online Book Recommendation",
    desc: "Suggest books and resources for the library collection.",
    icon: RecommendIcon,
    href: "/" as const,
  },
  {
    title: "Online Library Membership",
    desc: "Apply for MEA Library membership for officials and staff.",
    icon: MembershipIcon,
    href: "/membership" as const,
  },
  {
    title: "No Demand Certificate (NDC)",
    desc: "Request NDC at the time of transfer, posting, or superannuation.",
    icon: CertIcon,
    href: "/ndc" as const,
  },
];
const DIGITAL_SERVICES_HI = [
  {
    title: "ऑनलाइन पुस्तक अनुशंसा",
    desc: "पुस्तकालय संग्रह के लिए पुस्तकें और संसाधन सुझाएं।",
    icon: RecommendIcon,
    href: "/" as const,
  },
  {
    title: "ऑनलाइन पुस्तकालय सदस्यता",
    desc: "एमईए अधिकारियों और कर्मचारियों के लिए सदस्यता आवेदन करें।",
    icon: MembershipIcon,
    href: "/membership" as const,
  },
  {
    title: "निःशुल्क मांग प्रमाणपत्र (NDC)",
    desc: "स्थानांतरण, पदस्थापना या सेवानिवृत्ति के समय NDC के लिए अनुरोध करें।",
    icon: CertIcon,
    href: "/ndc" as const,
  },
];

const ANNOUNCEMENTS_EN = [
  {
    date: "24 Mar 2026",
    category: "Notice",
    title: "Library remains closed on 25 March (National Holiday)",
    desc: "The MEA Library will remain closed on 25 March 2026 on account of Holi. Members are requested to plan their visits accordingly.",
    isNew: true,
  },
  {
    date: "20 Mar 2026",
    category: "Notice",
    title: "New batch of diplomatic law books received",
    desc: "MEA Library has received 240 new titles in international law and diplomacy. Catalogue entries will be updated within 3 working days.",
    isNew: false,
  },
  {
    date: "15 Mar 2026",
    category: "Circular",
    title: "PressReader access extended to all MEA missions",
    desc: "The PressReader digital subscription is now available to all Indian missions abroad. Contact your mission library coordinator for access details.",
    isNew: false,
  },
  {
    date: "10 Mar 2026",
    category: "Notice",
    title: "E-thesis portal integrated with OPAC",
    desc: "Students and researchers can now access e-theses directly through the OPAC portal. Over 4,500 theses are now searchable.",
    isNew: false,
  },
  {
    date: "05 Mar 2026",
    category: "Circular",
    title: "Tender notice for library automation project",
    desc: "Applications invited for library management system upgrade. Eligible vendors may submit their bids. Last date: 30 March 2026.",
    isNew: false,
  },
];

const ANNOUNCEMENTS_HI = [
  {
    date: "24 मार्च 2026",
    category: "सूचना",
    title: "25 मार्च को पुस्तकालय बंद (राष्ट्रीय अवकाश)",
    desc: "एमईए पुस्तकालय होली के अवसर पर 25 मार्च 2026 को बंद रहेगा। सदस्यों से अनुरोध है कि अपनी यात्राओं की योजना बनाएं।",
    isNew: true,
  },
  {
    date: "20 मार्च 2026",
    category: "सूचना",
    title: "कूटनीतिक विधि पुस्तकों की नई खेप प्राप्त",
    desc: "एमईए पुस्तकालय को अंतर्राष्ट्रीय विधि और कूटनीति में 240 नए शीर्षक प्राप्त हुए हैं।",
    isNew: false,
  },
  {
    date: "15 मार्च 2026",
    category: "परिपत्र",
    title: "PressReader की पहुंच सभी एमईए मिशनों तक बढ़ाई गई",
    desc: "PressReader की डिजिटल सदस्यता अब विदेश में सभी भारतीय मिशनों को उपलब्ध है।",
    isNew: false,
  },
  {
    date: "10 मार्च 2026",
    category: "सूचना",
    title: "ई-थीसिस पोर्टल OPAC के साथ एकीकृत",
    desc: "छात्र और शोधकर्ता अब OPAC पोर्टल के माध्यम से सीधे ई-थीसिस तक पहुंच सकते हैं।",
    isNew: false,
  },
  {
    date: "05 मार्च 2026",
    category: "परिपत्र",
    title: "पुस्तकालय स्वचालन परियोजना के लिए टेंडर सूचना",
    desc: "पुस्तकालय प्रबंधन प्रणाली उन्नयन के लिए आवेदन आमंत्रित। अंतिम तिथि: 30 मार्च 2026।",
    isNew: false,
  },
];

const NEWS_EN = [
  {
    date: "30 Mar 2026",
    category: "Press Release",
    title: "MEA Library digitizes rare diplomatic documents from 1947–1960",
    desc: "Over 2,000 rare diplomatic records have been scanned and indexed as part of the MEA Digital Heritage Initiative.",
    isNew: true,
  },
  {
    date: "22 Mar 2026",
    category: "Media Coverage",
    title: "MEA Library featured in National Archives symposium",
    desc: "The library's archival digitization project was highlighted as a model for government knowledge preservation.",
    isNew: false,
  },
  {
    date: "18 Mar 2026",
    category: "Update",
    title: "New journal subscriptions added for April 2026",
    desc: "Six new international relations journals added via MyLOFT. Officers may request access through the library portal.",
    isNew: false,
  },
  {
    date: "12 Mar 2026",
    category: "Press Release",
    title: "Hindi book collection expanded with 500 new titles",
    desc: "The Hindi diplomacy and policy section now holds over 3,200 titles following the latest acquisition drive.",
    isNew: false,
  },
  {
    date: "06 Mar 2026",
    category: "Update",
    title: "OPAC system upgraded to version 8.3",
    desc: "Faster search, improved subject filters, and a mobile-friendly interface are now live on the OPAC portal.",
    isNew: false,
  },
];

const NEWS_HI = [
  {
    date: "30 मार्च 2026",
    category: "प्रेस विज्ञप्ति",
    title: "एमईए पुस्तकालय ने 1947–1960 के दुर्लभ दस्तावेज़ डिजिटल किए",
    desc: "एमईए डिजिटल हेरिटेज पहल के तहत 2,000 से अधिक दुर्लभ कूटनीतिक अभिलेखों को स्कैन कर सूचीबद्ध किया गया।",
    isNew: true,
  },
  {
    date: "22 मार्च 2026",
    category: "मीडिया कवरेज",
    title: "राष्ट्रीय अभिलेखागार संगोष्ठी में एमईए पुस्तकालय चर्चित",
    desc: "पुस्तकालय की डिजिटलीकरण परियोजना को सरकारी ज्ञान संरक्षण के मॉडल के रूप में उजागर किया गया।",
    isNew: false,
  },
  {
    date: "18 मार्च 2026",
    category: "अद्यतन",
    title: "अप्रैल 2026 के लिए नई जर्नल सदस्यताएं जोड़ी गईं",
    desc: "MyLOFT के माध्यम से छह नए अंतर्राष्ट्रीय संबंध जर्नल जोड़े गए हैं।",
    isNew: false,
  },
  {
    date: "12 मार्च 2026",
    category: "प्रेस विज्ञप्ति",
    title: "हिंदी पुस्तक संग्रह में 500 नए शीर्षक जोड़े गए",
    desc: "नवीनतम अधिग्रहण के बाद हिंदी कूटनीति अनुभाग में अब 3,200 से अधिक शीर्षक हैं।",
    isNew: false,
  },
  {
    date: "06 मार्च 2026",
    category: "अद्यतन",
    title: "OPAC प्रणाली संस्करण 8.3 में अपग्रेड",
    desc: "तेज़ खोज, बेहतर विषय फ़िल्टर, और मोबाइल-अनुकूल इंटरफ़ेस अब OPAC पोर्टल पर लाइव हैं।",
    isNew: false,
  },
];

const ARCHIVAL_ITEMS_EN = [
  {
    img: "/assets/generated/new-arrival-book-1.dim_400x280.jpg",
    title: "Indo-Soviet Friendship Treaty, 1971",
    date: "12 Aug 1971",
    tag: "Treaty Archives",
  },
  {
    img: "/assets/generated/new-arrival-book-2.dim_400x280.jpg",
    title: "Bilateral Trade Agreement – Japan, 1958",
    date: "04 Mar 1958",
    tag: "Bilateral Records",
  },
  {
    img: "/assets/generated/new-arrival-book-3.dim_400x280.jpg",
    title: "MEA Library Physical Archives Collection",
    date: "Est. 1947",
    tag: "Library Records",
  },
  {
    img: "/assets/generated/new-arrival-book-4.dim_400x280.jpg",
    title: "Historical Map of South Asia – 1947",
    date: "15 Aug 1947",
    tag: "Cartographic Archive",
  },
  {
    img: "/assets/generated/new-arrival-book-5.dim_400x280.jpg",
    title: "Tashkent Declaration Signing, 1966",
    date: "10 Jan 1966",
    tag: "Photo Archive",
  },
  {
    img: "/assets/generated/new-arrival-book-6.dim_400x280.jpg",
    title: "Official Gazette – Foreign Affairs Act",
    date: "26 Jan 1950",
    tag: "Gazette Records",
  },
];
const ARCHIVAL_ITEMS_HI = [
  {
    img: "/assets/generated/new-arrival-book-1.dim_400x280.jpg",
    title: "भारत-सोवियत मैत्री संधि, 1971",
    date: "12 अगस्त 1971",
    tag: "संधि अभिलेखागार",
  },
  {
    img: "/assets/generated/new-arrival-book-2.dim_400x280.jpg",
    title: "द्विपक्षीय व्यापार समझौता – जापान, 1958",
    date: "04 मार्च 1958",
    tag: "द्विपक्षीय अभिलेख",
  },
  {
    img: "/assets/generated/new-arrival-book-3.dim_400x280.jpg",
    title: "एमईए पुस्तकालय भौतिक अभिलेखागार संग्रह",
    date: "स्था. 1947",
    tag: "पुस्तकालय अभिलेख",
  },
  {
    img: "/assets/generated/new-arrival-book-4.dim_400x280.jpg",
    title: "दक्षिण एशिया का ऐतिहासिक मानचित्र – 1947",
    date: "15 अगस्त 1947",
    tag: "मानचित्रीय अभिलेख",
  },
  {
    img: "/assets/generated/new-arrival-book-5.dim_400x280.jpg",
    title: "ताशकंद घोषणा हस्ताक्षर, 1966",
    date: "10 जनवरी 1966",
    tag: "फ़ोटो अभिलेखागार",
  },
  {
    img: "/assets/generated/new-arrival-book-6.dim_400x280.jpg",
    title: "आधिकारिक गजट – विदेश मामले अधिनियम",
    date: "26 जनवरी 1950",
    tag: "गजट अभिलेख",
  },
];

// Resource tab data
const IR_DB_ITEMS = [
  "Fitch Connect",
  "Jane's Online",
  "Economic Intelligence Unit",
  "BBC Monitoring",
  "Statista",
];
const ARCHIVAL_DB_ITEMS = ["JSTOR", "ProQuest Historical Newspapers"];
const NEWSPAPERS_ITEMS = [
  "The Hindu",
  "Financial Times",
  "The Diplomat",
  "Foreign Affairs",
  "The Wall Street Journal",
  "The New York Times",
  "Foreign Policy",
  "Nikkei Asian Review",
  "The Economist",
];
const JOURNALS_ITEMS = [
  "Taylor & Francis Group",
  "Oxford University Press",
  "Cambridge University Press",
  "Middle East Journal",
  "Economic and Political Weekly",
];
const EBOOKS_ITEMS = ["Bloomsbury", "Sage eVidya (Hindi)", "Libby"];
const PRINT_BOOKS_ITEMS = [
  "Rare Books Collection",
  "Indian Diplomatic Heritage Collection (IDHC)",
  "General Collection",
];

const RESOURCE_TABS_EN = [
  "IR Databases",
  "Archival Databases",
  "Online Newspapers & Magazines",
  "Online Journals",
  "E-Books",
  "Print Books",
];
const RESOURCE_TABS_HI = [
  "आईआर डेटाबेस",
  "अभिलेखागार डेटाबेस",
  "ऑनलाइन समाचार पत्र",
  "ऑनलाइन जर्नल",
  "ई-बुक",
  "प्रिंट पुस्तकें",
];

function ExternalLinkIcon({ color = "#003580" }: { color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ResourceListItem({
  name,
  access = "MyLOFT",
}: { name: string; access?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-center justify-between py-3 border-b border-[#edf0f7] last:border-0 cursor-pointer rounded-md px-3 -mx-3 transition-all duration-150"
      style={{
        background: hovered ? "#EEF3FC" : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="flex items-center gap-2">
        <ExternalLinkIcon color={hovered ? "#FF9933" : "#003580"} />
        <span
          className="text-sm font-medium"
          style={{
            color: hovered ? "#FF9933" : "#003580",
            textDecoration: hovered ? "underline" : "none",
            transition: "color 0.15s ease",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {name}
        </span>
      </span>
      <span
        className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
        style={{
          background: "#E8F0FB",
          color: "#003580",
          letterSpacing: "0.04em",
        }}
      >
        via {access}
      </span>
    </div>
  );
}

function NewspaperCard({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg"
      style={{
        background: hovered ? "#FFF8F0" : "#fff",
        border: hovered ? "1.5px solid #FF9933" : "1.5px solid #E0E4EF",
        color: hovered ? "#e8871e" : "#003580",
        boxShadow: hovered
          ? "0 4px 12px rgba(0,53,128,0.09)"
          : "0 1px 4px rgba(0,53,128,0.05)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        transition: "all 0.18s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {name}
    </div>
  );
}

// Redesigned section heading component
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10">
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeAnnouncementTab, setActiveAnnouncementTab] = useState<
    "announcements" | "news"
  >("announcements");
  const [activeResourceTab, setActiveResourceTab] = useState(0);

  const slides = isHi ? SLIDES_HI : SLIDES_EN;
  const readingRoom = isHi ? READING_ROOM_HI : READING_ROOM_EN;
  const digitalServices = isHi ? DIGITAL_SERVICES_HI : DIGITAL_SERVICES_EN;
  const announcements = isHi ? ANNOUNCEMENTS_HI : ANNOUNCEMENTS_EN;
  const news = isHi ? NEWS_HI : NEWS_EN;
  const archivalItems = isHi ? ARCHIVAL_ITEMS_HI : ARCHIVAL_ITEMS_EN;
  const resourceTabs = isHi ? RESOURCE_TABS_HI : RESOURCE_TABS_EN;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      6000,
    );
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div id="main-content">
      {/* ─── Hero Slider ─────────────────────────────── */}
      <section
        className="relative h-[220px] md:h-[300px] lg:h-[440px] overflow-hidden"
        aria-label={isHi ? "हीरो बैनर" : "Hero banner"}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((s, i) => (
          <div
            key={s.img}
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: i === slide ? 1 : 0 }}
            aria-hidden={i !== slide}
          >
            <img
              src={s.img}
              alt=""
              className="w-full h-full absolute inset-0 object-cover object-center"
              style={{ minWidth: "1920px", width: "100%" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,53,128,0.82) 42%, rgba(0,0,0,0.18) 100%)",
              }}
              aria-hidden="true"
            />
          </div>
        ))}

        <div className="relative z-10 w-full h-full flex items-center">
          <div className="max-w-[580px] pl-[30px] md:pl-[64px] pr-4">
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FF9933",
                marginBottom: "10px",
              }}
            >
              {isHi ? "विदेश मंत्रालय" : "Ministry of External Affairs"}
            </p>
            <h1
              className="text-white font-bold leading-tight mb-3"
              style={{
                fontSize: "clamp(22px, 3vw, 40px)",
                fontFamily: "'Playfair Display', 'Noto Sans', serif",
                textShadow: "0 2px 16px rgba(0,0,0,0.4)",
              }}
            >
              {slides[slide].title}
            </h1>
            <p
              className="text-white"
              style={{
                fontSize: "17px",
                opacity: 0.92,
                fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif",
                fontWeight: 400,
              }}
            >
              {slides[slide].subtitle}
            </p>
            <div className="flex gap-4 flex-wrap" style={{ marginTop: "28px" }}>
              <button
                type="button"
                data-ocid="hero.primary_button"
                style={{
                  background: "#FF9933",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "10px 22px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "0.02em",
                  boxShadow: "0 2px 10px rgba(255,153,51,0.35)",
                  transition: "background 0.18s ease, box-shadow 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#e8871e";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#FF9933";
                }}
              >
                {isHi ? "संग्रह देखें" : "Browse Collections"}
              </button>
              <button
                type="button"
                data-ocid="hero.secondary_button"
                style={{
                  background: "transparent",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "9px 22px",
                  borderRadius: "4px",
                  border: "2px solid rgba(255,255,255,0.75)",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "background 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                {isHi ? "ई-संसाधन देखें" : "Explore E-Resources"}
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setSlide((s) => (s - 1 + slides.length) % slides.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border border-[#003580] rounded-full text-[#003580] hover:bg-[#003580] hover:text-white transition-all duration-200 z-10 text-2xl leading-none"
          aria-label={isHi ? "पिछला स्लाइड" : "Previous slide"}
          data-ocid="hero.pagination_prev"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setSlide((s) => (s + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border border-[#003580] rounded-full text-[#003580] hover:bg-[#003580] hover:text-white transition-all duration-200 z-10 text-2xl leading-none"
          aria-label={isHi ? "अगला स्लाइड" : "Next slide"}
          data-ocid="hero.pagination_next"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((s, i) => (
            <button
              key={s.img}
              type="button"
              onClick={() => setSlide(i)}
              className="w-2.5 h-2.5 rounded-full transition-colors border border-white/40"
              style={{
                background: i === slide ? "#FF9933" : "rgba(255,255,255,0.6)",
              }}
              aria-label={`${isHi ? "स्लाइड" : "Slide"} ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── MEA Reading Room ───────────────────────── */}
      <section
        className="py-14 px-6"
        style={{ background: "oklch(0.97 0.005 250)" }}
        aria-labelledby="reading-room-heading"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label={isHi ? "डिजिटल संसाधन" : "Digital Resources"}
            title={isHi ? "एमईए पठन कक्ष" : "MEA Reading Room"}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {readingRoom.map((card) => (
              <div
                key={card.title}
                data-ocid="reading-room.card"
                className="bg-white rounded-lg p-5 flex flex-col cursor-pointer transition-all duration-200"
                style={{
                  borderTop: "3px solid #FF9933",
                  boxShadow: "0 2px 12px rgba(0,53,128,0.07)",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "scale(1.03)";
                  el.style.boxShadow = "0 8px 24px rgba(0,53,128,0.15)";
                  el.style.background = "#FFF8F0";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "";
                  el.style.boxShadow = "0 2px 12px rgba(0,53,128,0.07)";
                  el.style.background = "#fff";
                }}
              >
                <h3
                  className="font-semibold text-[#003580] text-sm mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#555] text-sm leading-relaxed flex-1">
                  {card.desc}
                </p>
                <button
                  type="button"
                  className="mt-4 self-start px-4 py-1.5 text-xs font-semibold rounded transition-colors"
                  style={{
                    background: "#003580",
                    color: "#fff",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.03em",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#FF9933";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#003580";
                  }}
                >
                  {isHi ? "अभी पहुंचें" : "Access Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── Resources – 6 Tabs ─────────────────────── */}
      <section
        className="bg-white py-14 px-6"
        aria-labelledby="resources-heading"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label={isHi ? "पुस्तकालय संग्रह" : "Library Collections"}
            title={isHi ? "संसाधन" : "Resources"}
          />

          {/* Pill-style Tab Bar */}
          <div
            role="tablist"
            aria-label={isHi ? "संसाधन श्रेणियां" : "Resource categories"}
            className="flex gap-2 mb-8 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {resourceTabs.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                role="tab"
                id={`resource-tab-${idx}`}
                aria-selected={activeResourceTab === idx}
                aria-controls={`resource-panel-${idx}`}
                data-ocid="resources.tab"
                onClick={() => setActiveResourceTab(idx)}
                className="text-sm whitespace-nowrap px-4 py-2 rounded-full flex-shrink-0 transition-all duration-200 border"
                style={{
                  background:
                    activeResourceTab === idx ? "#003580" : "transparent",
                  color: activeResourceTab === idx ? "#fff" : "#666",
                  fontWeight: activeResourceTab === idx ? 600 : 400,
                  borderColor:
                    activeResourceTab === idx ? "#003580" : "#D0D6E4",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          {/* Tab 0: IR Databases */}
          <div
            role="tabpanel"
            id="resource-panel-0"
            aria-labelledby="resource-tab-0"
            style={{
              display: activeResourceTab === 0 ? "block" : "none",
              opacity: activeResourceTab === 0 ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 max-w-2xl">
              {IR_DB_ITEMS.map((item) => (
                <ResourceListItem key={item} name={item} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#edf0f7]">
              <p className="text-xs text-[#888] italic">
                {isHi
                  ? "सभी संसाधन MyLOFT प्लेटफॉर्म के माध्यम से उपलब्ध"
                  : "All resources accessed via MyLOFT platform"}
              </p>
              <a
                href="https://mealibrary.gov.in"
                className="text-sm font-semibold transition-colors"
                style={{
                  color: "#FF9933",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#003580";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#FF9933";
                }}
              >
                {isHi ? "अभी पहुंचें →" : "Access Now →"}
              </a>
            </div>
          </div>

          {/* Tab 1: Archival Databases */}
          <div
            role="tabpanel"
            id="resource-panel-1"
            aria-labelledby="resource-tab-1"
            style={{
              display: activeResourceTab === 1 ? "block" : "none",
              opacity: activeResourceTab === 1 ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 max-w-2xl">
              {ARCHIVAL_DB_ITEMS.map((item) => (
                <ResourceListItem key={item} name={item} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#edf0f7]">
              <p className="text-xs text-[#888] italic">
                {isHi
                  ? "सभी संसाधन MyLOFT प्लेटफॉर्म के माध्यम से उपलब्ध"
                  : "All resources accessed via MyLOFT platform"}
              </p>
              <a
                href="https://mealibrary.gov.in"
                className="text-sm font-semibold transition-colors"
                style={{
                  color: "#FF9933",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#003580";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#FF9933";
                }}
              >
                {isHi ? "अभी पहुंचें →" : "Access Now →"}
              </a>
            </div>
          </div>

          {/* Tab 2: Online Newspapers & Magazines */}
          <div
            role="tabpanel"
            id="resource-panel-2"
            aria-labelledby="resource-tab-2"
            style={{
              display: activeResourceTab === 2 ? "block" : "none",
              opacity: activeResourceTab === 2 ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {NEWSPAPERS_ITEMS.map((item) => (
                <NewspaperCard key={item} name={item} />
              ))}
            </div>
            <div
              className="flex items-center gap-3 py-3 px-4 rounded-lg mt-2"
              style={{ background: "#EEF3FC", border: "1px solid #D0DCEF" }}
            >
              <span className="text-sm font-medium text-[#003580] flex-1">
                {isHi
                  ? "PressReader – अन्य समाचार पत्र और पत्रिकाएं MyLOFT के माध्यम से"
                  : "PressReader – Access other newspapers & magazines via MyLOFT"}
              </span>
              <a
                href="https://mealibrary.gov.in"
                className="text-sm font-semibold whitespace-nowrap"
                style={{
                  color: "#FF9933",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {isHi ? "पहुंचें →" : "Access →"}
              </a>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#edf0f7]">
              <p className="text-xs text-[#888] italic">
                {isHi
                  ? "सभी संसाधन MyLOFT के माध्यम से"
                  : "All resources accessed via MyLOFT"}
              </p>
            </div>
          </div>

          {/* Tab 3: Online Journals */}
          <div
            role="tabpanel"
            id="resource-panel-3"
            aria-labelledby="resource-tab-3"
            style={{
              display: activeResourceTab === 3 ? "block" : "none",
              opacity: activeResourceTab === 3 ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 max-w-2xl">
              {JOURNALS_ITEMS.map((item) => (
                <ResourceListItem key={item} name={item} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#edf0f7]">
              <p className="text-xs text-[#888] italic">
                {isHi
                  ? "सभी संसाधन MyLOFT प्लेटफॉर्म के माध्यम से उपलब्ध"
                  : "All resources accessed via MyLOFT platform"}
              </p>
              <a
                href="https://mealibrary.gov.in"
                className="text-sm font-semibold transition-colors"
                style={{
                  color: "#FF9933",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#003580";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#FF9933";
                }}
              >
                {isHi ? "अभी पहुंचें →" : "Access Now →"}
              </a>
            </div>
          </div>

          {/* Tab 4: E-Books */}
          <div
            role="tabpanel"
            id="resource-panel-4"
            aria-labelledby="resource-tab-4"
            style={{
              display: activeResourceTab === 4 ? "block" : "none",
              opacity: activeResourceTab === 4 ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 max-w-2xl">
              {EBOOKS_ITEMS.map((item) => (
                <ResourceListItem key={item} name={item} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#edf0f7]">
              <p className="text-xs text-[#888] italic">
                {isHi
                  ? "सभी संसाधन MyLOFT प्लेटफॉर्म के माध्यम से उपलब्ध"
                  : "All resources accessed via MyLOFT platform"}
              </p>
              <a
                href="https://mealibrary.gov.in"
                className="text-sm font-semibold transition-colors"
                style={{
                  color: "#FF9933",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#003580";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#FF9933";
                }}
              >
                {isHi ? "अभी पहुंचें →" : "Access Now →"}
              </a>
            </div>
          </div>

          {/* Tab 5: Print Books */}
          <div
            role="tabpanel"
            id="resource-panel-5"
            aria-labelledby="resource-tab-5"
            style={{
              display: activeResourceTab === 5 ? "block" : "none",
              opacity: activeResourceTab === 5 ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 max-w-2xl">
              {PRINT_BOOKS_ITEMS.map((item) => (
                <ResourceListItem key={item} name={item} access="OPAC" />
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#edf0f7]">
              <p className="text-xs text-[#888] italic">
                {isHi
                  ? "OPAC (ऑनलाइन सार्वजनिक एक्सेस कैटलॉग) के माध्यम से मुद्रित पुस्तक कैटलॉग खोजें"
                  : "Search print book catalogue via Online Public Access Catalogue (OPAC)"}
              </p>
              <a
                href="https://mealibrary.gov.in"
                className="text-sm font-semibold transition-colors"
                style={{
                  color: "#FF9933",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#003580";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#FF9933";
                }}
              >
                {isHi ? "OPAC में खोजें →" : "Search OPAC →"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── Digital Services ───────────────────────── */}
      <section
        className="py-14 px-6"
        style={{ background: "oklch(0.97 0.005 250)" }}
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label={isHi ? "ऑनलाइन सेवाएं" : "Online Services"}
            title={isHi ? "डिजिटल सेवाएं" : "Digital Services"}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {digitalServices.map((svc) => (
              <div
                key={svc.title}
                className="bg-white rounded-lg p-6 flex flex-col cursor-pointer transition-all duration-200"
                style={{
                  borderTop: "3px solid #FF9933",
                  boxShadow: "0 2px 12px rgba(0,53,128,0.07)",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "scale(1.03)";
                  el.style.boxShadow = "0 8px 24px rgba(0,53,128,0.15)";
                  el.style.background = "#FFF8F0";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "";
                  el.style.boxShadow = "0 2px 12px rgba(0,53,128,0.07)";
                  el.style.background = "#fff";
                }}
              >
                <div className="text-[#003580] mb-4 opacity-80">
                  <svc.icon />
                </div>
                <h3
                  className="font-semibold text-[#003580] mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {svc.title}
                </h3>
                <p className="text-[#555] text-sm flex-1 mb-5 leading-relaxed">
                  {svc.desc}
                </p>
                <Link
                  to={svc.href}
                  className="self-start px-4 py-2 text-white text-xs font-semibold rounded transition-colors"
                  style={{
                    background: "#FF9933",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.03em",
                  }}
                  data-ocid="services.primary_button"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#003580";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#FF9933";
                  }}
                >
                  {isHi ? "अभी आवेदन करें" : "Apply Now"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── Announcements & News – Tab UI ─────────── */}
      <section
        className="bg-white py-8 px-6"
        aria-labelledby="announcements-heading"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label={isHi ? "नवीनतम अपडेट" : "Latest Updates"}
            title={isHi ? "घोषणाएं एवं समाचार" : "Announcements & News"}
          />

          {/* Pill-style Tab Bar */}
          <div
            role="tablist"
            aria-label={
              isHi ? "घोषणाएं एवं समाचार टैब" : "Announcements and News tabs"
            }
            className="flex gap-2 mb-8"
          >
            <button
              type="button"
              role="tab"
              id="ann-tab-announcements"
              aria-selected={activeAnnouncementTab === "announcements"}
              aria-controls="ann-panel-announcements"
              data-ocid="announcements.tab"
              onClick={() => setActiveAnnouncementTab("announcements")}
              className="px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200"
              style={{
                background:
                  activeAnnouncementTab === "announcements"
                    ? "#003580"
                    : "transparent",
                color:
                  activeAnnouncementTab === "announcements" ? "#fff" : "#666",
                borderColor:
                  activeAnnouncementTab === "announcements"
                    ? "#003580"
                    : "#D0D6E4",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {isHi ? "घोषणाएं" : "Announcements"}
            </button>
            <button
              type="button"
              role="tab"
              id="ann-tab-news"
              aria-selected={activeAnnouncementTab === "news"}
              aria-controls="ann-panel-news"
              data-ocid="news.tab"
              onClick={() => setActiveAnnouncementTab("news")}
              className="px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200"
              style={{
                background:
                  activeAnnouncementTab === "news" ? "#003580" : "transparent",
                color: activeAnnouncementTab === "news" ? "#fff" : "#666",
                borderColor:
                  activeAnnouncementTab === "news" ? "#003580" : "#D0D6E4",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {isHi ? "समाचार" : "News"}
            </button>
          </div>

          {/* Announcements Panel */}
          <div
            role="tabpanel"
            id="ann-panel-announcements"
            aria-labelledby="ann-tab-announcements"
            style={{
              display:
                activeAnnouncementTab === "announcements" ? "block" : "none",
              opacity: activeAnnouncementTab === "announcements" ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          >
            <div className="space-y-3">
              {announcements.map((item, idx) => (
                <div
                  key={item.title}
                  data-ocid={`announcements.item.${idx + 1}`}
                  className="flex gap-0 rounded-lg overflow-hidden border border-[#E4EAF5] transition-all duration-200"
                  style={{ boxShadow: "0 1px 4px rgba(0,53,128,0.05)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 4px 14px rgba(0,53,128,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 1px 4px rgba(0,53,128,0.05)";
                  }}
                >
                  {/* Date column */}
                  <div
                    className="flex-shrink-0 flex flex-col items-center justify-center px-4 py-4 min-w-[80px]"
                    style={{ background: "#003580" }}
                  >
                    <span
                      className="text-white text-[11px] font-bold text-center leading-tight"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.date}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 px-4 py-3 bg-white">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {item.isNew && (
                        <span
                          className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "#138808", color: "#fff" }}
                        >
                          NEW
                        </span>
                      )}
                      <span
                        className="inline-block text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: "#E8F0FB", color: "#003580" }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3
                      className="text-[14px] font-semibold text-[#003580] mb-1 leading-snug"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#666] leading-relaxed truncate">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Link
                to="/announcements"
                className="text-sm font-semibold transition-colors"
                style={{
                  color: "#FF9933",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                data-ocid="announcements.link"
              >
                {isHi ? "सभी घोषणाएं देखें →" : "View All Announcements →"}
              </Link>
            </div>
          </div>

          {/* News Panel */}
          <div
            role="tabpanel"
            id="ann-panel-news"
            aria-labelledby="ann-tab-news"
            style={{
              display: activeAnnouncementTab === "news" ? "block" : "none",
              opacity: activeAnnouncementTab === "news" ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          >
            <div className="space-y-3">
              {news.map((item, idx) => (
                <div
                  key={item.title}
                  data-ocid={`news.item.${idx + 1}`}
                  className="flex gap-0 rounded-lg overflow-hidden border border-[#E4EAF5] transition-all duration-200"
                  style={{ boxShadow: "0 1px 4px rgba(0,53,128,0.05)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 4px 14px rgba(0,53,128,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 1px 4px rgba(0,53,128,0.05)";
                  }}
                >
                  {/* Date column */}
                  <div
                    className="flex-shrink-0 flex flex-col items-center justify-center px-4 py-4 min-w-[80px]"
                    style={{ background: "#003580" }}
                  >
                    <span
                      className="text-white text-[11px] font-bold text-center leading-tight"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.date}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 px-4 py-3 bg-white">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {item.isNew && (
                        <span
                          className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "#138808", color: "#fff" }}
                        >
                          NEW
                        </span>
                      )}
                      <span
                        className="inline-block text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: "#E8F0FB", color: "#003580" }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3
                      className="text-[14px] font-semibold text-[#003580] mb-1 leading-snug"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#666] leading-relaxed truncate">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <a
                href="https://mealibrary.gov.in"
                className="text-sm font-semibold transition-colors"
                style={{
                  color: "#FF9933",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                data-ocid="news.link"
              >
                {isHi ? "सभी समाचार देखें →" : "View All News →"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ─── New Arrivals Carousel ──────────────────── */}
      <NewArrivalsCarousel items={archivalItems} isHi={isHi} />

      <hr className="section-divider" />

      {/* ─── Government Initiatives Banner ─────────── */}
      <section
        className="bg-white py-8 px-6"
        aria-label={isHi ? "सरकारी पहल" : "Government Initiatives"}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
          <img
            src="/assets/image-019d3e56-d5d4-75e8-bda9-5d696b67013f.png"
            alt="Government of India Initiatives"
            className="w-full h-auto object-contain"
            style={{ maxWidth: "100%" }}
          />
        </div>
      </section>
    </div>
  );
}

function getVisibleCount() {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function NewArrivalsCarousel({
  items,
  isHi,
}: {
  items: typeof ARCHIVAL_ITEMS_EN;
  isHi: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((c) => (c + 1) % (total - visibleCount + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [total, visibleCount]);

  const maxIndex = Math.max(0, total - visibleCount);
  const prev = () => setCurrentIndex((c) => Math.max(0, c - 1));
  const next = () => setCurrentIndex((c) => Math.min(maxIndex, c + 1));
  const visibleItems = items.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section
      className="py-14 px-6"
      style={{ background: "oklch(0.97 0.005 250)" }}
      aria-labelledby="archivals-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label={isHi ? "अभिलेखागार संग्रह" : "Archival Collections"}
          title={isHi ? "नई प्रविष्टियां" : "New Arrivals"}
        />
        <div className="relative">
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
            }}
            aria-live="polite"
          >
            {visibleItems.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-200"
                style={{
                  boxShadow: "0 2px 12px rgba(0,53,128,0.07)",
                  borderLeft: "4px solid #FF9933",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 24px rgba(0,53,128,0.15)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 12px rgba(0,53,128,0.07)";
                  (e.currentTarget as HTMLDivElement).style.transform = "";
                }}
              >
                <div className="overflow-hidden h-[175px]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-300"
                    style={{ transition: "transform 0.3s ease" }}
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-full"
                      style={{ background: "#003580", letterSpacing: "0.06em" }}
                    >
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-[#888]">{item.date}</span>
                  </div>
                  <h3
                    className="text-sm font-semibold text-[#003580] leading-snug mb-3 flex-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <button
                    type="button"
                    className="text-xs font-semibold self-start transition-colors"
                    style={{
                      color: "#FF9933",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#003580";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#FF9933";
                    }}
                  >
                    {isHi ? "विवरण देखें →" : "View Details →"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows inside carousel */}
          <button
            type="button"
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border border-[#003580] rounded-full text-[#003580] hover:bg-[#003580] hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10 text-xl"
            aria-label={isHi ? "पिछला" : "Previous slide"}
            data-ocid="new-arrivals.pagination_prev"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border border-[#003580] rounded-full text-[#003580] hover:bg-[#003580] hover:text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10 text-xl"
            aria-label={isHi ? "अगला" : "Next slide"}
            data-ocid="new-arrivals.pagination_next"
          >
            ›
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, i) => `dot-${i}`).map(
            (dotKey, i) => (
              <button
                key={dotKey}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  background: i === currentIndex ? "#FF9933" : "#CBD5E1",
                }}
                aria-label={`${isHi ? "स्लाइड" : "Slide"} ${i + 1}`}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function RecommendIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
function MembershipIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function CertIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
