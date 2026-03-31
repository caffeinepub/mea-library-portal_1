import { Link } from "@tanstack/react-router";
import { useState } from "react";
import ServiceSidebar from "../components/ServiceSidebar";

type Reason = "transfer" | "superannuation" | "other" | "";

const TRACK_STEPS = ["Submitted", "Under Review", "Approved"];

export default function NDCPage() {
  const [reason, setReason] = useState<Reason>("");
  const [otherReason, setOtherReason] = useState("");
  const [declared, setDeclared] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackRef, setTrackRef] = useState("");
  const [trackStatus] = useState(1);
  const [trackResult, setTrackResult] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    designation: "",
    department: "",
    email: "",
    mobile: "",
    dateOfRelieving: "",
    membershipId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declared) {
      alert("Please accept the declaration.");
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  if (submitted) {
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
            <li>Services</li>
            <li>&rsaquo;</li>
            <li className="text-olive font-medium">No Demand Certificate</li>
          </ol>
        </nav>
        <div
          className="max-w-lg mx-auto text-center py-12"
          data-ocid="ndc.success_state"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-olive mb-2">
            Request Submitted Successfully
          </h2>
          <p className="text-sm text-[#555] mb-1">
            Reference Number:{" "}
            <strong className="text-olive">NDC-2026-38271</strong>
          </p>
          <p className="text-sm text-[#555] mb-6">
            Your request will be processed within 3 working days. Confirmation
            will be sent to your official email.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2 bg-olive text-white text-sm font-semibold rounded hover:bg-olive-dark transition-colors"
              data-ocid="ndc.button"
            >
              Download &amp; Print
            </button>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-5 py-2 border border-border text-sm rounded hover:bg-secondary transition-colors"
              data-ocid="ndc.secondary_button"
            >
              New Request
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <li>Services</li>
          <li>&rsaquo;</li>
          <li className="text-olive font-medium">No Demand Certificate</li>
        </ol>
      </nav>
      <div className="flex gap-8 flex-col lg:flex-row">
        <ServiceSidebar active="ndc" />
        <main className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-olive mb-1">
            Online Request for No Demand Certificate (NDC)
          </h1>
          <div className="w-16 h-[3px] bg-saffron mb-4" aria-hidden="true" />
          <p className="text-[#555] text-sm mb-6 max-w-2xl">
            Employees may request a No Demand Certificate from MEA Library at
            the time of Transfer, Posting, or Superannuation. Please ensure all
            library books have been returned before submitting this request.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white border border-border rounded p-5">
              <h2 className="font-semibold text-olive text-sm mb-4">
                Reason for Request
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  [
                    { value: "transfer", label: "Transfer / Posting" },
                    { value: "superannuation", label: "Superannuation" },
                    { value: "other", label: "Other" },
                  ] as { value: Reason; label: string }[]
                ).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 border-2 rounded cursor-pointer transition-colors ${
                      reason === opt.value
                        ? "border-saffron bg-saffron-pale"
                        : "border-border hover:border-olive/40"
                    }`}
                    data-ocid="ndc.radio"
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={opt.value}
                      checked={reason === opt.value}
                      onChange={() => setReason(opt.value)}
                      className="accent-saffron"
                    />
                    <span className="text-sm font-medium text-olive">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
              {reason === "other" && (
                <input
                  type="text"
                  placeholder="Please specify reason"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className="mt-3 w-full h-10 px-3 border border-border rounded text-sm focus:outline-none focus:border-olive"
                  data-ocid="ndc.input"
                />
              )}
            </div>

            <div className="bg-white border border-border rounded p-5">
              <h2 className="font-semibold text-olive text-sm mb-4">
                Employee Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(
                  [
                    { id: "name", label: "Name", required: true },
                    { id: "employeeId", label: "Employee ID", required: true },
                    { id: "designation", label: "Designation", required: true },
                    { id: "department", label: "Department", required: true },
                    { id: "email", label: "Official Email", required: true },
                    { id: "mobile", label: "Mobile", required: true },
                    {
                      id: "dateOfRelieving",
                      label: "Date of Relieving",
                      required: true,
                    },
                    {
                      id: "membershipId",
                      label: "Library Membership ID (if any)",
                      required: false,
                    },
                  ] as const
                ).map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-medium text-[#555] mb-1"
                    >
                      {field.label}
                      {field.required && (
                        <span className="required-star ml-0.5">*</span>
                      )}
                    </label>
                    <input
                      id={field.id}
                      type={
                        field.id === "dateOfRelieving"
                          ? "date"
                          : field.id === "email"
                            ? "email"
                            : "text"
                      }
                      value={formData[field.id as keyof typeof formData]}
                      onChange={set(field.id)}
                      required={field.required}
                      className="w-full h-10 px-3 border border-border rounded text-sm focus:outline-none focus:border-olive focus:ring-1 focus:ring-saffron"
                      data-ocid="ndc.input"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-border rounded p-5">
              <label
                className="flex items-start gap-3 cursor-pointer"
                data-ocid="ndc.checkbox"
              >
                <input
                  type="checkbox"
                  checked={declared}
                  onChange={(e) => setDeclared(e.target.checked)}
                  className="mt-0.5 accent-olive w-4 h-4"
                  required
                />
                <span className="text-sm text-[#444] leading-relaxed">
                  I hereby declare that I have returned all library books,
                  periodicals, and other materials. I have no outstanding dues
                  with MEA Library.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-olive text-white font-semibold rounded hover:bg-olive-dark transition-colors"
              data-ocid="ndc.submit_button"
            >
              Submit NDC Request
            </button>
          </form>

          <div className="mt-8 bg-white border border-border rounded p-5">
            <h2 className="font-semibold text-olive mb-4">
              Track Your NDC Request
            </h2>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Enter Application Reference Number"
                value={trackRef}
                onChange={(e) => setTrackRef(e.target.value)}
                className="flex-1 h-10 px-3 border border-border rounded text-sm focus:outline-none focus:border-olive"
                data-ocid="ndc.search_input"
              />
              <button
                type="button"
                onClick={() => setTrackResult(true)}
                className="px-4 py-2 bg-olive text-white text-sm font-semibold rounded hover:bg-olive-dark"
                data-ocid="ndc.button"
              >
                Track
              </button>
            </div>
            {trackResult && (
              <div className="flex items-center gap-2" data-ocid="ndc.panel">
                {TRACK_STEPS.map((stepLabel, i) => (
                  <div key={stepLabel} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          i <= trackStatus
                            ? "bg-saffron text-white"
                            : "bg-[#F0F0F0] text-[#888]"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-xs text-center w-16">
                        {stepLabel}
                      </span>
                    </div>
                    {i < TRACK_STEPS.length - 1 && (
                      <div
                        className={`h-px w-10 mb-5 ${
                          i < trackStatus ? "bg-saffron" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
