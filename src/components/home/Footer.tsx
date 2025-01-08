import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#221F26] backdrop-blur-md mt-12 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <nav className="flex gap-8">
          <Link to="/sobre" className="text-white/80 hover:text-white transition-colors">
            Sobre
          </Link>
          <Link to="/cadastro" className="text-white/80 hover:text-white transition-colors">
            Registre-se
          </Link>
          <Link to="/contato" className="text-white/80 hover:text-white transition-colors">
            Fale Conosco
          </Link>
        </nav>
        <p className="text-white/70 text-sm">
          Made in Brazil 🇧🇷
        </p>
      </div>
    </footer>
  );
};