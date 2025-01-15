import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Link to="/" className="block">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          L E M B R
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 max-w-md mx-auto px-4 font-['Caveat'] font-bold">
          Absorva mais dos melhores livros!
        </p>
      </div>
    </Link>
  );
};