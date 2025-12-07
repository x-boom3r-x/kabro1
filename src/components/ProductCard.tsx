import { Plus, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isHot?: boolean;
  category: string;
}

const ProductCard = ({
  slug,
  name,
  price,
  originalPrice,
  image,
  rating,
  isHot,
  category,
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
const { addItem } = useCart();
return (
    <Link to={`/product/${slug}`} className="group relative bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(0_0%_0%_/_0.5)] hover:border-primary/50">
      {/* Image Container */}
      <div className="relative aspect-square bg-white p-4 overflow-hidden">
        {/* Placeholder carré blanc */}
        <div className="w-full h-full rounded-lg bg-white" />
        {/* Hot Badge & Discount ... */}
        {/* Quick Add Button */}
        <Button
          variant="gold"
          size="icon"
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem({ slug, name, price, image }, 1);
            toast({ title: "Ajouté au panier", description: `${name} a été ajouté.` });
          }}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-primary uppercase tracking-wider font-medium">
          {category}
        </span>

        {/* Name */}
        <h3 className="text-foreground font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="text-sm text-foreground font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">(42)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">{price} DH</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice} DH
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
