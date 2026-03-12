import { NextRequest, NextResponse } from "next/server";
import { sendThankYouEmail } from "@/utils/sendEmail";
import { pushToHubSpot } from "@/lib/hubspot";

// ─── Validation helpers ───────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── POST /api/enquiry ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, countryCode, phone, budget, objective } = body;

    // ── Validation ────────────────────────────────────────────────────────
    const errors: Record<string, string> = {};

    if (!firstName?.trim()) errors.firstName = "First name is required.";
    if (!lastName?.trim()) errors.lastName = "Last name is required.";
    if (!email?.trim()) errors.email = "Email is required.";
    else if (!isValidEmail(email)) errors.email = "Please enter a valid email.";
    if (!phone?.trim()) errors.phone = "Phone number is required.";
    if (!budget) errors.budget = "Please select a budget.";
    if (!objective) errors.objective = "Please select an objective.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // ── Push to HubSpot ───────────────────────────────────────────────────
    const hubspotResult = await pushToHubSpot({
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      countryCode: countryCode ?? "",
      phone: phone.trim(),
      companyName: "",
      companyWebsite: "",
      services: [objective],
    }).catch(() => false);

    if (!hubspotResult) {
      console.warn("HubSpot push failed — enquiry still submitted successfully");
    }

    // ── Send thank-you email ──────────────────────────────────────────────
    const emailSent = await sendThankYouEmail(email.trim());

    if (!emailSent) {
      return NextResponse.json(
        { success: false, message: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API /enquiry error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}