import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ComparisonTable = () => {
  const features = [
    {
      free: '1 livro para treino',
      plus: '4 livros atualmente e 2 novos todo mês',
    },
    {
      free: '10 questões por livro',
      plus: 'Mínimo de 20 questões por livro',
    },
    {
      free: '1 resumo exemplo',
      plus: 'Resumo de todos os livros',
    },
    {
      free: 'Podcasts abertos',
      plus: 'Podcast de cada livro e mais exclusivos',
    },
  ];

  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 mt-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Compare os Planos</h2>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Free Column */}
        <div className="space-y-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">FREE</h3>
            <p className="text-gray-600 mt-2">Comece Agora</p>
            <Button 
              className="mt-4 w-full bg-gray-600 hover:bg-gray-700"
              onClick={() => window.location.href = '/cadastro'}
            >
              Começar Grátis
            </Button>
          </div>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <X className="h-5 w-5 text-red-500" />
                <span className="text-gray-700">{feature.free}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plus Column */}
        <div className="space-y-6">
          <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800">PLUS</h3>
            <p className="text-purple-600 mt-2">Acesso Completo</p>
            <Button 
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => window.location.href = '/cadastro'}
            >
              Obter Plus
            </Button>
          </div>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">{feature.plus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};