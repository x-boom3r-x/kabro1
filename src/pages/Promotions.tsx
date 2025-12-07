import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";

type Product = {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  isHot?: boolean;
  categoryId: string;
  subcategorySlug?: string;
};

type ProductsResponse = {
  products: Product[];
};

const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("Impossible de charger les produits");
  return res.json();
};

const Promotions = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  const promos = (data?.products || [])
    .filter((p) => typeof p.originalPrice === "number" && (p.originalPrice as number) > p.price)
    .sort((a, b) => {
      const da = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
      const db = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
      return db - da;
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">Promotions</h1>
        <p className="text-muted-foreground mb-6">Profitez des meilleures offres du moment.</p>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 animate-pulse">
                <div className="h-36 rounded-lg bg-muted mb-3" />
                <div className="h-4 w-3/4 bg-muted rounded mb-2" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-muted-foreground mb-4">Impossible de charger les promotions pour le moment.</p>
            <Button onClick={() => location.reload()} variant="gold">Réessayer</Button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{promos.length} produits en promotion</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {promos.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  image={p.image}
                  rating={p.rating}
                  isHot={p.isHot}
                />
              ))}
            </div>
            {promos.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <p className="text-muted-foreground">Aucune promotion disponible pour le moment. Revenez plus tard !</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Promotions;