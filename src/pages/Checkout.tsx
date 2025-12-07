import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-4">
            <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
          <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-6 shadow">
            <h1 className="text-2xl md:text-3xl font-black mb-3">Connexion requise</h1>
            <p className="text-muted-foreground mb-6">Veuillez vous connecter pour finaliser votre commande.</p>
            <div className="flex gap-2">
              <Link to="/connexion" className="flex-1"><Button variant="outline" className="w-full rounded-full">Se connecter</Button></Link>
              <Link to="/inscription" className="flex-1"><Button variant="gold" className="w-full rounded-full">Créer un compte</Button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
const total = subtotal; // you can add shipping or taxes later

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/merci");
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-black mb-6">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            -             <div className="rounded-2xl border border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-xl">
            
            <div className="px-6 pt-6">
              <h2 className="text-xl font-semibold">Adresse de livraison</h2>
              <p className="text-sm text-muted-foreground">Coordonnées pour la livraison.</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nom complet</Label>
                  <Input id="fullName" name="fullName" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" name="phone" placeholder="06..." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" name="address" placeholder="Adresse complète" />
                </div>
                <div className="grid grid-cols-3 gap-3 md:col-span-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" name="city" placeholder="Ville" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Code postal</Label>
                    <Input id="zip" name="zip" placeholder="Code postal" />
                  </div>
                  {/* removed language select */}
                </div>
              </div>
            </div>
          </div>

            {/* Payment Method */}
            -            <div className="rounded-2xl border border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-xl">
              <div className="px-6 pt-6">
                <h2 className="text-xl font-semibold mb-2">Méthode de paiement</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="pay" defaultChecked />
                    <span>Paiement à la livraison</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="pay" />
                    <span>Carte bancaire (bientôt)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
          -   <div className="rounded-2xl border border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-xl sticky top-24">
               <div className="px-6 pt-6">
                 <h2 className="text-xl font-semibold mb-2">Résumé</h2>
               </div>
               <div className="p-6">
                 <div className="space-y-2 text-sm">
                   <div className="flex justify-between"><span>Sous-total</span><span>{subtotal.toFixed(2)} DH</span></div>
                   <div className="flex justify-between text-muted-foreground"><span>Livraison</span><span>Calculée à la livraison</span></div>
                   <div className="flex justify-between font-bold"><span>Total</span><span>{total.toFixed(2)} DH</span></div>
                 </div>
                 <Button className="w-full mt-6" variant="gold" onClick={handlePlaceOrder}>Passer la commande</Button>
                 <Link to="/panier" className="block mt-3 text-center text-sm text-muted-foreground hover:text-primary">Retour au panier</Link>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}