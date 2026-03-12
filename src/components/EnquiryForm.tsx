"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./Input";
import { Button } from "@/components/Button";
import { enquiryService } from "@/lib/api-client";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

export function EnquiryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+971",
    phone: "",
    budget: "",
    objective: "",
    recaptchaToken: "",
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setStatus("loading");

    try {
      const result = await enquiryService.submit(formData);

      if (result.success) {
        setStatus("success");
        router.push("/thank-you");
      } else {
        setStatus("error");
        recaptchaRef.current?.reset();
        setFormData((prev) => ({ ...prev, recaptchaToken: "" }));
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      recaptchaRef.current?.reset();
      setFormData((prev) => ({ ...prev, recaptchaToken: "" }));
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setFormData((prev) => ({ ...prev, recaptchaToken: token || "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 15);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+971",
      phone: "",
      budget: "",
      objective: "",
      recaptchaToken: "",
    });
    recaptchaRef.current?.reset();
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="font-headings text-2xl text-regal-navy font-bold">
          Thank You!
        </h3>
        <p className="text-gray-600 font-sans">
          Your discovery call request has been received. We'll get back to you
          shortly.
        </p>
        <Button variant="secondary" onClick={handleReset} className="mt-4">
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex flex-col gap-3 sm:gap-6">
      <p className="font-headings text-lg sm:text-2xl text-regal-navy font-semibold text-center w-full">
        Request your discovery call
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="flex-1"
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="flex-1"
          />
        </div>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="w-full flex border border-black/10 rounded-[10px] overflow-hidden">
          <select
            name="countryCode"
            id="countryCode"
            className="form-select-compact bg-gray-50/80 px-2 py-2 sm:py-3 text-charcoal font-sans text-[13px] border-r border-black/10 h-[44px] sm:h-[52px] w-[72px] shrink-0 focus:outline-none"
            value={formData.countryCode}
            onChange={handleChange}
            aria-label="Country code"
          >
            <option value="+971">+971</option>
            <option value="+966">+966</option>
            <option value="+973">+973</option>
            <option value="+974">+974</option>
            <option value="+968">+968</option>
            <option value="+965">+965</option>
            <option value="+91">+91</option>
            <option value="+92">+92</option>
            <option value="+44">+44</option>
            <option value="+1">+1</option>
            <option value="+61">+61</option>
            <option value="+49">+49</option>
            <option value="+33">+33</option>
            <option value="+81">+81</option>
            <option value="+86">+86</option>
            <option value="+20">+20</option>
            <option value="+27">+27</option>
            <option value="+234">+234</option>
            <option value="+254">+254</option>
            <option value="+55">+55</option>
            <option value="+7">+7</option>
            <option value="+90">+90</option>
            <option value="+39">+39</option>
            <option value="+34">+34</option>
            <option value="+31">+31</option>
            <option value="+65">+65</option>
            <option value="+60">+60</option>
            <option value="+62">+62</option>
            <option value="+63">+63</option>
            <option value="+64">+64</option>
          </select>
          <label htmlFor="phone" className="sr-only">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="50 123 4567"
            minLength={6}
            maxLength={15}
            className="flex-1 px-4 py-2 sm:py-3 bg-white text-charcoal font-sans text-[14px] focus:outline-none placeholder:text-charcoal/60 sm:h-[52px]"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="budget"
            className="block font-sans text-[14px] text-regal-navy mb-1"
          >
            What is your budget to build the website?
          </label>
          <select
            name="budget"
            id="budget"
            className="form-select w-full border border-black/10 rounded-[10px] px-4 py-2 sm:py-3 text-charcoal font-sans text-[14px] sm:h-[52px] focus:outline-none"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select budget
            </option>
            <option value="under-2000">Under AED 2000</option>
            <option value="2000-5000">AED 2000-5000</option>
            <option value="more-than-10000">More than AED 10,000</option>
          </select>
        </div>
        <div className="w-full">
          <label
            htmlFor="objective"
            className="block font-sans text-[14px] text-regal-navy mb-1"
          >
            What is the primary objective of your enquiry?
          </label>
          <select
            name="objective"
            id="objective"
            className="form-select w-full border border-black/10 rounded-[10px] px-4 py-2 sm:py-3 text-charcoal font-sans text-[14px] sm:h-[52px] focus:outline-none"
            value={formData.objective}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select objective
            </option>
            <option value="generate-leads">Generate more leads</option>
            <option value="online-sales">Increase online sales</option>
            <option value="google-ranking">Improve Google ranking</option>
            <option value="performance-speed">
              Improve website performance & speed
            </option>
            <option value="rebrand-design">
              Rebrand / Improve website design
            </option>
            <option value="build-from-scratch">
              Build online presence from scratch
            </option>
          </select>
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm font-sans mt-2">
            An error occurred. Please try again.
          </p>
        )}

        <div className="w-full flex justify-center mt-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            size="normal"
            onChange={handleCaptchaChange}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={status === "loading"}
          className="!w-full h-[52px] px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Processing..." : "Book a Discovery Call"}
        </Button>
      </form>
    </div>
  );
}
