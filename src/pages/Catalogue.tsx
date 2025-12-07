import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
  subcategories: { slug: string; name: string }[];
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
  subcategorySlug: string;
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

const Catalogue = () => {
  const { categoryId, subSlug } = useParams();
  const { data, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  if (isLoading) return <div className="container mx-auto px-4 py-16">Chargement...</div>;
  if (error || !data) return <div className="container mx-auto px-4 py-16">Une erreur est survenue.</div>;

  const category = data.categories.find((c) => c.id === categoryId);
  if (!category) return <div className="container mx-auto px-4 py-16">Catégorie introuvable.</div>;

  const filtered = data.products.filter((p) => p.categoryId === category.id && (!subSlug || p.subcategorySlug === subSlug));

  const sub = subSlug ? category.subcategories.find((s) => s.slug === subSlug) : undefined;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="mb-3">
            <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to={`/catalogue/${category.id}`} className="hover:text-primary">{category.name}</Link>
            {sub && (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">{sub.name}</span>
              </>
            )}
          </nav>
          {sub && (
            <div className="mt-3">
              <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
                <Link to={`/catalogue/${category.id}`}>
                  <ArrowLeft className="w-4 h-4" />
                  Retour à {category.name}
                </Link>
              </Button>
            </div>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
          {category.name} {sub ? `- ${sub.name}` : ""}
        </h1>
        <p className="text-muted-foreground mb-6">{filtered.length} produit(s)</p>

        {/* Sous-catégories rapides */}
        <div className="flex flex-wrap gap-2 mb-8">
          {category.subcategories.map((s) => (
            <Link
              key={s.slug}
              to={`/catalogue/${category.id}/${s.slug}`}
              className={`px-3 py-1.5 rounded-lg border ${subSlug === s.slug ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary"}`}
            >
              {s.name}
            </Link>
          ))}
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.slug} {...product} category={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;