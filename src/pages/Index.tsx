import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleBookClick = (path: string) => {
    localStorage.removeItem("hasVisited"); // Reset the registration check
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          I N S U M A
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto px-4">
          Absorva o melhor dos mais vendidos!
        </p>
      </div>

      {/* New Message Box */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg mb-8 md:mb-12">
        <p className="text-gray-700 text-center leading-relaxed">
          Não basta ler livros ótimos. É preciso aprender com eles. Somente praticando é possível crescer de verdade!<br /><br />
          O inSumma utiliza IA para absorver os mais potentes conceitos dos melhores livros de desenvolvimento pessoal.<br /><br />
          Aprenda, cresca e multiplique com o inSuma!
        </p>
      </div>
      
      {/* Books Carousel Section */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-lg mb-8 md:mb-12">
        <p className="text-lg text-gray-700 text-center mb-6 font-medium">
          Escolha um livro para praticar agora:
        </p>
        
        <Carousel className="w-full max-w-3xl mx-auto" opts={{ 
          align: "center",
          loop: true,
        }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/3">
              <div onClick={() => handleBookClick('/practice2')} className="cursor-pointer">
                <div className="relative group transition-all duration-300">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src="/lovable-uploads/9f6375ff-2f40-4c84-b108-d2251eb21364.png"
                      alt="Psicologia Financeira"
                      className="w-full h-auto transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
                    <span className="text-white font-medium">Começar</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/3">
              <div onClick={() => handleBookClick('/practice')} className="cursor-pointer">
                <div className="relative group transition-all duration-300">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src="/lovable-uploads/7f1096dd-a6ef-47b5-92ba-6243ac09360d.png"
                      alt="Hábitos Atômicos"
                      className="w-full h-auto transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
                    <span className="text-white font-medium">Começar</span>
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/3">
              <div onClick={() => handleBookClick('/practice3')} className="cursor-pointer">
                <div className="relative group transition-all duration-300">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src="/lovable-uploads/1fdec32a-a0f5-4c0c-b655-f206a8d95c1a.png"
                      alt="Essencialismo"
                      className="w-full h-auto transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
                    <span className="text-white font-medium">Começar</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* Categories Section */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-lg">
        <p className="text-lg text-gray-700 text-center mb-8 font-medium">Estude por temas:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-4 md:px-12">
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-orange-100">
              <Brain className="h-8 w-8 md:h-10 md:w-10 text-orange-500" />
            </div>
            <Link to="/practice2" className="w-full">
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                Psicologia
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-orange-100">
              <Coins className="h-8 w-8 md:h-10 md:w-10 text-orange-500" />
            </div>
            <Link to="/practice2" className="w-full">
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                Finanças
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-orange-100">
              <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-orange-500" />
            </div>
            <Link to="/practice" className="w-full">
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                Liderança
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-orange-100">
              <Atom className="h-8 w-8 md:h-10 md:w-10 text-orange-500" />
            </div>
            <Link to="/practice" className="w-full">
              <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
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