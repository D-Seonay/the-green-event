import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/mail";

const VolunteerSchema = z.object({
  name: z.string().min(2),
  firstname: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  birthDate: z.string().min(1),
  city: z.string().min(2),
  hasExperience: z.enum(["oui", "non"]),
  teamPref: z.string().optional(),
  wish1: z.string(),
  wish2: z.string(),
  wish3: z.string(),
  motivation: z.string().max(500).optional(),
});

const wishLabels: Record<string, string> = {
  brigade_verte: "Brigade Verte avant qu'il fasse nuit du festival à 22h",
  flyers: "Distribution de flyers avant le festival pendant la fête de la musique (Vertou, nantes... le 21 juin)",
  bar: "Bar",
  restauration: "Restauration",
  maquillage: "Maquillage",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = VolunteerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Données de formulaire invalides.", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;
    const adminEmail = process.env.CONTACT_EMAIL || "thegreenevent.44@gmail.com";

    // 1. Email to administrator
    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="background-color: #052013; padding: 20px; border-radius: 6px; text-align: center;">
          <h1 style="color: #FEF7E0; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; tracking-wider">Nouvelle Candidature Bénévole</h1>
        </div>
        <div style="padding: 20px 0;">
          <p style="font-size: 16px; color: #1a202c; line-height: 1.5;">Une nouvelle candidature pour rejoindre la <strong>Green Team</strong> a été reçue !</p>
          
          <h3 style="border-bottom: 2px solid #00A651; padding-bottom: 5px; color: #052013; text-transform: uppercase;">1. Informations Personnelles</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #4a5568;">Prénom & Nom :</td>
              <td style="padding: 8px 0; color: #1a202c;">${data.firstname} ${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email :</td>
              <td style="padding: 8px 0; color: #1a202c;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Téléphone :</td>
              <td style="padding: 8px 0; color: #1a202c;"><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Date de naissance :</td>
              <td style="padding: 8px 0; color: #1a202c;">${data.birthDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Ville :</td>
              <td style="padding: 8px 0; color: #1a202c;">${data.city}</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #00A651; padding-bottom: 5px; color: #052013; text-transform: uppercase;">2. Expérience & Binôme</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #4a5568;">Expérience :</td>
              <td style="padding: 8px 0; color: #1a202c;">${data.hasExperience === "oui" ? "Oui, a déjà eu des expériences" : "Non, pas d'expérience précédente"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Binôme souhaité :</td>
              <td style="padding: 8px 0; color: #1a202c;">${data.teamPref || "Aucune préférence"}</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #00A651; padding-bottom: 5px; color: #052013; text-transform: uppercase;">3. Préférences de Missions</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #4a5568;">Souhait n°1 :</td>
              <td style="padding: 8px 0; color: #1a202c;"><strong>${wishLabels[data.wish1] || data.wish1}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #4a5568;">Souhait n°2 :</td>
              <td style="padding: 8px 0; color: #1a202c;">${wishLabels[data.wish2] || data.wish2}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #4a5568;">Souhait n°3 :</td>
              <td style="padding: 8px 0; color: #1a202c;">${wishLabels[data.wish3] || data.wish3}</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #00A651; padding-bottom: 5px; color: #052013; text-transform: uppercase;">4. Motivations</h3>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #00A651; font-style: italic; color: #2d3748; white-space: pre-line;">
            ${data.motivation ? `"${data.motivation}"` : "Aucune motivation renseignée."}
          </div>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; color: #a0aec0; font-size: 12px;">
          Ce message a été envoyé automatiquement depuis le site The Green Event.
        </div>
      </div>
    `;

    // Send admin alert email
    try {
      await sendEmail({
        to: adminEmail,
        subject: `[Bénévole] Nouvelle candidature - ${data.firstname} ${data.name}`,
        html: adminHtml,
      });
    } catch (err) {
      console.warn("⚠️ Could not send admin alert email (Nodemailer limits may apply):", err);
    }

    // 2. Email to the volunteer candidate (acknowledgement)
    const volunteerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="background-color: #00A651; padding: 20px; border-radius: 6px; text-align: center;">
          <h1 style="color: #FEF7E0; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; tracking-wider">Merci ${data.firstname} !</h1>
        </div>
        <div style="padding: 20px 0;">
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Salut <strong>${data.firstname}</strong>,</p>
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Toute l'équipe de l'association <strong>The Green Event</strong> te remercie chaleureusement pour ton intérêt et ta candidature pour rejoindre la Green Team du festival <strong>The Green Fest</strong> ! 🌿💚</p>
          
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Nous avons bien reçu tes souhaits de missions pour le festival.</p>
          
          <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #052013; text-transform: uppercase;">Récapitulatif de tes souhaits :</h4>
            <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.5;">
              <li><strong>Souhait n°1 :</strong> ${wishLabels[data.wish1] || data.wish1}</li>
              <li><strong>Souhait n°2 :</strong> ${wishLabels[data.wish2] || data.wish2}</li>
              <li><strong>Souhait n°3 :</strong> ${wishLabels[data.wish3] || data.wish3}</li>
              ${data.teamPref ? `<li><strong>Souhait de binôme :</strong> ${data.teamPref}</li>` : ""}
            </ul>
          </div>

          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;"><strong>Et maintenant ?</strong><br/>
          Notre coordinateur des bénévoles étudie toutes les propositions. Nous reviendrons vers toi d'ici quelques jours par e-mail ou par téléphone (${data.phone}) pour te proposer une mission et finaliser ton planning.</p>
          
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">À très vite en pleine nature !</p>
          
          <p style="font-size: 16px; font-weight: bold; color: #00A651; margin-top: 30px;">L'équipe The Green Fest</p>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; color: #a0aec0; font-size: 12px;">
          Vous recevez ce message car vous avez soumis une demande d'inscription bénévole sur le site du festival The Green Fest.
        </div>
      </div>
    `;

    // Try to send confirmation to user
    try {
      await sendEmail({
        to: data.email,
        subject: `[The Green Fest] Confirmation de ta candidature bénévole 🌿`,
        html: volunteerHtml,
      });
    } catch (err) {
      console.warn("⚠️ Could not send confirmation to candidate (might be due to Nodemailer restrictions):", err);
    }

    return NextResponse.json({ success: true, message: "Candidature envoyée" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in volunteers API endpoint:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de la candidature." },
      { status: 500 }
    );
  }
}
