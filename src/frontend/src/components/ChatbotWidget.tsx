import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
};

const BOT_WELCOME_EN = "Welcome to MEA Library! How can I help you today?";
const BOT_WELCOME_HI =
  "एमईए पुस्तकालय में आपका स्वागत है! आज मैं आपकी कैसे सहायता कर सकता हूं?";

const QUICK_OPTIONS_EN = [
  { label: "🔍 Search Resources", key: "search" },
  { label: "📋 Membership", key: "membership" },
  { label: "📞 Contact", key: "contact" },
  { label: "🌐 Outreach", key: "outreach" },
];

const QUICK_OPTIONS_HI = [
  { label: "🔍 संसाधन खोजें", key: "search" },
  { label: "📋 सदस्यता", key: "membership" },
  { label: "📞 संपर्क", key: "contact" },
  { label: "🌐 आउटरीच", key: "outreach" },
];

function getBotReply(text: string, isHi: boolean): string {
  const t = text.toLowerCase();
  if (
    t.includes("search") ||
    t.includes("resource") ||
    t.includes("खोज") ||
    t.includes("संसाधन")
  ) {
    return isHi
      ? "आप हमारे OPAC पोर्टल पर पुस्तकें और जर्नल खोज सकते हैं। नेविगेशन में 'ओपैक' पर क्लिक करें।"
      : "You can search books and journals through our OPAC portal. Click on 'OPAC' in the navigation bar.";
  }
  if (t.includes("member") || t.includes("join") || t.includes("सदस्य")) {
    return isHi
      ? "सदस्यता के लिए 'सेवाएं > ऑनलाइन पुस्तकालय सदस्यता' पर जाएं। आपको कर्मचारी आईडी और विभाग विवरण चाहिए होगा।"
      : "For membership, go to Services > Online Library Membership. You will need your employee ID and department details.";
  }
  if (
    t.includes("contact") ||
    t.includes("phone") ||
    t.includes("email") ||
    t.includes("संपर्क")
  ) {
    return isHi
      ? "📞 +91-11-2301-2113\n✉ library@mea.gov.in\nकार्य समय: सोम–शुक्र 9AM–6PM"
      : "📞 +91-11-2301-2113\n✉ library@mea.gov.in\nWorking Hours: Mon–Fri 9AM–6PM";
  }
  if (
    t.includes("outreach") ||
    t.includes("event") ||
    t.includes("आउटरीच") ||
    t.includes("कार्यक्रम")
  ) {
    return isHi
      ? "आउटरीच गतिविधियों में प्रशिक्षण, व्याख्यान श्रृंखला, गैलरी और कार्यक्रम शामिल हैं। ऊपर के नेविगेशन मेनू में देखें।"
      : "Outreach activities include training, lecture series, gallery, and events. Check the navigation menu above.";
  }
  if (
    t.includes("hour") ||
    t.includes("time") ||
    t.includes("open") ||
    t.includes("समय") ||
    t.includes("खुला")
  ) {
    return isHi
      ? "पुस्तकालय समय: सोमवार–शुक्रवार 9AM–6PM, शनिवार 10AM–2PM। रविवार और सार्वजनिक अवकाश पर बंद।"
      : "Library Hours: Monday–Friday 9AM–6PM, Saturday 10AM–2PM. Closed on Sundays and public holidays.";
  }
  return isHi
    ? "धन्यवाद! आपके प्रश्न के लिए कृपया हमसे library@mea.gov.in पर संपर्क करें या +91-11-2301-2113 पर कॉल करें।"
    : "Thank you for your question! For further help, please email library@mea.gov.in or call +91-11-2301-2113.";
}

export default function ChatbotWidget() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [msgId, setMsgId] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message
  useEffect(() => {
    setMessages([
      {
        id: 0,
        from: "bot",
        text: isHi ? BOT_WELCOME_HI : BOT_WELCOME_EN,
      },
    ]);
  }, [isHi]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: msgId, from: "user", text: text.trim() };
    const botMsg: Message = {
      id: msgId + 1,
      from: "bot",
      text: getBotReply(text.trim(), isHi),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setMsgId((id) => id + 2);
    setInputValue("");
  };

  const handleQuickOption = (key: string) => {
    sendMessage(key);
  };

  const quickOptions = isHi ? QUICK_OPTIONS_HI : QUICK_OPTIONS_EN;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <dialog
        aria-label={isHi ? "पुस्तकालय से पूछें चैटबॉट" : "Ask Librarian chatbot"}
        aria-modal="true"
        className="w-[320px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#e0e0e0] transition-all duration-300"
        style={{
          height: "420px",
          bottom: "80px",
          position: "absolute",
          right: 0,
          transformOrigin: "bottom right",
          transform: isOpen
            ? "scale(1) translateY(0)"
            : "scale(0.85) translateY(20px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div className="bg-[#1a5c35] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ChatBookIcon size={18} />
            <div>
              <p className="text-white font-semibold text-sm leading-tight">
                {isHi ? "पुस्तकालय से पूछें" : "Ask Librarian"}
              </p>
              <p className="text-white/70 text-[10px] leading-tight">
                {isHi ? "एमईए पुस्तकालय" : "MEA Library"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            aria-label={isHi ? "बंद करें" : "Close chat"}
            data-ocid="chatbot.close_button"
          >
            ✕
          </button>
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#FAFAF7]"
          aria-live="polite"
          aria-atomic="false"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg text-xs leading-relaxed whitespace-pre-line ${
                  msg.from === "user"
                    ? "bg-[#FF9933] text-white rounded-br-none"
                    : "bg-white border border-[#e8e4de] text-[#333] rounded-bl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Quick option buttons — only show after welcome */}
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {quickOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleQuickOption(opt.key)}
                  className="text-[11px] border border-[#e8e4de] rounded px-2 py-2 bg-white text-[#333] hover:bg-[#FF9933] hover:text-white hover:border-[#FF9933] transition-colors text-left leading-tight"
                  data-ocid={`chatbot.${opt.key}.button`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-[#e8e4de] p-3 flex gap-2 items-center bg-white shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage(inputValue);
            }}
            placeholder={isHi ? "यहाँ टाइप करें..." : "Type your message..."}
            className="flex-1 rounded-full border border-[#e8e4de] px-4 py-2 text-xs text-[#333] focus:outline-none focus:border-[#FF9933] placeholder:text-[#aaa]"
            aria-label={isHi ? "संदेश दर्ज करें" : "Type a message"}
            data-ocid="chatbot.input"
          />
          <button
            type="button"
            onClick={() => sendMessage(inputValue)}
            className="w-8 h-8 rounded-full bg-[#FF9933] text-white flex items-center justify-center hover:bg-[#e8871e] transition-colors shrink-0"
            aria-label={isHi ? "भेजें" : "Send"}
            data-ocid="chatbot.submit_button"
          >
            <SendIcon />
          </button>
        </div>
      </dialog>

      {/* Trigger pill button */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#FF9933] text-white font-semibold text-sm shadow-lg hover:bg-[#e8871e] transition-colors"
        aria-label={isHi ? "पुस्तकालय से पूछें" : "Ask Librarian"}
        aria-expanded={isOpen}
        data-ocid="chatbot.open_modal_button"
      >
        <ChatBookIcon size={18} />
        <span>{isHi ? "पुस्तकालय से पूछें" : "Ask Librarian"}</span>
      </button>
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

function SendIcon() {
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
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
