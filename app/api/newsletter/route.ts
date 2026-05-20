import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'L\'adresse email est requise.' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Format d\'email invalide.' }, { status: 400 });
    }

    const adminEmail = process.env.CONTACT_EMAIL || "thegreenevent.44@gmail.com";

    // 1. Email notification to the admin
    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="background-color: #052013; padding: 20px; border-radius: 6px; text-align: center;">
          <h1 style="color: #FEF7E0; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">Nouvelle inscription Newsletter</h1>
        </div>
        <div style="padding: 20px 0;">
          <p style="font-size: 16px; color: #1a202c; line-height: 1.5;">Un nouvel utilisateur s'est inscrit à la newsletter de <strong>The Green Event</strong> :</p>
          <p style="font-size: 18px; color: #00A651; font-weight: bold; background-color: #f7fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #00A651; text-align: center;">
            <a href="mailto:${email}" style="color: #00A651; text-decoration: none;">${email}</a>
          </p>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; color: #a0aec0; font-size: 12px;">
          Ce message a été envoyé automatiquement depuis le site The Green Event.
        </div>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `[Newsletter] Nouvelle inscription de ${email}`,
      html: adminHtml,
    });

    // 2. Email confirmation to the subscriber
    const subscriberHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="background-color: #052013; padding: 20px; border-radius: 6px; text-align: center;">
          <h1 style="color: #FEF7E0; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">Bienvenue dans la communauté ! 🌿</h1>
        </div>
        <div style="padding: 20px 0;">
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Bonjour,</p>
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Merci de t'être inscrit à la newsletter de <strong>The Green Event</strong> !</p>
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Tu seras le premier informé des révélations de la programmation, des tarifs exclusifs et de toutes les actualités éco-responsables de notre édition 2026 au Parc de la Sèvre à Vertou.</p>
          
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Ensemble, faisons vibrer la nature au rythme des musiques électroniques ! 🔊💚</p>
          
          <p style="font-size: 16px; font-weight: bold; color: #00A651; margin-top: 30px;">L'équipe The Green Event</p>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; color: #a0aec0; font-size: 12px;">
          Vous recevez ce message car vous vous êtes inscrit à la newsletter sur le site The Green Event.
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: email,
        subject: `[The Green Event] Inscription validée ! 🌿`,
        html: subscriberHtml,
      });
    } catch (err) {
      console.warn("⚠️ Could not send confirmation to subscriber (Resend Sandbox limits may apply):", err);
    }

    return NextResponse.json({ success: true, message: 'Subscription successful' }, { status: 200 });
  } catch (error: any) {
    console.error("Error in newsletter API route:", error);
    return NextResponse.json({ error: 'Une erreur inattendue est survenue.' }, { status: 500 });
  }
}
