interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.EMAIL_FROM || "onboarding@resend.dev";

  // If there's no API key configured, we run in mock mode
  if (!apiKey || apiKey === "re_your_api_key_here") {
    console.warn("⚠️ [Resend Mailer] RESEND_API_KEY is not configured or using placeholder. Running in Mock Mode!");
    console.log("---------------- MOCK EMAIL SENT ----------------");
    console.log(`To: ${Array.isArray(to) ? to.join(", ") : to}`);
    console.log(`From: ${fromAddress}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Length: ${html.length} chars`);
    console.log("-------------------------------------------------");
    
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, mock: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ [Resend Mailer] Error response from Resend API:", data);
      throw new Error(data.message || "Failed to send email via Resend");
    }

    console.log(`✅ [Resend Mailer] Email sent successfully! ID: ${data.id}`);
    return { success: true, id: data.id };
  } catch (error: unknown) {
    console.error("❌ [Resend Mailer] Failed to send email:", error);
    throw error;
  }
}
