import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    try {
      // Demo: simulate sending, replace with your API endpoint later
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess("Merci ! Votre message a été envoyé.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">Contact</h1>
        <p className="text-muted-foreground mb-6">Dites-nous bonjour ! Support et livraisons 24/7 arrivent bientôt.</p>

        <div className="mx-auto max-w-2xl bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 border border-border shadow-xl rounded-2xl">
          <div className="px-6 pt-6">
            <h2 className="text-xl font-semibold">Nous contacter</h2>
            <p className="text-sm text-muted-foreground">Remplissez le formulaire et nous reviendrons vers vous.</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" name="name" placeholder="Votre nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="vous@exemple.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Écrivez votre message ici..." rows={6} required />
              </div>

              {success && <p className="text-green-600 text-sm">{success}</p>}
              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex gap-3">
                <Button type="submit" variant="gold" className="rounded-full px-6" disabled={loading}>
                  {loading ? "Envoi..." : "Envoyer"}
                </Button>
                <Button type="reset" variant="outline" className="rounded-full">Réinitialiser</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;