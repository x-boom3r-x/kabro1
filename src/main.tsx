import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Forcer l'interface en mode unique (pas de dark)
document.documentElement.classList.remove("dark");
localStorage.removeItem("theme");

createRoot(document.getElementById("root")!).render(<App />);
