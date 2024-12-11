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
import { Brain, Coins, GraduationCap, Atom } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-12 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">S U M M A</h1>
        <p className="text-xl text-gray-600 mb-8">Absorva o melhor dos mais vendidos! </p>
      </div>
      
      <div className="w-full max-w-4xl bg-[#D3E4FD] p-8 rounded-lg">
        <p className="text-lg text-gray-700 text-center mb-6">Escolha um livro para praticar agora:</p>
        
        <Carousel className="w-full max-w-3xl mx-auto" opts={{ slidesToScroll: 1, align: "start" }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 basis-1/3">
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
            
            <CarouselItem className="pl-2 md:pl-4 basis-1/3">
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

            <CarouselItem className="pl-2 md:pl-4 basis-1/3">
              <Link to="/practice3" className="block">
                <div className="relative group">
                  <img 
                    src="/lovable-uploads/1fdec32a-a0f5-4c0c-b655-f206a8d95c1a.png"
                    alt="Essencialismo"
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
        <div className="flex justify-center gap-4 w-full">
          <div className="flex flex-col items-center gap-2">
            <Brain className="h-6 w-6 text-gray-600" />
            <Link to="/practice2">
              <Button className="bg-[#D3E4FD] text-gray-700 hover:bg-[#B3D4FD]">
                Psicologia
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Coins className="h-6 w-6 text-gray-600" />
            <Link to="/practice2">
              <Button className="bg-[#D3E4FD] text-gray-700 hover:bg-[#B3D4FD]">
                Finanças
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <GraduationCap className="h-6 w-6 text-gray-600" />
            <Link to="/practice">
              <Button className="bg-[#D3E4FD] text-gray-700 hover:bg-[#B3D4FD]">
                Liderança
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Atom className="h-6 w-6 text-gray-600" />
            <Link to="/practice">
              <Button className="bg-[#D3E4FD] text-gray-700 hover:bg-[#B3D4FD]">
                Disciplina
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;