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

const IR_DATABASES_EN = [
  "JSTOR \u2013 Scholarly Journals",
  "ProQuest Political Science",
  "UN iLibrary",
  "World Bank Open Data",
  "SIPRI Databases",
  "Oxford Reference Online",
];
const IR_DATABASES_HI = [
  "JSTOR \u2013 शैक्षणिक जर्नल",
  "ProQuest राजनीति विज्ञान",
  "संयुक्त राष्ट्र आई-लाइब्रेरी",
  "विश्व बैंक ओपन डेटा",
  "SIPRI डेटाबेस",
  "ऑक्सफ़र्ड रेफ़रेंस ऑनलाइन",
];

const ARCHIVAL_EN = [
  "MEA Annual Reports Archive",
  "Indian Treaties Collection",
  "Foreign Affairs Records 1947\u2013",
  "Commonwealth Documents",
  "SAARC Archives",
  "Bilateral Agreements Database",
];
const ARCHIVAL_HI = [
  "एमईए वार्षिक रिपोर्ट अभिलेखागार",
  "भारतीय संधि संग्रह",
  "विदेश मामलों के अभिलेख 1947\u2013",
  "राष्ट्रमंडल दस्तावेज़",
  "सार्क अभिलेखागार",
  "द्विपक्षीय समझौता डेटाबेस",
];

const NEWSPAPERS_EN = [
  "The Hindu",
  "Indian Express",
  "Times of India",
  "Financial Times",
  "The Guardian",
  "New York Times",
];
const NEWSPAPERS_HI = [
  "द हिंदू",
  "इंडियन एक्सप्रेस",
  "टाइम्स ऑफ़ इंडिया",
  "फ़ाइनेंशियल टाइम्स",
  "द गार्डियन",
  "न्यूयॉर्क टाइम्स",
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
    title: "Library remains closed on 25 March (National Holiday)",
    desc: "The MEA Library will remain closed on 25 March 2026 on account of Holi.",
  },
  {
    date: "20 Mar 2026",
    title: "New batch of diplomatic law books received",
    desc: "MEA Library has received 240 new titles in international law and diplomacy.",
  },
  {
    date: "15 Mar 2026",
    title: "PressReader access extended to all MEA missions",
    desc: "The PressReader digital subscription is now available to all Indian missions abroad.",
  },
  {
    date: "10 Mar 2026",
    title: "E-thesis portal integrated with OPAC",
    desc: "Students and researchers can now access e-theses directly through the OPAC portal.",
  },
  {
    date: "05 Mar 2026",
    title: "Tender notice for library automation project",
    desc: "Applications invited for library management system upgrade. Last date: 30 March 2026.",
  },
];

const ANNOUNCEMENTS_HI = [
  {
    date: "24 मार्च 2026",
    title: "25 मार्च को पुस्तकालय बंद (राष्ट्रीय अवकाश)",
    desc: "एमईए पुस्तकालय होली के अवसर पर 25 मार्च 2026 को बंद रहेगा।",
  },
  {
    date: "20 मार्च 2026",
    title: "कूटनीतिक विधि पुस्तकों की नई खेप प्राप्त",
    desc: "एमईए पुस्तकालय को अंतर्राष्ट्रीय विधि और कूटनीति में 240 नए शीर्षक प्राप्त हुए हैं।",
  },
  {
    date: "15 मार्च 2026",
    title: "PressReader की पहुंच सभी एमईए मिशनों तक बढ़ाई गई",
    desc: "PressReader की डिजिटल सदस्यता अब विदेश में सभी भारतीय मिशनों को उपलब्ध है।",
  },
  {
    date: "10 मार्च 2026",
    title: "ई-थीसिस पोर्टल OPAC के साथ एकीकृत",
    desc: "छात्र और शोधकर्ता अब OPAC पोर्टल के माध्यम से सीधे ई-थीसिस तक पहुंच सकते हैं।",
  },
  {
    date: "05 मार्च 2026",
    title: "पुस्तकालय स्वचालन परियोजना के लिए टेंडर सूचना",
    desc: "पुस्तकालय प्रबंधन प्रणाली उन्नयन के लिए आवेदन आमंत्रित। अंतिम तिथि: 30 मार्च 2026।",
  },
];

