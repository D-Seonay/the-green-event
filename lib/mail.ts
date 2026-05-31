import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  // If there are no credentials configured, we run in mock mode
  if (!user || !pass || pass === "your_16_character_app_password_here") {
    console.warn("⚠️ [Nodemailer] EMAIL_USER or EMAIL_PASS is not configured. Running in Mock Mode!");
    console.log("---------------- MOCK EMAIL SENT ----------------");
    console.log(`To: ${Array.isArray(to) ? to.join(", ") : to}`);
    console.log(`From: ${user || "not-configured@gmail.com"}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Length: ${html.length} chars`);
    console.log("-------------------------------------------------");
    
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, mock: true };
  }

  try {
    // 1. Configurer le "transporteur" (la connexion à ton Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    });

    // 2. Préparer l'e-mail
    const mailOptions = {
      from: `"The Green Event" <${user}>`, // Expéditeur
      to: Array.isArray(to) ? to.join(', ') : to,
      subject: subject,
      html: html,
    };

    // 3. Envoyer l'e-mail
    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ [Nodemailer] Email sent successfully! Message ID: ${info.messageId}`);
    return { success: true, id: info.messageId };
  } catch (error: unknown) {
    console.error("❌ [Nodemailer] Failed to send email:", error);
    throw error;
  }
}
