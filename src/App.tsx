import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Catalogue from "./pages/Catalogue";
import ProductDetail from "./pages/ProductDetail";
import Promotions from "./pages/Promotions";
import Contact from "./pages/Contact";
import { CartProvider } from "@/hooks/use-cart";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "@/hooks/use-auth";
import Conditions from "./pages/Conditions";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  // Afficher le bouton retour en haut après un léger scroll
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-background pt-16">
                <Header />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/catalogue" element={<Navigate to="/catalogue/sweet-zone" replace />} />
                  <Route path="/catalogue/:categoryId" element={<Catalogue />} />
                  <Route path="/catalogue/:categoryId/:subSlug" element={<Catalogue />} />
                  <Route path="/promotions" element={<Promotions />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/panier" element={<CartPage />} />
                  <Route path="/paiement" element={<CheckoutPage />} />
                  <Route path="/connexion" element={<Login />} />
                  <Route path="/inscription" element={<Register />} />
                  <Route path="/conditions" element={<Conditions />} />
                  <Route
                    path="/merci"
                    element={
                      <div className="container mx-auto px-4 py-16 text-center">
                        <h1 className="text-3xl md:text-4xl font-black mb-4">Merci pour votre commande !</h1>
                        <p className="text-muted-foreground mb-6">Votre commande a été enregistrée. Vous recevrez une confirmation prochainement.</p>
                        <Link to="/"><Button variant="gold">Retour à l'accueil</Button></Link>
                      </div>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Bouton flottant supprimé à la demande */}

                <Footer />
              </div>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
