import CategoryNav from "@/components/CategoryNav";
import Hero from "@/components/Hero";
import TrendingProducts from "@/components/TrendingProducts";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CategoryNav />
      <main>
        <Hero />
        <TrendingProducts />
      </main>
    </div>
  );
};

export default Index;
