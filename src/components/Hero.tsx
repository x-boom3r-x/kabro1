import { Button } from "@/components/ui/button";
import { Zap, Clock, ShoppingBag, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt={"Kabro - Livraison nocturne premium"}
          className="w-full h-full object-cover opacity-50 brightness-90 saturate-110"
        />
        {/* Subtle lateral overlay to keep text contrast, but more transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent pointer-events-none" />
        {/* Bottom blend overlay */}
        <div className="absolute bottom-0 inset-x-0 h-56 md:h-72 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-slide-up p-6 md:p-8">
           {/* Badge retiré */}
           {/* Badge supprimé conformément à la demande */}
           
           {/* Title */}
           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight mb-6">
             Tes snacks livrés en un{" "}
             <span className="text-gradient-gold">éclair</span>{" "}
             <Zap className="inline-block w-10 h-10 md:w-14 md:h-14 text-primary" />
           </h1>

           {/* Subtitle */}
           <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
             Snacks rares, boissons exclusives et dépannage nocturne. 
             Livré chez toi en <span className="text-primary font-semibold">15-30 minutes</span>.
           </p>

           {/* CTA Buttons */}
           <div className="flex flex-wrap gap-4 mb-10">
             <Button asChild variant="gold" size="xl">
               <Link to="/catalogue/sweet-zone" aria-label="Commander maintenant">
                 <ShoppingBag className="w-5 h-5" />
                 Commander Maintenant
               </Link>
             </Button>
             <Button asChild variant="outline" size="xl">
               <Link to="/catalogue" aria-label="Voir le catalogue">Voir le Catalogue</Link>
             </Button>
           </div>

           {/* Trust Badges */}
           <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
               <Clock className="w-5 h-5 text-primary" />
               <span>Ouvert jusqu'à <span className="text-foreground font-semibold">3h du matin</span></span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span>Livraison <span className="text-primary font-semibold">Express</span></span>
             </div>
           </div>
         </div>
      </div>
    </section>
  );
};

export default Hero;
