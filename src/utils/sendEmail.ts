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

export async function sendThankYouEmail(toEmail: string) {
  try {
    const data = await transporter.sendMail({
      from: `"Netizens Technologies" <${process.env.SMTP_USER}>`,
      to: toEmail,
      cc: [process.env.SMTP_USER as string],
      subject: "Thank you from Netizens",
      text: `Hello,\n\nThank you for your inquiry. Someone from our team will get back to you at the earliest.\n\nRegards,\nNetizens Technologies`,
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
              <p>Hello,</p>
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
    console.log("Email sent successfully:", data.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}