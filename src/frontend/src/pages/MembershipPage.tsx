import { Link } from "@tanstack/react-router";
import { useState } from "react";
import ServiceSidebar from "../components/ServiceSidebar";

const STEPS = ["Personal Details", "Service Details", "Submit & Confirmation"];

interface FormData {
  fullName: string;
  employeeId: string;
  designation: string;
  ministry: string;
  email: string;
  mobile: string;
  dateOfJoining: string;
  dateOfBirth: string;
  address: string;
  photo: File | null;
}

interface Errors {
  [key: string]: string;
}

export default function MembershipPage() {
  const [step] = useState(0);
  const [form, setForm] = useState<FormData>({
    fullName: "",
    employeeId: "",
    designation: "",
    ministry: "",
    email: "",
    mobile: "",
    dateOfJoining: "",
    dateOfBirth: "",
    address: "",
    photo: null,
  });
  const [errors, setErrors] = useState<Errors>({});

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs: Errors = {};
    if (!form.fullName.trim()) errs.fullName = "Full Name is required";
    if (!form.employeeId.trim()) errs.employeeId = "Employee ID is required";
    if (!form.designation.trim()) errs.designation = "Designation is required";
    if (!form.ministry.trim())
      errs.ministry = "Ministry/Department is required";
    if (!form.email.trim()) errs.email = "Official Email is required";
    if (!form.mobile.trim()) errs.mobile = "Mobile Number is required";
    return errs;
  };

  const handleNext = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    alert("Step 1 complete! (Step 2 coming soon)");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-sm text-[#888]">
          <li>
            <Link to="/" className="hover:text-olive">
              Home
            </Link>
          </li>
          <li aria-hidden="true">&rsaquo;</li>
          <li>Services</li>
          <li aria-hidden="true">&rsaquo;</li>
          <li className="text-olive font-medium">Online Library Membership</li>
        </ol>
      </nav>

      <div className="flex gap-8 flex-col lg:flex-row">
        <ServiceSidebar active="membership" />
        <main className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-olive mb-1">
            Online Library Membership
          </h1>
          <div className="w-16 h-[3px] bg-saffron mb-4" aria-hidden="true" />
          <p className="text-[#555] text-sm mb-6 max-w-2xl">
            MEA Library offers library membership to officials of Ministry of
            External Affairs and attached offices. Fill the form below to apply
            for membership.
          </p>

          {/* Stepper */}
          <div
            className="flex items-center mb-8"
            aria-label="Application steps"
          >
            {STEPS.map((label, i) => (
              <div
                key={label}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                      i === step
                        ? "border-saffron bg-saffron text-white"
                        : i < step
                          ? "border-olive bg-olive text-white"
                          : "border-border bg-white text-[#888]"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      i === step
                        ? "text-saffron"
                        : i < step
                          ? "text-olive"
                          : "text-[#888]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 ${
                      i < step ? "bg-olive" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-6 flex-col xl:flex-row">
            <div className="flex-1 bg-white border border-border rounded p-6">
              <h2 className="font-semibold text-olive mb-5">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {(
                  [
                    {
                      id: "fullName",
                      label: "Full Name",
                      required: true,
                      type: "text",
                    },
                    {
                      id: "employeeId",
                      label: "Employee ID",
                      required: true,
                      type: "text",
                    },
                    {
                      id: "designation",
                      label: "Designation",
                      required: true,
                      type: "text",
                    },
                    {
                      id: "ministry",
                      label: "Ministry/Department",
                      required: true,
                      type: "text",
                    },
                    {
                      id: "email",
                      label: "Official Email ID",
                      required: true,
                      type: "email",
                    },
                    {
                      id: "mobile",
                      label: "Mobile Number",
                      required: true,
                      type: "tel",
                    },
                    {
                      id: "dateOfJoining",
                      label: "Date of Joining",
                      required: false,
                      type: "date",
                    },
                    {
                      id: "dateOfBirth",
                      label: "Date of Birth",
                      required: false,
                      type: "date",
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
                      type={field.type}
                      value={form[field.id as keyof FormData] as string}
                      onChange={set(field.id as keyof FormData)}
                      className={`w-full h-10 px-3 border rounded text-sm focus:outline-none focus:border-olive focus:ring-1 focus:ring-saffron ${
                        errors[field.id] ? "border-red-500" : "border-border"
                      }`}
                      aria-required={field.required}
                      aria-describedby={
                        errors[field.id] ? `${field.id}-error` : undefined
                      }
                      data-ocid="membership.input"
                    />
                    {errors[field.id] && (
                      <p
                        id={`${field.id}-error`}
                        className="text-xs text-red-600 mt-1"
                        role="alert"
                        data-ocid="membership.error_state"
                      >
                        {errors[field.id]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-xs font-medium text-[#555] mb-1"
                  >
                    Official Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    value={form.address}
                    onChange={set("address")}
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:border-olive focus:ring-1 focus:ring-saffron resize-none"
                    data-ocid="membership.textarea"
                  />
                </div>
                <div>
                  <label
                    htmlFor="photo"
                    className="block text-xs font-medium text-[#555] mb-1"
                  >
                    Upload Photo{" "}
                    <span className="text-[#888] font-normal">
                      (JPG/PNG, max 200KB)
                    </span>
                  </label>
                  <input
                    id="photo"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        photo: e.target.files?.[0] ?? null,
                      }))
                    }
                    className="block w-full text-sm text-[#555] file:mr-3 file:py-1.5 file:px-4 file:rounded file:border-0 file:bg-olive file:text-white file:text-xs hover:file:bg-olive-dark"
                    data-ocid="membership.upload_button"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-olive text-white font-semibold text-sm rounded hover:bg-olive-dark transition-colors"
                  data-ocid="membership.submit_button"
                >
                  Next: Service Details →
                </button>
              </div>
            </div>
            <div className="xl:w-64 bg-saffron-pale border border-saffron/20 rounded p-5 self-start">
              <h3 className="font-semibold text-olive text-sm mb-3">
                Documents Required
              </h3>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Employee ID proof",
                  "Official email confirmation",
                  "Recent passport size photo",
                ].map((item) => (
                  <li key={item} className="text-xs text-[#444] flex gap-2">
                    <span className="text-saffron mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="font-semibold text-olive text-sm mb-3">
                Membership Benefits
              </h3>
              <ul className="space-y-1.5">
                {[
                  "Access to 50,000+ books",
                  "E-journals access",
                  "Reading room access",
                  "MyLOFT digital platform",
                ].map((item) => (
                  <li key={item} className="text-xs text-[#444] flex gap-2">
                    <span className="text-saffron mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
