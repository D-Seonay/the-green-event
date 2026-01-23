'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WaveDivider from '@/components/ui/WaveDivider';

export default function CgvPage() {
  return (
    <div className="min-h-screen bg-forest text-cream font-body pt-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12">
        <Button asChild variant="outline" className="mb-8 border-cream text-cream hover:bg-cream hover:text-forest">
          <Link href="/">← Retour à l'accueil</Link>
        </Button>

        <h1 className="text-cream text-5xl md:text-7xl font-display font-black mb-8 text-center uppercase leading-tight">
          Conditions Générales de Vente (CGV)
        </h1>
        <WaveDivider variant="forest-to-cream" flip={false} className="mb-12" />

        <div className="prose prose-invert lg:prose-xl mx-auto">
          <h2 className="text-leaf text-3xl font-display font-bold mb-4">1. Objet et champ d'application</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes de produits (goodies éco-responsables) réalisées par l'association "The Green Event" via son site internet. Toute commande implique l'acceptation sans réserve par l'acheteur des présentes CGV.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">2. Produits</h2>
          <p>
            L'association "The Green Event" propose à la vente des goodies et produits dérivés éco-responsables, en lien avec l'identité et les valeurs de l'événement. Les caractéristiques essentielles des produits sont présentées sur la page "Boutique" du site. Les photographies n'ont pas de valeur contractuelle.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">3. Prix</h2>
          <p>
            Les prix de nos produits sont indiqués en Euros (€) toutes taxes comprises (TTC). L'association se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">4. Paiement</h2>
          <p>
            Le paiement des achats s'effectue via la plateforme sécurisée de notre partenaire <strong>HelloAsso</strong>. En cliquant sur "Procéder au paiement", l'utilisateur est redirigé vers l'interface de paiement HelloAsso. L'association "The Green Event" n'a jamais accès aux informations bancaires de ses clients.
          </p>
          <p>
            HelloAsso est une entreprise solidaire d'utilité sociale (ESUS) qui fournit des solutions de paiement en ligne pour les associations.
          </p>
          <p>
            Toute commande ne sera validée qu'après confirmation du paiement par HelloAsso.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">5. Livraison et Retrait (Click & Collect)</h2>
          <p>
            Nos produits sont principalement disponibles en "Click & Collect" (retrait sur place).
          </p>
          <ul>
            <li>
              <strong>Retrait pendant le festival :</strong> Les commandes pourront être retirées au stand "Boutique" de l'événement "The Green Event" aux dates et heures d'ouverture du festival.
            </li>
            <li>
              <strong>Retrait au siège de l'association :</strong> En dehors des périodes de festival, le retrait des commandes pourra s'effectuer sur rendez-vous au siège de l'association à 44120 Vertou.
            </li>
          </ul>
          <p>
            Un justificatif de commande (email de confirmation) et une pièce d'identité seront demandés lors du retrait.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">6. Droit de rétractation</h2>
          <p>
            Conformément aux dispositions légales en vigueur (article L221-18 du Code de la Consommation), l'acheteur dispose d'un délai de quatorze (14) jours à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
          </p>
          <p>
            Pour exercer ce droit, l'acheteur doit informer l'association de sa décision au moyen d'une déclaration dénuée d'ambiguïté (par email à <a href="mailto:contact@thegreenevent.com" className="text-leaf hover:underline">contact@thegreenevent.com</a>). Les produits doivent être retournés dans leur état d'origine et complets. Les frais de retour sont à la charge de l'acheteur. Le remboursement sera effectué dans un délai de quatorze (14) jours à compter de la réception des produits retournés.
          </p>

          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">7. Responsabilité</h2>
          <p>
            L'association "The Green Event" ne saurait être tenue pour responsable des inconvénients ou dommages inhérents à l'utilisation du réseau Internet, notamment une rupture de service, une intrusion extérieure ou la présence de virus informatiques.
          </p>
          
          <h2 className="text-leaf text-3xl font-display font-bold mb-4 mt-8">8. Droit applicable et litiges</h2>
          <p>
            Les présentes CGV sont soumises à la loi française. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </div>
      </div>
    </div>
  );
}
