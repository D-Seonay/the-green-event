'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WaveDivider from '@/components/ui/WaveDivider';

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
          <h2 className="text-leaf text-3xl font-display font-bold mb-4">1. Identité de l&apos;association</h2>
          <p>
            <strong>Nom de l&apos;association :</strong> The Green Event
          </p>
          <p>
            <strong>Adresse :</strong> 44120 Vertou
          </p>
          <p>
            <strong>Contact :</strong> <a href="mailto:contact@thegreenevent.com" className="text-leaf hover:underline">contact@thegreenevent.com</a>
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">2. Hébergement</h2>
          <p>
            Le site internet &quot;The Green Event&quot; est hébergé par Vercel Inc., dont le siège social est situé :
          </p>
          <p>
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789, USA<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-leaf hover:underline">https://vercel.com</a>
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">3. Propriété intellectuelle</h2>
          <p>
            L&apos;intégralité du site &quot;The Green Event&quot;, y compris la conception, les textes, les images, les éléments graphiques, le logo et les animations, sont la propriété exclusive de l&apos;association &quot;The Green Event&quot;. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l&apos;association.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">4. Politique de confidentialité (RGPD)</h2>
          <p>
            L&apos;association &quot;The Green Event&quot; s&apos;engage à protéger la vie privée de ses utilisateurs. Les données personnelles collectées via le formulaire d&apos;inscription à la newsletter ou le formulaire de contact (telles que nom, prénom, adresse email) sont uniquement utilisées pour l&apos;envoi de communications relatives à l&apos;événement et pour répondre aux demandes des utilisateurs.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition relatif à vos données personnelles. Pour exercer ces droits, veuillez nous contacter à &lt;a href=&quot;mailto:contact@thegreenevent.com&quot; className=&quot;text-leaf hover:underline&quot;&gt;contact@thegreenevent.com&lt;/a&gt;. Vos données ne seront en aucun cas cédées à des tiers.
          </p>
        </div>
      </div>
    </div>
  );
}
