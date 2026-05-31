import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WaveDivider from '@/components/ui/WaveDivider';

export const metadata: Metadata = {
  title: "Mentions Légales | The Green Fest",
  description: "Consultez les mentions légales de The Green Fest, festival éco-responsable à Vertou. Informations sur l'association, l'hébergement et la propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-forest text-cream font-body pt-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12">
        <Button asChild variant="outline" className="mb-8 border-cream text-cream hover:bg-cream hover:text-forest">
          <Link href="/">← Retour à l&apos;accueil</Link>
        </Button>

        <h1 className="text-cream text-5xl md:text-7xl font-display font-black mb-8 text-center uppercase leading-tight">
          Mentions Légales
        </h1>
        <WaveDivider variant="forest-to-cream" flip={false} className="mb-12" />

        <div className="prose prose-invert lg:prose-xl mx-auto">
          <h2 className="text-leaf text-3xl font-display font-bold mb-4">1. Éditeur du site</h2>
          <p>
            Le site internet <strong>thegreenfest.fr</strong> est édité par l&apos;association <strong>The Green Event</strong>, association régie par la loi du 1er juillet 1901.
          </p>
          <ul className="list-none p-0">
            <li><strong>Siège social :</strong> 36 rue des jonquilles, 44120 Vertou, France</li>
            <li><strong>Numéro RNA :</strong> W442030689</li>
            <li><strong>Contact :</strong> <a href="mailto:thegreenevent.44@gmail.com" className="text-leaf hover:underline">thegreenevent.44@gmail.com</a></li>
            <li><strong>Directeur de la publication :</strong> Titouan GERARD</li>
          </ul>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">2. Hébergement</h2>
          <p>
            Le site internet est hébergé par <strong>Vercel Inc.</strong>, dont le siège social est situé :
          </p>
          <p>
            Vercel Inc.<br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789, USA<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-leaf hover:underline">https://vercel.com</a>
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">3. Propriété intellectuelle</h2>
          <p>
            L&apos;intégralité du site <strong>thegreenfest.fr</strong> est la propriété exclusive de l&apos;association <strong>The Green Event</strong>.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l&apos;association.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">4. Politique de confidentialité et protection des données (RGPD)</h2>
          <p>
            L&apos;association <strong>The Green Event</strong> s&apos;engage à ce que la collecte et le traitement de vos données, effectués à partir du site, soient conformes au Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p>
            <strong>Finalités :</strong> Les données personnelles collectées (via les formulaires de candidature bénévole ou d&apos;inscription à la newsletter) sont uniquement traitées pour la gestion des candidatures de bénévolat et l&apos;envoi d&apos;informations relatives au festival.
          </p>
          <p>
            <strong>Transactions :</strong> Les paiements (préventes de merchandising, dons) sont sécurisés et gérés intégralement via la plateforme partenaire <strong>HelloAsso</strong>. Les données bancaires ne sont jamais stockées sur notre site. Vous pouvez consulter la politique de confidentialité de HelloAsso sur leur site officiel.
          </p>
          <p>
            <strong>Vos droits :</strong> Conformément à la réglementation, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition relatif à vos données. Pour exercer ces droits, contactez-nous par email à : <a href="mailto:thegreenevent.44@gmail.com" className="text-leaf hover:underline">thegreenevent.44@gmail.com</a>.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">5. Cookies</h2>
          <p>
            Un bandeau de gestion des cookies est présent sur le site pour permettre à l&apos;utilisateur d&apos;exprimer ses choix concernant les traceurs éventuels.
          </p>
        </div>
      </div>
    </div>
  );
}
