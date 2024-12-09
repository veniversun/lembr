import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Book } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">FlashFlux QuizMate</h1>
        <p className="text-xl text-gray-600 mb-8">Seu companheiro de estudo inteligente</p>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-lg text-gray-700">Escolha um livro para praticar!</p>
      </div>
      
      <div className="flex flex-col space-y-4">
        <Link to="/practice">
          <Button className="w-full">
            Hábitos Atômicos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;