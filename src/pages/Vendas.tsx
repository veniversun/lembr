import React from 'react';
import { Header } from '@/components/home/Header';
import { ComparisonTable } from '@/components/sales/ComparisonTable';
import { HorizontalAnalytics } from '@/components/sales/HorizontalAnalytics';
import { Footer } from '@/components/home/Footer';

const Vendas = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-start bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <p className="text-gray-700 text-center leading-relaxed text-4xl md:text-5xl font-bold mt-8 leading-[3rem]">
          Seja um profissional em aplicar  <br /> as melhores ideias!
        </p>
              
        <ComparisonTable />
        <HorizontalAnalytics />
      </div>
      <Footer />
    </div>
  );
};

export default Vendas;