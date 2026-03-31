import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const FAQS_EN = [
  {
    q: "What are the library timings?",
    a: "The MEA Library is open Monday to Friday, 9:00 AM to 5:30 PM. The library remains closed on national holidays and gazetted holidays.",
  },
  {
    q: "How do I apply for library membership?",
    a: "MEA officials and staff can apply online via the Online Library Membership form. You will need your employee ID, department details, and a passport-size photograph.",
  },
  {
    q: "How can I access e-resources from home?",
    a: "E-resources are accessible via the MEA intranet or through VPN for posted officials. Contact the library for login credentials.",
  },
  {
    q: "What is a No Demand Certificate (NDC)?",
    a: "An NDC is a clearance certificate issued by the library confirming no pending dues or borrowed items. It is required at the time of transfer, posting, or superannuation.",
  },
  {
    q: "How do I recommend a book for purchase?",
    a: "Use the Online Book Recommendation form available on the homepage under Digital Services. Your recommendation will be reviewed by the collection development team.",
  },
  {
    q: "Who can I contact for assistance?",
    a: "For assistance, call +91-11-23012600 or email library@mea.gov.in. Library staff are available during working hours.",
  },
];

const FAQS_HI = [
  {
    q: "पुस्तकालय का समय क्या है?",
    a: "एमईए पुस्तकालय सोमवार से शुक्रवार, सुबह 9:00 बजे से शाम 5:30 बजे तक खुला रहता है। राष्ट्रीय अवकाश और राजपत्रित अवकाशों पर पुस्तकालय बंद रहता है।",
  },
  {
    q: "पुस्तकालय सदस्यता के लिए कैसे आवेदन करें?",
    a: "एमईए अधिकारी और कर्मचारी ऑनलाइन पुस्तकालय सदस्यता फ़ॉर्म के माध्यम से ऑनलाइन आवेदन कर सकते हैं। आपको कर्मचारी आईडी, विभाग विवरण और पासपोर्ट आकार की फ़ोटो की आवश्यकता होगी।",
  },
  {
    q: "घर से ई-संसाधन कैसे एक्सेस करें?",
    a: "ई-संसाधन एमईए इंट्रानेट या पदस्थ अधिकारियों के लिए वीपीएन के माध्यम से उपलब्ध हैं। लॉगिन क्रेडेंशियल के लिए पुस्तकालय से संपर्क करें।",
  },
  {
    q: "निःशुल्क मांग प्रमाणपत्र (NDC) क्या है?",
    a: "एनडीसी पुस्तकालय द्वारा जारी एक क्लियरेंस प्रमाणपत्र है जो पुष्टि करता है कि कोई लंबित बकाया नहीं है। स्थानांतरण, पदस्थापना या सेवानिवृत्ति के समय आवश्यक है।",
  },
  {
    q: "पुस्तक खरीद के लिए अनुशंसा कैसे करें?",
    a: "मुखपृष्ठ पर डिजिटल सेवाओं के अंतर्गत उपलब्ध ऑनलाइन पुस्तक अनुशंसा फ़ॉर्म का उपयोग करें। आपकी अनुशंसा संग्रह विकास टीम द्वारा समीक्षा की जाएगी।",
  },
  {
    q: "सहायता के लिए किससे संपर्क करें?",
    a: "सहायता के लिए +91-11-23012600 पर कॉल करें या library@mea.gov.in पर ईमेल करें। पुस्तकालय कर्मचारी कार्य समय के दौरान उपलब्ध हैं।",
  },
];

export default function ChatbotWidget() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const FAQS = isHi ? FAQS_HI : FAQS_EN;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (i: number) =>
    setActiveIndex((prev) => (prev === i ? null : i));

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[340px] max-h-[480px] bg-white border border-border rounded flex flex-col overflow-hidden shadow-lg"
          aria-label={isHi ? "पुस्तकालय से पूछें FAQ" : "Ask Librarian FAQ"}
        >
          {/* Header */}
          <div className="bg-olive text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ChatBookIcon />
              <span className="font-semibold text-sm">
                {isHi ? "पुस्तकालय से पूछें" : "Ask Librarian"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label={isHi ? "बंद करें" : "Close FAQ panel"}
            >
              ✕
            </button>
          </div>

          {/* FAQ list */}
          <div className="flex-1 overflow-y-auto">
            <p className="px-4 py-3 text-xs text-[#666] border-b border-border bg-[#FAFAF7]">
              {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
            </p>
            {FAQS.map((faq, i) => (
              <div
                key={faq.q}
                className="border-b border-border last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-[#F5F3EE] transition-colors"
                  aria-expanded={activeIndex === i}
                >
                  <span className="text-xs font-semibold text-olive leading-snug flex-1">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 text-saffron text-base font-bold mt-0.5 transition-transform ${
                      activeIndex === i ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {activeIndex === i && (
                  <div className="px-4 pb-3 pt-0">
                    <p className="text-xs text-[#444] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Contact strip */}
            <div className="px-4 py-3 bg-[#F5F3EE] border-t border-border text-[11px] text-[#555] flex flex-col gap-1">
              <span>📞 +91-11-23012600</span>
              <span>✉ library@mea.gov.in</span>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 bg-olive text-white rounded-full flex items-center justify-center hover:bg-olive-dark transition-colors"
        aria-label={isHi ? "पुस्तकालय से पूछें" : "Ask Librarian"}
        aria-expanded={open}
      >
        <ChatBookIcon size={24} />
      </button>
      {!open && (
        <span className="text-xs text-white bg-olive px-2 py-1 rounded font-medium -mt-1 pointer-events-none">
          {isHi ? "पुस्तकालय से पूछें" : "Ask Librarian"}
        </span>
      )}
    </div>
  );
}

function ChatBookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M9 7h6M9 11h4" />
    </svg>
  );
}
