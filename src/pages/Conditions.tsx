import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Conditions = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back link block removed per request */}

        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">Politique de Confidentialité Kabro</h1>
        <p className="text-muted-foreground mb-6">Le Respect de Votre Vie Privée</p>

        {/* Content Card */}
        <div className="mx-auto max-w-3xl bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 border border-border shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6 space-y-6 text-sm md:text-base leading-relaxed">
            <p className="text-muted-foreground">
              Bienvenue chez Kabro. Nous valorisons votre confiance. Cette politique explique comment nous traitons les informations que vous nous confiez lorsque vous visitez notre site ou passez une commande.
            </p>

            <h2 className="text-xl font-semibold text-foreground">1. Ce Que Nous Collectons (Automatiquement : Données d'Appareil)</h2>
            <p className="text-muted-foreground">
              Dès que vous explorez notre site, nous collectons des données de navigation pour améliorer votre expérience et sécuriser la plateforme. On appelle ces informations les « Données d'Appareil » :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Infos Techniques : Votre navigateur Web, votre adresse IP, votre fuseau horaire et les cookies installés sur votre appareil.</li>
              <li>Historique de Navigation : Les pages ou produits que vous consultez, les recherches qui vous ont mené jusqu'à nous, et la façon dont vous interagissez avec le site.</li>
            </ul>
            <p className="text-muted-foreground">
              Nous utilisons des technologies standards pour cette collecte : les cookies (fichiers de données anonymes, désactivables via http://www.allaboutcookies.org), les fichiers journaux (pour suivre l'activité), et les balises web (pour enregistrer les interactions).
            </p>

            <h2 className="text-xl font-semibold text-foreground">2. Ce Que Nous Collectons (Lors de la Commande : Données de Commande)</h2>
            <p className="text-muted-foreground">Lorsque vous passez une commande sur le site, nous collectons des informations nécessaires à la transaction. C'est ce qu'on appelle les « Données de Commande » :</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Identité et Livraison : Votre nom, adresse de facturation, adresse de livraison, email et numéro de téléphone.</li>
              <li>Paiement : Informations de paiement (carte de crédit, PayPal, etc.). Notez que ces données sont traitées de manière sécurisée et ne sont jamais stockées sur nos serveurs.</li>
            </ul>
            <p className="text-muted-foreground">Dans cette politique, « Vos Données » fait référence à la fois aux Données d'Appareil et aux Données de Commande.</p>

            <h2 className="text-xl font-semibold text-foreground">3. Pourquoi et Comment Nous Utilisons Vos Données</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Exécuter vos commandes : Nous utilisons les Données de Commande pour traiter votre paiement, organiser l'expédition et fournir les factures ou confirmations de commande.</li>
              <li>Communiquer avec vous : Pour le suivi de commande ou les réponses à vos questions.</li>
              <li>Sécurité et Fraude : Nous utilisons Vos Données, notamment votre adresse IP, pour identifier et prévenir les risques potentiels ou les tentatives de fraude.</li>
              <li>Amélioration du Service : Nous utilisons les Données d'Appareil pour optimiser notre site (analyser comment nos clients naviguent) et évaluer le succès de nos campagnes marketing.</li>
              <li>Marketing : Conformément à vos préférences, nous pouvons vous fournir des informations ou publicités pertinentes relatives à nos produits ou services.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">4. Le Partage de Vos Données</h2>
            <p className="text-muted-foreground">Nous partageons Vos Données avec des tiers uniquement pour les raisons suivantes et pour nous aider à faire fonctionner notre entreprise :</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Analyse : Nous utilisons Google Analytics pour nous aider à comprendre comment nos clients utilisent le site. Vous pouvez en savoir plus sur la façon dont Google utilise vos informations personnelles ici :
                <a className="text-gold hover:underline" href="https://www.google.com/intl/fr/policies/privacy/" target="_blank" rel="noopener noreferrer"> https://www.google.com/intl/fr/policies/privacy/</a>.
                Vous pouvez vous désinscrire de Google Analytics ici :
                <a className="text-gold hover:underline" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer"> https://tools.google.com/dlpage/gaoptout</a>.
              </li>
              <li>Légal : Nous pouvons partager Vos Données pour nous conformer aux lois et réglementations applicables, pour répondre à une demande légale d’informations (citation à comparaître, mandat de perquisition), ou pour protéger nos droits.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">5. Publicité Ciblée et Vos Choix</h2>
            <p className="text-muted-foreground">Nous utilisons Vos Données pour vous proposer des publicités ciblées ou des communications marketing susceptibles de vous intéresser.</p>
            <p className="text-muted-foreground">Vous avez le droit de vous opposer à cette publicité ciblée en utilisant les ressources suivantes :</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Facebook — Paramètres des publicités (adresse: https://www.facebook.com/settings/?tab=ads)</li>
              <li>Google — Paramètres des publicités (adresse: https://www.google.com/settings/ads/anonymous)</li>
              <li>Portail de désinscription de la Digital Advertising Alliance (adresse: http://optout.aboutads.info/)</li>
            </ul>
            <p className="text-muted-foreground">Veuillez noter que nous n'altérons pas nos pratiques de collecte et d’utilisation des données lorsque nous voyons un signal « Ne pas suivre » de votre navigateur.</p>

            <h2 className="text-xl font-semibold text-foreground">6. Conservation des Données et Modifications</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Conservation : Lorsque vous passez une commande, nous conservons vos Données de Commande pour nos dossiers, jusqu'à ce que vous demandiez la suppression de ces informations.</li>
              <li>Changements : Nous pouvons mettre à jour cette politique de confidentialité de temps à autre afin de refléter, par exemple, des changements dans nos pratiques ou pour d’autres raisons opérationnelles, légales ou réglementaires.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conditions;