const TENDERS_EN = [
  {
    tag: "Tender",
    title: "Library Automation System Upgrade",
    date: "Last date: 30 Mar 2026",
  },
  {
    tag: "Notice",
    title: "Recruitment: Library Assistant Posts",
    date: "Last date: 15 Apr 2026",
  },
  {
    tag: "Tender",
    title: "Annual Maintenance Contract \u2013 HVAC",
    date: "Last date: 20 Apr 2026",
  },
  {
    tag: "Circular",
    title: "New Access Policy for Research Scholars",
    date: "Effective: 01 Apr 2026",
  },
];
const TENDERS_HI = [
  {
    tag: "टेंडर",
    title: "पुस्तकालय स्वचालन प्रणाली उन्नयन",
    date: "अंतिम तिथि: 30 मार्च 2026",
  },
  {
    tag: "सूचना",
    title: "भर्ती: पुस्तकालय सहायक पद",
    date: "अंतिम तिथि: 15 अप्रैल 2026",
  },
  {
    tag: "टेंडर",
    title: "वार्षिक रखरखाव अनुबंध \u2013 HVAC",
    date: "अंतिम तिथि: 20 अप्रैल 2026",
  },
  {
    tag: "परिपत्र",
    title: "शोध विद्वानों के लिए नई पहुंच नीति",
    date: "प्रभावी: 01 अप्रैल 2026",
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
    title: "Bilateral Trade Agreement \u2013 Japan, 1958",
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
    title: "Historical Map of South Asia \u2013 1947",
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
    title: "Official Gazette \u2013 Foreign Affairs Act",
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
    title: "द्विपक्षीय व्यापार समझौता \u2013 जापान, 1958",
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
    title: "दक्षिण एशिया का ऐतिहासिक मानचित्र \u2013 1947",
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
    title: "आधिकारिक गजट \u2013 विदेश मामले अधिनियम",
    date: "26 जनवरी 1950",
    tag: "गजट अभिलेख",
  },
];

