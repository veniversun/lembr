import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-white/60 backdrop-blur-md mt-12 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <nav className="flex gap-8">
          <Link to="/sobre" className="text-gray-600 hover:text-gray-900 transition-colors">
            Sobre
          </Link>
          <Link to="/cadastro" className="text-gray-600 hover:text-gray-900 transition-colors">
            Registre-se
          </Link>
          <Link to="/contato" className="text-gray-600 hover:text-gray-900 transition-colors">
            Fale Conosco
          </Link>
        </nav>
        <p className="text-gray-500 text-sm">
          Made in Brazil 🇧🇷
        </p>
      </div>
    </footer>
  );
};