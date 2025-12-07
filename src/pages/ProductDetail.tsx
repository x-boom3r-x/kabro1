import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/hooks/use-toast";

interface Category { id: string; name: string; }
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
interface ProductsResponse { categories: Category[]; products: Product[]; }

const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("Erreur de chargement des produits");
  return res.json();
};

const ProductDetail = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const { addItem } = useCart();

  if (isLoading) return <div className="container mx-auto px-4 py-16">Chargement...</div>;
  if (error || !data) return <div className="container mx-auto px-4 py-16">Une erreur est survenue.</div>;

  const product = data.products.find((p) => p.slug === slug);
  if (!product) return <div className="container mx-auto px-4 py-16">Produit introuvable.</div>;

  const category = data.categories.find((c) => c.id === product.categoryId);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span className="mx-2">/</span>
          {category ? (
            <Link to={`/catalogue/${category.id}`} className="hover:text-primary">{category.name}</Link>
          ) : (
            <span>Catalogue</span>
          )}
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl border border-border p-4">
            {/* Placeholder carré blanc */}
            <div className="w-full aspect-square rounded-xl bg-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">{product.name}</h1>

            {/* Short 3-line description */}
            <div className="space-y-1 text-sm text-muted-foreground mb-4">
              <p>Importé — goût authentique.</p>
              <p>Livraison express 15–30 min.</p>
              <p>Qualité premium, stock limité.</p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm text-foreground font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">(42)</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-primary">{product.price} DH</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.originalPrice} DH</span>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="gold" onClick={() => {
                addItem({ slug: product.slug, name: product.name, price: product.price, image: product.image }, 1);
                toast({ title: "Ajouté au panier", description: `${product.name} a été ajouté.` });
              }}>
                <ShoppingCart className="w-5 h-5" />
                Ajouter au panier
              </Button>
              <Link to={`/catalogue/${product.categoryId}/${product.subcategorySlug}`} className="inline-flex items-center px-4 py-2 rounded-lg border bg-card text-foreground border-border hover:border-primary">
                Voir plus dans la catégorie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;