export default function HomePage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const [slide, setSlide] = useState(0);

  const slides = isHi ? SLIDES_HI : SLIDES_EN;
  const readingRoom = isHi ? READING_ROOM_HI : READING_ROOM_EN;
  const irDatabases = isHi ? IR_DATABASES_HI : IR_DATABASES_EN;
  const archivalDb = isHi ? ARCHIVAL_HI : ARCHIVAL_EN;
  const newspapers = isHi ? NEWSPAPERS_HI : NEWSPAPERS_EN;
  const digitalServices = isHi ? DIGITAL_SERVICES_HI : DIGITAL_SERVICES_EN;
  const announcements = isHi ? ANNOUNCEMENTS_HI : ANNOUNCEMENTS_EN;
  const tenders = isHi ? TENDERS_HI : TENDERS_EN;
  const archivalItems = isHi ? ARCHIVAL_ITEMS_HI : ARCHIVAL_ITEMS_EN;

  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div id="main-content">
      {/* Hero Slider */}
      <section
        className="relative h-[420px] overflow-hidden"
        aria-label={isHi ? "हीरो बैनर" : "Hero banner"}
      >
        {slides.map((s, i) => (
          <div
            key={s.img}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== slide}
          >
            <img
              src={s.img}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
          </div>
        ))}
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full h-full flex items-center">
          <div className="max-w-2xl">
            <p className="text-saffron text-xs uppercase tracking-[0.15em] font-semibold mb-3">
              {isHi ? "विदेश मंत्रालय" : "Ministry of External Affairs"}
            </p>
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              {slides[slide].title}
            </h1>
            <p className="text-white/80 text-lg mb-8">
              {slides[slide].subtitle}
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                className="px-6 py-2.5 bg-saffron text-white font-semibold text-sm rounded hover:bg-saffron-light transition-colors"
              >
                {isHi ? "संग्रह देखें" : "Browse Collections"}
              </button>
              <button
                type="button"
                className="px-6 py-2.5 border-2 border-white text-white font-semibold text-sm rounded hover:bg-white/10 transition-colors"
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
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 text-white rounded-full hover:bg-white/30 z-10 text-2xl leading-none"
          aria-label={isHi ? "पिछला स्लाइड" : "Previous slide"}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setSlide((s) => (s + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 text-white rounded-full hover:bg-white/30 z-10 text-2xl leading-none"
          aria-label={isHi ? "अगला स्लाइड" : "Next slide"}
        >
          ›
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((s, i) => (
            <button
              key={s.img}
              type="button"
              onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === slide ? "bg-saffron" : "bg-white/50"}`}
              aria-label={`${isHi ? "स्लाइड" : "Slide"} ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* MEA Reading Room */}
      <section
        className="bg-[#F5F3EE] py-12 px-4"
        aria-labelledby="reading-room-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="reading-room-heading"
            className="text-xl font-bold text-olive mb-2"
          >
            {isHi ? "एमईए पठन कक्ष" : "MEA Reading Room"}
          </h2>
          <div className="w-12 h-1 bg-saffron mb-8" aria-hidden="true" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {readingRoom.map((card) => (
              <div
                key={card.title}
                className="bg-white border border-border rounded p-5 flex flex-col"
              >
                <h3 className="font-semibold text-olive text-sm mb-2">
                  {card.title}
                </h3>
                <p className="text-[#555] text-sm leading-relaxed flex-1">
                  {card.desc}
                </p>
                <button
                  type="button"
                  className="mt-4 self-start px-4 py-1.5 bg-olive text-white text-xs font-semibold rounded hover:bg-olive-dark transition-colors"
                >
                  {isHi ? "अभी पहुंचें" : "Access Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section
        className="bg-white py-12 px-4"
        aria-labelledby="resources-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="resources-heading"
            className="text-xl font-bold text-olive mb-2"
          >
            {isHi ? "संसाधन" : "Resources"}
          </h2>
          <div className="w-12 h-1 bg-saffron mb-8" aria-hidden="true" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-olive text-sm uppercase tracking-wider mb-4">
                {isHi ? "आईआर डेटाबेस / डेटा स्रोत" : "IR Databases / Data Sources"}
              </h3>
              <ul className="space-y-2">
                {irDatabases.map((item) => (
                  <li key={item}>
                    <span className="flex items-center gap-2 text-sm text-[#333] cursor-pointer hover:text-saffron">
                      <span className="text-saffron text-xs">↗</span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-olive text-sm uppercase tracking-wider mb-4">
                {isHi ? "अभिलेखागार डेटाबेस" : "Archival Databases"}
              </h3>
              <ul className="space-y-2">
                {archivalDb.map((item) => (
                  <li key={item}>
                    <span className="flex items-center gap-2 text-sm text-[#333] cursor-pointer hover:text-saffron">
                      <span className="text-saffron text-xs">↗</span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-olive text-sm uppercase tracking-wider mb-4">
                {isHi
                  ? "ऑनलाइन समाचार पत्र एवं पत्रिकाएं"
                  : "Online Newspapers & Magazines"}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {newspapers.map((name) => (
                  <div
                    key={name}
                    className="h-14 border border-border rounded flex items-center justify-center"
                  >
                    <span className="text-[10px] text-center text-[#888] px-1 leading-tight">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Services */}
      <section
        className="bg-[#FAFAF7] py-12 px-4"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="services-heading"
            className="text-xl font-bold text-olive mb-2"
          >
            {isHi ? "डिजिटल सेवाएं" : "Digital Services"}
          </h2>
          <div className="w-12 h-1 bg-saffron mb-8" aria-hidden="true" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {digitalServices.map((svc) => (
              <div
                key={svc.title}
                className="bg-white border border-border rounded p-6 flex flex-col"
                style={{ borderTop: "4px solid #FF9933" }}
              >
                <div className="text-olive mb-3">
                  <svc.icon />
                </div>
                <h3 className="font-semibold text-olive mb-2">{svc.title}</h3>
                <p className="text-[#555] text-sm flex-1 mb-4">{svc.desc}</p>
                <Link
                  to={svc.href}
                  className="self-start px-4 py-1.5 bg-olive text-white text-sm font-semibold rounded hover:bg-olive-dark transition-colors"
                >
                  {isHi ? "अभी आवेदन करें" : "Apply Now"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements – 2-column layout */}
      <section
        className="bg-white py-12 px-4"
        aria-labelledby="announcements-heading"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Left – Announcements */}
          <div>
            <h2
              id="announcements-heading"
              className="text-xl font-bold text-olive mb-2"
            >
              {isHi ? "घोषणाएं एवं ताज़ा समाचार" : "Announcements & Latest News"}
            </h2>
            <div className="w-12 h-1 bg-saffron mb-6" aria-hidden="true" />
            <div className="space-y-4">
              {announcements.map((item) => (
                <div
                  key={item.title}
                  className="pl-4 border-l-[3px] border-saffron pb-4 border-b border-b-border last:border-b-0"
                >
                  <span className="inline-block text-xs font-semibold text-saffron mb-1">
                    {item.date}
                  </span>
                  <h3 className="text-sm font-semibold text-olive mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/announcements"
              className="inline-block mt-5 text-sm text-olive font-semibold hover:text-saffron underline"
            >
              {isHi ? "सभी घोषणाएं देखें →" : "View All Announcements \u2192"}
            </Link>
          </div>

          {/* Right – Latest Tenders & Notices */}
          <aside aria-labelledby="tenders-side-heading">
            <h2
              id="tenders-side-heading"
              className="text-sm font-bold text-[#1E2B4A] uppercase tracking-wider mb-4"
            >
              {isHi ? "नवीनतम टेंडर एवं सूचनाएं" : "Latest Tenders & Notices"}
            </h2>
            <div className="w-8 h-1 bg-[#FF9933] mb-4" aria-hidden="true" />
            <ul className="space-y-0">
              {tenders.map((tender, i) => (
                <li
                  key={tender.title}
                  className={`py-3 ${i < tenders.length - 1 ? "border-b border-[#e0e0e0]" : ""}`}
                >
                  <span
                    className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded mb-1 ${
                      tender.tag === "Notice" || tender.tag === "सूचना"
                        ? "bg-[#2e7d32] text-white"
                        : tender.tag === "Circular" || tender.tag === "परिपत्र"
                          ? "bg-[#6a1a6a] text-white"
                          : "bg-[#1E2B4A] text-white"
                    }`}
                  >
                    {tender.tag}
                  </span>
                  <p className="text-xs font-semibold text-[#1E2B4A] leading-snug mb-0.5">
                    {tender.title}
                  </p>
                  <p className="text-[10px] text-[#888]">{tender.date}</p>
                </li>
              ))}
            </ul>
            <Link
              to="/tenders"
              className="inline-block mt-4 text-sm text-olive font-semibold hover:text-saffron underline"
            >
              {isHi ? "सभी टेंडर देखें →" : "View All Tenders \u2192"}
            </Link>
          </aside>
        </div>
      </section>

      {/* New Arrivals Carousel */}
      <NewArrivalsCarousel items={archivalItems} isHi={isHi} />

      {/* Government Initiatives Banner */}
      <section
        className="bg-white py-8 px-4"
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
      className="bg-[#F5F3EE] py-12 px-4"
      aria-labelledby="archivals-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="archivals-heading"
          className="text-xl font-bold text-olive mb-2"
        >
          {isHi ? "नई प्रविष्टियां" : "New Arrivals"}
        </h2>
        <div className="w-12 h-1 bg-saffron mb-8" aria-hidden="true" />
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
                className="bg-white border border-border rounded overflow-hidden flex flex-col"
              >
                <div className="overflow-hidden h-[180px]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-olive px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-[#888]">{item.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-olive leading-snug mb-3 flex-1">
                    {item.title}
                  </h3>
                  <button
                    type="button"
                    className="text-xs font-semibold text-saffron hover:text-olive transition-colors self-start"
                  >
                    {isHi ? "विवरण देखें →" : "View Details \u2192"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[#ccc] bg-white rounded-full text-olive hover:border-olive hover:bg-olive hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xl"
            aria-label={isHi ? "पिछला" : "Previous archival"}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[#ccc] bg-white rounded-full text-olive hover:border-olive hover:bg-olive hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xl"
            aria-label={isHi ? "अगला" : "Next archival"}
          >
            ›
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: positional dot indicator
              key={String(i)}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-saffron" : "bg-[#ccc]"}`}
              aria-label={`${isHi ? "स्लाइड" : "Slide"} ${i + 1}`}
            />
          ))}
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
