import React from 'react';

export const MessageBox = () => {
  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50 mb-8 md:mb-12 hover:bg-white/70 transition-all duration-300">
      <p className="text-gray-700 text-center leading-relaxed">
        Não basta ler livros ótimos. É preciso aprender com eles. Somente praticando é possível crescer de verdade!<br /><br />
        O inSumma utiliza IA para absorver os mais potentes conceitos dos melhores livros de desenvolvimento pessoal.<br /><br />
        Aprenda, cresca e multiplique com o inSumma!
      </p>
    </div>
  );
};