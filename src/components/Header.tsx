import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { useCart } from "@/hooks/use-cart";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [bump, setBump] = useState(false);

  // Micro-interaction: bump du badge quand totalCount change
  useEffect(() => {
    if (totalCount > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 300);
      return () => clearTimeout(t);
    }
  }, [totalCount]);

  return (
    <header className="fixed top-6 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl h-16 rounded-full bg-background/80 backdrop-blur border border-border shadow-xl px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Kabro Shop" className="h-10 w-auto" />
            <span className="sr-only">Kabro Shop - Livraison Express</span>
          </Link>
        </div>
        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-10">
          <NavLink to="/" className="text-base font-medium text-foreground hover:text-primary transition-colors" activeClassName="text-primary">Accueil</NavLink>
          <NavLink to="/catalogue/sweet-zone" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors" activeClassName="text-primary">Catalogue</NavLink>
          <NavLink to="/promotions" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors" activeClassName="text-primary">Promotions</NavLink>
          <NavLink to="/contact" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors" activeClassName="text-primary">Contact</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <Button asChild variant="gold" size="default" className="relative rounded-full">
            <Link to="/panier" className="relative inline-flex items-center justify-center w-11 h-11 rounded-full border hover:border-primary">
              <ShoppingCart className="w-5 h-5" />
              {totalCount > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs font-bold inline-flex items-center justify-center ${bump ? "animate-bump" : ""}`}>{totalCount}</span>
              )}
            </Link>
          </Button>

          {/* Auth (Desktop) */}
          {user ? (
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {user.name?.slice(0, 1).toUpperCase()}
              </div>
              <span className="text-sm text-muted-foreground">Bonjour, <span className="font-semibold text-foreground">{user.name}</span></span>
              <Button variant="outline" size="sm" className="rounded-full" onClick={logout}>Déconnexion</Button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/connexion"><Button variant="outline" size="sm" className="rounded-full">Connexion</Button></Link>
              <Link to="/inscription"><Button variant="gold" size="sm" className="rounded-full">Inscription</Button></Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden absolute left-0 right-0 top-24 mx-auto max-w-7xl bg-card border border-border rounded-2xl shadow-lg animate-fade-in" role="menu">
          <nav className="px-6 py-4 flex flex-col gap-2">
            <NavLink to="/" className="py-2 text-foreground font-medium hover:text-primary" activeClassName="text-primary">Accueil</NavLink>
            <NavLink to="/catalogue/sweet-zone" className="py-2 text-muted-foreground hover:text-primary" activeClassName="text-primary">Catalogue</NavLink>
            <NavLink to="/promotions" className="py-2 text-muted-foreground hover:text-primary" activeClassName="text-primary">Promotions</NavLink>
            <NavLink to="/contact" className="py-2 text-muted-foreground hover:text-primary" activeClassName="text-primary">Contact</NavLink>
            <div className="border-t mt-2 pt-2" />
            {/* (toggle thème retiré) */}
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm">{user.name}</span>
                <Button variant="outline" size="sm" className="rounded-full" onClick={logout}>Déconnexion</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/connexion" className="flex-1"><Button variant="outline" size="sm" className="w-full rounded-full">Connexion</Button></Link>
                <Link to="/inscription" className="flex-1"><Button variant="gold" size="sm" className="w-full rounded-full">Inscription</Button></Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
