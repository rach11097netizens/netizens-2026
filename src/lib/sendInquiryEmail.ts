import nodemailer, { TransportOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "services@netizenstechnologies.com",
    pass: "qngnsihxmhtifstv",
  },
  tls: {
    rejectUnauthorized: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InquiryPayload {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  services: string[];
}

// ─── Thank-You Email → sent to the user ──────────────────────────────────────

async function sendThankYouEmail(payload: InquiryPayload): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: '"Netizens Technologies" <services@netizenstechnologies.com>',
      to: payload.email,
      subject: "Thank you from Netizens",
      text: `Hello ${payload.name},\n\nThank you for your inquiry. Someone from our team will get back to you at the earliest.\n\nRegards,\nNetizens Technologies`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F8F8F8; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #FFF; border-radius: 8px; border: solid 4px #0e3572; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
            .header { background-color: #FFF; text-align: center; padding: 40px 20px; border-bottom: 4px solid #0e3572; }
            .header img { max-width: 200px; height: auto; margin-bottom: 20px; }
            .header h1 { color: #16181b; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px; }
            .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
            .content p { margin-bottom: 20px; font-size: 16px; }
            .highlight { color: #0e3572; font-weight: 600; text-decoration: none; }
            .footer { background-color: #f0f8ff; padding: 20px; text-align: center; font-size: 14px; color: #0e3572; border-top: 1px solid #cce0ff; }
            .footer a { color: #ed1c24; text-decoration: none; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://netizenstechnologies.com/wp-content/uploads/2024/07/logo.svg" alt="Netizens Technologies Logo" />
              <h1>Thank You from Netizens</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${payload.name}</strong>,</p>
              <p>Thank you for reaching out to <a href="https://netizenstechnologies.com" target="_blank" class="highlight">Netizens Technologies</a>. We have successfully received your inquiry.</p>
              <p>Our team is currently reviewing your request, and one of our experts will get back to you at the earliest possible convenience.</p>
              <p>We look forward to connecting with you soon!</p>
              <p>Best regards,<br/><strong>The Netizens Technologies Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} <a href="https://netizenstechnologies.com" target="_blank">Netizens Technologies</a>. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return true;
  } catch (error) {
    console.error("Error sending thank-you email:", error);
    return false;
  }
}

// ─── Admin Notification Email → sent to internal team ────────────────────────

async function sendAdminNotificationEmail(payload: InquiryPayload): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: '"Netizens Technologies" <services@netizenstechnologies.com>',
      to: "services@netizenstechnologies.com", // ← replace with real admin email
      cc: ["services@netizenstechnologies.com"],
      subject: `New Discovery Call Request — ${payload.name} (${payload.companyName})`,
      text: `
New inquiry received from the Book a Call form.

Name:             ${payload.name}
Email:            ${payload.email}
Phone:            ${payload.countryCode} ${payload.phone}
Company:          ${payload.companyName}
Website:          ${payload.companyWebsite}
Service:          ${payload.services.join(", ")}
      `.trim(),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F8F8F8; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #FFF; border-radius: 8px; border: solid 4px #0e3572; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
            .header { background-color: #0e3572; text-align: center; padding: 30px 20px; }
            .header h1 { color: #fff; margin: 0; font-size: 20px; font-weight: 600; }
            .content { padding: 36px 30px; color: #333; line-height: 1.6; }
            .content p { margin-bottom: 8px; font-size: 15px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            .table td { padding: 12px 16px; font-size: 15px; border-bottom: 1px solid #eef0f3; }
            .table td:first-child { font-weight: 600; color: #0e3572; width: 40%; background: #f5f8ff; }
            .badge { display: inline-block; background: #e8f0fe; color: #0e3572; border-radius: 4px; padding: 3px 10px; font-size: 13px; font-weight: 600; }
            .footer { background-color: #f0f8ff; padding: 20px; text-align: center; font-size: 13px; color: #0e3572; border-top: 1px solid #cce0ff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🗓 New Discovery Call Request</h1>
            </div>
            <div class="content">
              <p>A new inquiry has been submitted via the <strong>Book a Call</strong> form.</p>
              <table class="table">
                <tr><td>Name</td><td>${payload.name}</td></tr>
                <tr><td>Email</td><td><a href="mailto:${payload.email}" style="color:#0e3572;">${payload.email}</a></td></tr>
                <tr><td>Phone</td><td>${payload.countryCode} ${payload.phone}</td></tr>
                <tr><td>Company</td><td>${payload.companyName}</td></tr>
                <tr><td>Website</td><td><a href="${payload.companyWebsite}" target="_blank" style="color:#0e3572;">${payload.companyWebsite}</a></td></tr>
                <tr><td>Service</td><td><span class="badge">${payload.services.join(", ")}</span></td></tr>
              </table>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Netizens Technologies — Internal Notification</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return true;
  } catch (error) {
    console.error("Error sending admin notification email:", error);
    return false;
  }
}

// ─── Main export: sends both emails concurrently ──────────────────────────────

export async function sendInquiryEmail(payload: InquiryPayload): Promise<{ success: boolean }> {
  const [thankYou, admin] = await Promise.allSettled([
    sendThankYouEmail(payload),
    sendAdminNotificationEmail(payload),
  ]);

  const success =
    thankYou.status === "fulfilled" && thankYou.value &&
    admin.status === "fulfilled" && admin.value;

  return { success: !!success };
}
