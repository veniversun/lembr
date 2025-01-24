import React from 'react';
import { BookOpen, BookCheck, Brain } from 'lucide-react';

export const MessageBox = () => {
  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/50 mb-8 md:mb-12 hover:bg-white/70 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* Section 1: Não li */}
        <div className="flex flex-col items-center text-center">
          <BookOpen className="w-12 h-12 text-[#f6d964] hover:text-[#222222] transition-colors duration-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3"> Quero ler</h3>
          <p className="text-gray-600 leading-relaxed">
            Fuja das partes chatas. Com a nossa curadoria você vai direto às ideias mais poderosas do livro de forma prática e divertida!
          </p>
        </div>

        {/* Section 2: Já li */}
        <div className="flex flex-col items-center text-center">
          <BookCheck className="w-12 h-12 text-[#] hover:text-[#f6d964] transition-colors duration-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Lidos </h3>
          <p className="text-gray-600 leading-relaxed">
            Chega daquela sensação de ler, ler e não levar nada! Aqui você vai revisar os melhores conceitos dos best-seller com foco na prática!
          </p>
        </div>

        {/* Section 3: Livros? */}
        <div className="flex flex-col items-center text-center">
          <Brain className="w-12 h-12 text-[#222222] hover:text-[#f6d964] transition-colors duration-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Livros?</h3>
          <p className="text-gray-600 leading-relaxed">
            Não liga para nomes de livros? Vamos direto aos resultados! Organizamos as ideias e conceitos em temas. Pratique sem se perder em historinhas.
          </p>
        </div>

      </div>
    </div>
  );
};