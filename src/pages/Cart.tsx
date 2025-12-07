import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const { items, updateItemQuantity, removeItem, subtotal, totalCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-black mb-2">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">Ajoutez des produits pour commencer vos achats.</p>
          <Link to="/catalogue" className="inline-block">
            <Button variant="gold">Voir le catalogue</Button>
          </Link>
        </div>
      </div>
    );
  }

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

        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-6">Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card">
                {/* Placeholder carré blanc */}
                <div className="w-20 h-20 rounded-lg bg-white border border-border" />
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.price} DH</p>

                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => updateItemQuantity(item.slug, Math.max(1, item.quantity - 1))}>-</Button>
                    <span className="px-3 py-1 rounded bg-muted text-foreground text-sm">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateItemQuantity(item.slug, item.quantity + 1)}>+</Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-primary">{(item.price * item.quantity).toFixed(2)} DH</span>
                  <Button variant="destructive" size="icon" onClick={() => removeItem(item.slug)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="p-6 rounded-2xl border border-border bg-card sticky top-24">
              <h2 className="text-xl font-bold mb-4">Résumé</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Articles</span><span>{totalCount}</span></div>
                <div className="flex justify-between"><span>Sous-total</span><span>{subtotal.toFixed(2)} DH</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Livraison</span><span>Calculée à l'étape suivante</span></div>
              </div>
              <Button className="w-full mt-6" variant="gold" asChild>
                <Link to="/paiement">Continuer vers le paiement</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}