import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 422 }
      );
    }

    // ── Notify admin ──────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Netizens Technologies" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "New Case Study Notification Signup",
      html: `
        <p><strong>${email}</strong> has signed up to be notified when case studies go live.</p>
      `,
    });

    // ── Confirm to user ───────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Netizens Technologies" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "You're on the list!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', sans-serif; background: #F8F8F8; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #FFF; border-radius: 8px; border: 4px solid #0e3572; overflow: hidden; }
            .header { background: #FFF; text-align: center; padding: 40px 20px; border-bottom: 4px solid #0e3572; }
            .header img { max-width: 200px; height: auto; margin-bottom: 20px; }
            .header h1 { color: #16181b; margin: 0; font-size: 24px; font-weight: 600; }
            .content { padding: 40px 30px; color: #333; line-height: 1.6; font-size: 16px; }
            .footer { background: #f0f8ff; padding: 20px; text-align: center; font-size: 14px; color: #0e3572; border-top: 1px solid #cce0ff; }
            .footer a { color: #ed1c24; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://netizenstechnologies.com/wp-content/uploads/2024/07/logo.svg" alt="Netizens Technologies" />
              <h1>You're on the list!</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>Thanks for signing up! We'll notify you as soon as our case studies go live.</p>
              <p>Stay tuned — we're documenting the stories behind our projects, from the initial challenge to the final outcome.</p>
              <p>Best regards,<br/><strong>The Netizens Technologies Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} <a href="https://netizenstechnologies.com">Netizens Technologies</a>. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Notify API error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}