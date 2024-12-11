import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-12 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Summo</h1>
        <p className="text-xl text-gray-600 mb-8">Absorva o melhor dos melhores livros</p>
      </div>
      
      <div className="w-full max-w-4xl">
        <p className="text-lg text-gray-700 text-center mb-6">Escolha um livro para praticar agora:</p>
        
        <Carousel className="w-full max-w-3

Let's update the Index page to add the requested buttons in the "Estude por temas" section and link them to their respective practice pages.

<lov-code>
Let's update the Index.tsx file to include the new buttons and their routing:

<lov-write file_path="src/pages/Index.tsx">
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-12 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Summo</h1>
        <p className="text-xl text-gray-600 mb-8">Absorva o melhor dos melhores livros</p>
      </div>
      
      <div className="w-full max-w-4xl">
        <p className="text-lg text-gray-700 text-center mb-6">Escolha um livro para praticar agora:</p>
        
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            <CarouselItem className="basis-1/2">
              <Link to="/practice2" className="block">
                <div className="relative group">
                  <img 
                    src="/lovable-uploads/9f6375ff-2f40-4c84-b108-d2251eb21364.png"
                    alt="Psicologia Financeira"
                    className="w-full h-auto shadow-lg rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
                </div>
              </Link>
            </CarouselItem>
            
            <CarouselItem className="basis-1/2">
              <Link to="/practice" className="block">
                <div className="relative group">
                  <img 
                    src="/lovable-uploads/7f1096dd-a6ef-47b5-92ba-6243ac09360d.png"
                    alt="Hábitos Atômicos"
                    className="w-full h-auto shadow-lg rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
                </div>
              </Link>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center space-y-4">
        <p className="text-lg text-gray-700 mb-4">Estude por temas:</p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <Link to="/practice2" className="w-full">
            <Button className="w-full">
              Psicologia
            </Button>
          </Link>
          <Link to="/practice2" className="w-full">
            <Button className="w-full">
              Finanças
            </Button>
          </Link>
          <Link to="/practice" className="w-full">
            <Button className="w-full">
              Liderança
            </Button>
          </Link>
          <Link to="/practice" className="w-full">
            <Button className="w-full">
              Disciplina
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;