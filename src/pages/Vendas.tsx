import React from 'react';
import { Header } from '@/components/home/Header';
import { ComparisonTable } from '@/components/sales/ComparisonTable';
import { HorizontalAnalytics } from '@/components/sales/HorizontalAnalytics';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Vendas = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-start bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
        {/* Navigation Buttons */}
        <div className="w-full max-w-4xl flex justify-between mb-8">
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
          <Link to="/">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" /> Início
            </Button>
          </Link>
        </div>

        <p className="text-gray-700 text-center leading-relaxed text-4xl md:text-5xl font-bold mt-8">
          Seja um profissional em aplicar <br /> as melhores ideias!
        </p>
              
        <ComparisonTable />
        <HorizontalAnalytics />
      </div>
    </div>
  );
};

export default Vendas;