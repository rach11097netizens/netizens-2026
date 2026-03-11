import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmail, InquiryPayload } from "@/lib/sendInquiryEmail";

// ─── Validation helpers ───────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ─── POST /api/send-inquiry ───────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, countryCode, phone, companyName, companyWebsite, services } = body;

    // ── Server-side validation ──────────────────────────────────────────────
    const errors: Record<string, string> = {};

    if (!name?.trim()) errors.name = "Name is required.";
    if (!email?.trim()) errors.email = "Email address is required.";
    else if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
    if (!phone?.trim()) errors.phone = "Phone number is required.";
    else if (!/^\d{5,15}$/.test(phone.replace(/\s/g, ""))) errors.phone = "Please enter a valid phone number.";
    if (!companyName?.trim()) errors.companyName = "Company name is required.";
    if (!companyWebsite?.trim()) errors.companyWebsite = "Company website is required.";
    else if (!isValidUrl(companyWebsite)) errors.companyWebsite = "Please enter a valid URL (include https://).";
    if (!Array.isArray(services) || services.length === 0)
      errors.services = "Please select at least one service.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // ── Send emails ─────────────────────────────────────────────────────────
    const payload: InquiryPayload = {
      name: name.trim(),
      email: email.trim(),
      countryCode: countryCode ?? "",
      phone: phone.trim(),
      companyName: companyName.trim(),
      companyWebsite: companyWebsite.trim(),
      services: services.map((s: string) => s.trim()),
    };

    const { success } = await sendInquiryEmail(payload);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
