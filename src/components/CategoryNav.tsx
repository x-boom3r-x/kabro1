import { useState } from "react";
import { ChevronDown, Search, Candy, Flame, Coffee, ShoppingBasket, Cigarette, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const categories = [
  {
    id: "sweet-zone",
    name: "Sweet Zone",
    icon: Candy,
    subcategories: [
      { name: "Glaces & Frozen", examples: "Ben & Jerry's, Magnum" },
      { name: "Chocolat Factory", examples: "Reese's, Hershey's" },
      { name: "Candy Shop", examples: "Nerds, Sour Patch Kids" },
      { name: "Biscuits & Cookies", examples: "Oreo Import, Pop Tarts" },
    ],
  },
  {
    id: "salty-corner",
    name: "Salty Corner",
    icon: Flame,
    subcategories: [
      { name: "Chips & Crisp", examples: "Cheetos Flamin' Hot, Takis Fuego" },
      { name: "Apéro Time", examples: "Pringles, Bretzels" },
      { name: "Asian Spicy", examples: "Samyang Carbonara, Ramen Buldak" },
      { name: "Graines & Nuts", examples: "Pistaches, Cajou" },
    ],
  },
  {
    id: "drinks-lab",
    name: "Drinks Lab",
    icon: Coffee,
    subcategories: [
      { name: "Sodas US & World", examples: "Dr Pepper, Fanta Berry" },
      { name: "Energy Boost", examples: "Monster, Red Bull" },
      { name: "Chill Drinks", examples: "Starbucks Frappuccino, Arizona Tea" },
      { name: "Hydratation", examples: "Eau Fiji, Jus Mogu Mogu" },
    ],
  },
  {
    id: "market-express",
    name: "Market Express",
    icon: ShoppingBasket,
    subcategories: [
      { name: "Morning Mood", examples: "Céréales Lucky Charms, Pâte à tartiner" },
      { name: "Fresh & Dairy", examples: "Yaourt à boire, Fromage" },
      { name: "Pantry Basics", examples: "Pain de mie, Oeufs" },
      { name: "Home Essentials", examples: "Piles, Ampoules" },
    ],
  },
  {
    id: "smoke-lounge",
    name: "Smoke Lounge",
    icon: Cigarette,
    subcategories: [
      { name: "Cigares & Tabac", examples: "Marlboro, Camel" },
      { name: "Rolling Papers", examples: "Feuilles OCB, Raw" },
      { name: "Hookah & Vape", examples: "Puffs, Charbon à Chicha" },
      { name: "Lighters & Gear", examples: "Briquets Clipper, Grinders" },
    ],
  },
  {
    id: "self-care",
    name: "Self Care",
    icon: Heart,
    subcategories: [
      { name: "Body & Hair", examples: "Gel douche Axe, Old Spice" },
      { name: "First Aid", examples: "Pansements, Doliprane" },
      { name: "Intimacy", examples: "Durex, Lubrifiants" },
      { name: "Skin Routine", examples: "Masques, Crèmes" },
    ],
  },
];

type Category = { id: string; name: string; subcategories?: { name: string; examples?: string }[] };
type Product = { slug: string; name: string; price: number; originalPrice?: number; image?: string; rating?: number; isHot?: boolean; categoryId: string; subcategorySlug?: string };
type ProductsResponse = { categories: Category[]; products: Product[] };

const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("Erreur de chargement des produits");
  return res.json();
};

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<ProductsResponse>({ queryKey: ["products"], queryFn: fetchProducts });
  const categoryNameMap = new Map<string, string>((data?.categories || []).map((c) => [c.id, c.name]));
  const suggestions = (data?.products || [])
    .filter((p) => searchQuery.trim() && p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    .slice(0, 6);

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, "")
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <div className="pt-16 bg-background border-b border-border">
      {/* Categories Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border whitespace-nowrap transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-gold"
                    : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="font-semibold text-sm">{category.name}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isActive && "rotate-180"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Subcategories Dropdown */}
        {activeCategory && (
          <div className="pb-4 animate-fade-in">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories
                  .find((c) => c.id === activeCategory)
                  ?.subcategories.map((sub, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(`/catalogue/${activeCategory}/${slugify(sub.name)}`)}
                      className="text-left p-3 rounded-lg bg-accent/50 hover:bg-primary/10 hover:border-primary border border-transparent transition-all group"
                    >
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {sub.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{sub.examples}</p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearchQuery("");
                if (e.key === "Enter" && suggestions.length > 0) {
                  navigate(`/product/${suggestions[0].slug}`);
                }
              }}
              placeholder="Rechercher un produit (Cheetos, Monster, Reese's...)"
              aria-label="Rechercher un produit"
              autoComplete="off"
              className="w-full h-12 pl-12 pr-12 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Effacer la recherche"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Suggestions Dropdown */}
            {(searchQuery.trim() && (isLoading || suggestions.length > 0)) && (
              <div className="absolute left-0 right-0 mt-2 rounded-xl border border-border bg-card shadow-md z-20">
                {isLoading ? (
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse" />
                  </div>
                ) : (
                  <ul className="max-h-64 overflow-auto">
                    {suggestions.map((p) => (
                      <li key={p.slug} className="border-b border-border last:border-0">
                        <Link
                          to={`/product/${p.slug}`}
                          className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-primary/10 transition-colors"
                          onClick={() => setSearchQuery("")}
                        >
                          <span className="text-sm text-foreground">{p.name}</span>
                          <span className="text-xs text-muted-foreground">{categoryNameMap.get(p.categoryId) || "Autres"}</span>
                        </Link>
                      </li>
                    ))}
                    {suggestions.length === 0 && (
                      <li className="px-4 py-3 text-sm text-muted-foreground">Aucun résultat</li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
