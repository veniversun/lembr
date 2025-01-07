import React from 'react';

export const Header = () => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        I N S U M M A
      </h1>
      <p className="text-lg md:text-3xl text-gray-700 max-w-md mx-auto px-4 font-['Caveat'] font-bold">
        Absorva mais dos melhores livros!
      </p>
    </div>
  );
};