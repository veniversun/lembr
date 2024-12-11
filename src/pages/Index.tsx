import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Summo</h1>
        <p className="text-xl text-gray-600 mb-8">Absorva o melhor dos melhores livros</p>
      </div>
      
      <div className="w-full max-w-4xl grid grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-gray-700">Escolha um livro para praticar agora:</p>
          <Link to="/practice" className="w-full max-w-xs">
            <Button className="w-full">
              Hábitos Atômicos
            </Button>
          </Link>
          <Link to="/practice2" className="w-full max-w-xs">
            <Button className="w-full">
              Psicologia Financeira
            </Button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-gray-700">Estude por temas:</p>
          <Link to="/practice" className="w-full max-w-xs">
            <Button className="w-full">
              Liderança
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;