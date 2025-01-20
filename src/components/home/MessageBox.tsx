import React from 'react';

export const MessageBox = () => {
  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/50 mb-8 md:mb-12 hover:bg-white/70 transition-all duration-300">
      <p className="text-gray-700 text-center leading-relaxed text-4xl md:text-5xl font-bold">
        Aprenda o melhor dos Best-Sellers!
      </p>
      
      <p></p>
      
      <p className="text-gray-700 text-center leading-relaxed">
        Não basta ler os melhores livros. É preciso aprender com eles. Somente praticando é possível crescer de verdade!<br /><br />
        O Lembr ajuda você a absorver os mais poderosos conceitos dos melhores livros de desenvolvimento pessoal.<br /><br />
        Aprenda, cresça e lidere com o Lembr!
      </p>
    </div>
  );
};