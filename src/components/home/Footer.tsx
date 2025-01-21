import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#414145] backdrop-blur-md mt-12 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <nav className="flex gap-8">
          <Link to="/cadastro" className="text-white/80 hover:text-white transition-colors">
            Registre-se
          </Link>
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Termos de Uso
          </Link>
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Política de Privacidade
          </Link>
        </nav>
        <p className="text-white/70 text-sm">
          Made in Brazil 🇧🇷
        </p>
      </div>
    </footer>
  );
};