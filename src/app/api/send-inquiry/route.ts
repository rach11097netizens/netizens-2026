import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmail, InquiryPayload } from "@/lib/sendInquiryEmail";
import { pushToHubSpot } from "@/lib/hubspot";

// ─── Validation helpers ───────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url: string): boolean {
  try { new URL(url); return true; }
  catch { return false; }
}

// ─── POST /api/send-inquiry ───────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, countryCode, phone, companyName, companyWebsite, services } = body;

    // ── Server-side validation ────────────────────────────────────────
    const errors: Record<string, string> = {};
    if (!name?.trim()) errors.name = "Name is required.";
    if (!email?.trim()) errors.email = "Email address is required.";
    else if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
    if (!phone?.trim()) errors.phone = "Phone number is required.";
    else if (!/^\d{5,15}$/.test(phone.replace(/\s/g, ""))) errors.phone = "Please enter a valid phone number.";
    if (!companyName?.trim()) errors.companyName = "Company name is required.";
    if (!companyWebsite?.trim()) errors.companyWebsite = "Company website is required.";
    else if (!isValidUrl(companyWebsite)) errors.companyWebsite = "Please enter a valid URL (include https://).";
    if (!Array.isArray(services) || services.length === 0) errors.services = "Please select at least one service.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // ── Build payload ─────────────────────────────────────────────────
    const payload: InquiryPayload = {
      name: name.trim(),
      email: email.trim(),
      countryCode: countryCode ?? "",
      phone: phone.trim(),
      companyName: companyName.trim(),
      companyWebsite: companyWebsite.trim(),
      services,
    };

    // ── Run email + HubSpot concurrently ──────────────────────────────
    const [emailResult, hubspotResult] = await Promise.allSettled([
      sendInquiryEmail(payload),
      pushToHubSpot(payload),             // ← add this
    ]);

    // Email is the critical path — fail if emails didn't send
    const emailSuccess =
      emailResult.status === "fulfilled" && emailResult.value.success;

    // HubSpot is non-critical — log failure but don't block success
    if (hubspotResult.status === "rejected" || !hubspotResult.value) {
      console.warn("HubSpot push failed — form still submitted successfully");
    }

    if (!emailSuccess) {
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