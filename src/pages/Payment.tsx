import React from 'react';
import { Header } from '@/components/home/Header';
import { Footer } from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const Payment = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Lembr. Pro - Acesso Vitalício
            </h1>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center text-4xl md:text-5xl font-bold text-green-600">
                <span className="text-2xl mr-2">R$</span>
                47,00
              </div>
              
              <div className="text-center text-gray-600">
                <p className="text-sm">Pagamento único - Sem mensalidades</p>
              </div>

              <div className="space-y-4 text-gray-700">
                <h2 className="text-xl font-semibold">O que você recebe:</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Acesso vitalício a todos os livros
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Atualizações gratuitas
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Suporte prioritário
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Garantia de 7 dias
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <a 
                  href="https://pay.hotmart.com/G97646259Y?bid=1737402944600" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    className="w-full py-6 text-lg bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Comprar Agora
                  </Button>
                </a>
              </div>

              <div className="text-center text-sm text-gray-500 pt-4">
                <p>Pagamento processado de forma segura pela Hotmart</p>
                <p className="mt-2">7 dias de garantia incondicional</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;