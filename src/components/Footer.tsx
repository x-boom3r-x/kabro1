import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="Kabro Shop" className="h-8 w-auto" />
              <span className="sr-only">Kabro Shop - Livraison Express</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tes cravings livrés en un éclair. Dépannage nocturne au Maroc.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:rotate-6">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-rotate-6">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Catégories</h4>
            <ul className="space-y-2">
              {["Sweet Zone", "Salty Corner", "Drinks Lab", "Market Express", "Smoke Lounge", "Self Care"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Informations</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-bold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+212 6 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">contact@kabro.ma</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-primary font-semibold">18h - 3h du matin</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Kabro. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/conditions" className="hover:text-foreground transition-colors">Politique de confidentialité</Link>
            {/* Remove dead link and add back-to-top */}
            <button onClick={scrollToTop} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors" aria-label="Retour en haut">
              <ArrowUp className="w-4 h-4" />
              <span>Retour en haut</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
