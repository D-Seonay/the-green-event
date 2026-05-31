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
            <li><strong>Siège social :</strong> [ADRESSE POSTALE COMPLÈTE À REMPLIR - ex: 12 rue du Parc, 44120 Vertou]</li>
            <li><strong>Numéro SIRET :</strong> [NUMÉRO À 14 CHIFFRES À REMPLIR]</li>
            <li><strong>Numéro RNA :</strong> [NUMÉRO W... À REMPLIR]</li>
            <li><strong>Contact :</strong> <a href="mailto:thegreenevent.44@gmail.com" className="text-leaf hover:underline">thegreenevent.44@gmail.com</a></li>
            <li><strong>Directeur de la publication :</strong> [PRÉNOM ET NOM DU RESPONSABLE LÉGAL]</li>
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
            L&apos;intégralité du site <strong>thegreenfest.fr</strong>, y compris la conception, les textes, les images, les éléments graphiques, le logo et les animations, sont la propriété exclusive de l&apos;association <strong>The Green Event</strong>.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l&apos;association. Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">4. Politique de confidentialité et protection des données (RGPD)</h2>
          <p>
            L&apos;association <strong>The Green Event</strong> s&apos;engage à ce que la collecte et le traitement de vos données, effectués à partir du site, soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>
          <p>
            Les données personnelles collectées (nom, prénom, email, téléphone) via les formulaires de candidature bénévole ou d&apos;inscription à la newsletter sont uniquement traitées par l&apos;association pour les finalités suivantes :
          </p>
          <ul>
            <li>Gestion des candidatures de bénévolat.</li>
            <li>Envoi de newsletters et informations sur le festival.</li>
            <li>Suivi des commandes de la boutique.</li>
          </ul>
          <p>
            Vos données sont conservées pendant la durée nécessaire à la réalisation des finalités citées ci-dessus et ne sont en aucun cas transmises à des tiers.
          </p>
          <p>
            Conformément à la réglementation, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition relatif à vos données. Pour exercer ces droits, contactez-nous par email à : <a href="mailto:thegreenevent.44@gmail.com" className="text-leaf hover:underline">thegreenevent.44@gmail.com</a>.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">5. Cookies</h2>
          <p>
            L&apos;utilisateur est informé que lors de ses visites sur le site, un cookie peut s&apos;installer automatiquement sur son logiciel de navigation. Un bandeau de gestion des cookies est présent sur le site pour permettre à l&apos;utilisateur d&apos;exprimer ses choix.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">6. Médiation de la consommation</h2>
          <p>
            Conformément aux articles L.616-1 et R.616-1 du code de la consommation, pour tout litige relatif à un achat sur notre boutique n&apos;ayant pu être résolu par notre service client, l&apos;acheteur peut recourir gratuitement à un médiateur de la consommation. [NOM DU MÉDIATEUR ET SITE WEB À AJOUTER SI L'ASSO EST ADHÉRENTE]
          </p>
        </div>
      </div>
    </div>
  );
}
