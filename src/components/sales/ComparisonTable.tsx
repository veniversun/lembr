import React from 'react';
import { Check, Dot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const ComparisonTable = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      free: '1 livro para treino',
      plus: 'Acervo completo de livros',
    },
    {
      free: '10 questões por livro',
      plus: 'Dezenas de questões por livro',
    },
    {
      free: '1 resumo exemplo',
      plus: 'Resumo de todos os livros',
    },
    {
      free: 'Podcasts abertos',
      plus: 'Playlist com podcast de cada livro e mais exclusivos',
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
              onClick={() => navigate('/practice1')}
            >
              Começar Grátis
            </Button>
          </div>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Dot className="h-5 w-5 text-gray-800" />
                <span className="text-gray-700">{feature.free}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plus Column */}
        <div className="space-y-6">
          <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800">PRO</h3>
            <p className="text-purple-600 mt-2">Acesso Completo</p>
            <Button 
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate('/payment')}
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