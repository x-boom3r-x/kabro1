import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Flame } from "lucide-react";

interface Category {
  id: string;
  name: string;
  subcategories?: { slug: string; name: string }[];
}

interface Product {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isHot?: boolean;
  categoryId: string;
  subcategorySlug?: string;
}

interface ProductsResponse {
  categories: Category[];
  products: Product[];
}

const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("Erreur de chargement des produits");
  return res.json();
};

const TrendingProducts = () => {
  const { data, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <p className="text-sm text-destructive">Impossible de charger les produits tendance.</p>
      </section>
    );
  }

  const trending = data?.products.filter((p) => p.isHot) || [];
  const categoryNameMap = new Map<string, string>(
    (data?.categories || []).map((c) => [c.id, c.name])
  );

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-foreground">
          <span className="text-gradient-gold">Tendances</span>
        </h2>
        <Flame className="w-5 h-5 text-primary" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((p) => (
            <ProductCard
              key={p.slug}
              slug={p.slug}
              name={p.name}
              price={p.price}
              originalPrice={p.originalPrice}
              image={p.image}
              rating={p.rating}
              isHot={p.isHot}
              category={categoryNameMap.get(p.categoryId) || "Autres"}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;