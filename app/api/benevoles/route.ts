import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/mail";

const VolunteerSchema = z.object({
  name: z.string().min(2),
  firstname: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  age: z.string(),
  availabilities: z.array(z.string()).min(1),
  assignement: z.string(),
  motivation: z.string().min(10).max(500),
});

const availabilityLabels: Record<string, string> = {
  montage: "Montage (Juin)",
  samedi: "Samedi 4 Juillet",
  dimanche: "Dimanche 5 Juillet",
  demontage: "Démontage",
};

const assignmentLabels: Record<string, string> = {
  bar: "Bar & Resto",
  eco: "Éco-Brigade",
  accueil: "Accueil",
  technique: "Technique",
  polyvalent: "Polyvalent",
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
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #4a5568;">Prénom & Nom :</td>
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
              <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Âge :</td>
              <td style="padding: 8px 0; color: #1a202c;">${data.age} ans</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #00A651; padding-bottom: 5px; color: #052013; text-transform: uppercase;">2. Préférences & Disponibilités</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #4a5568;">Poste demandé :</td>
              <td style="padding: 8px 0; color: #1a202c;"><strong>${assignmentLabels[data.assignement] || data.assignement}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #4a5568;">Disponibilités :</td>
              <td style="padding: 8px 0; color: #1a202c;">
                <ul style="margin: 0; padding-left: 20px;">
                  ${data.availabilities.map((av) => `<li>${availabilityLabels[av] || av}</li>`).join("")}
                </ul>
              </td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #00A651; padding-bottom: 5px; color: #052013; text-transform: uppercase;">3. Motivations</h3>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #00A651; font-style: italic; color: #2d3748; white-space: pre-line;">
            "${data.motivation}"
          </div>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; color: #a0aec0; font-size: 12px;">
          Ce message a été envoyé automatiquement depuis le site The Green Event.
        </div>
      </div>
    `;

    // Send admin alert email
    await sendEmail({
      to: adminEmail,
      subject: `[Bénévole] Nouvelle candidature - ${data.firstname} ${data.name}`,
      html: adminHtml,
    });

    // 2. Email to the volunteer candidate (acknowledgement)
    const volunteerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="background-color: #052013; padding: 20px; border-radius: 6px; text-align: center;">
          <h1 style="color: #FEF7E0; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; tracking-wider">Merci ${data.firstname} !</h1>
        </div>
        <div style="padding: 20px 0;">
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Salut <strong>${data.firstname}</strong>,</p>
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Toute l'équipe de <strong>The Green Event</strong> te remercie chaleureusement pour ton intérêt et ta candidature pour rejoindre notre Green Team ! 🌿💚</p>
          
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">Nous avons bien reçu tes préférences pour le poste de <strong>${assignmentLabels[data.assignement] || data.assignement}</strong>.</p>
          
          <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #052013; text-transform: uppercase;">Récapitulatif de tes choix :</h4>
            <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.5;">
              <li><strong>Créneaux :</strong> ${data.availabilities.map((av) => availabilityLabels[av] || av).join(", ")}</li>
              <li><strong>Poste :</strong> ${assignmentLabels[data.assignement] || data.assignement}</li>
            </ul>
          </div>

          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;"><strong>Et maintenant ?</strong><br/>
          Notre coordinateur des bénévoles étudie toutes les propositions de planning. Nous reviendrons vers toi d'ici quelques jours par e-mail ou par téléphone (${data.phone}) pour te confirmer tes créneaux et finaliser ton inscription.</p>
          
          <p style="font-size: 16px; color: #1a202c; line-height: 1.6;">À très vite en pleine nature !</p>
          
          <p style="font-size: 16px; font-weight: bold; color: #00A651; margin-top: 30px;">L'équipe The Green Event</p>
        </div>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; color: #a0aec0; font-size: 12px;">
          Vous recevez ce message car vous avez soumis une demande d'inscription bénévole sur le site The Green Event.
        </div>
      </div>
    `;

    // Try to send confirmation to user (if using custom domain. If using Resend sandbox/onboarding, this might fail unless data.email is verified or it is sent to adminEmail.
    // To prevent crashing the whole response when in sandbox mode, we can catch failures for the user email send.
    try {
      await sendEmail({
        to: data.email,
        subject: `[The Green Event] Confirmation de ta candidature bénévole 🌿`,
        html: volunteerHtml,
      });
    } catch (err) {
      console.warn("⚠️ Could not send confirmation to candidate (might be due to Resend Sandbox restrictions):", err);
    }

    return NextResponse.json({ success: true, message: "Candidature envoyée" }, { status: 200 });
  } catch (error: any) {
    console.error("Error in volunteers API endpoint:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de la candidature." },
      { status: 500 }
    );
  }
}
