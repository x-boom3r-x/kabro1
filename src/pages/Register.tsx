import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await register(name, email, password);
    setLoading(false);
    if (!ok) {
      toast.error("Email déjà utilisé");
      return;
    }
    toast.success("Inscription réussie");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md rounded-3xl bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30 shadow-xl p-6">
        <h1 className="text-2xl font-black mb-4">Inscription</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nom</label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Votre nom" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="vous@exemple.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Mot de passe</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Création du compte..." : "Créer un compte"}
          </Button>
        </form>
        <p className="text-sm text-muted-foreground mt-4">
          Déjà un compte ? <Link to="/connexion" className="underline">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
}