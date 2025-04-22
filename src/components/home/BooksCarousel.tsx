
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookCard } from './BookCard';
import { useIsMobile } from '@/hooks/use-mobile';

export const BooksCarousel = () => {
  const [showProModal, setShowProModal] = useState(false); // Mantém por compatibilidade, mas não usaremos mais
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const books = [
    {
      path: '/vendas',
      image: '/lovable-uploads/9f6375ff-2f40-4c84-b108-d2251eb21364.png',
      alt: 'Psicologia Financeira',
      isPro: true,
      isAvailable: false
    },
    {
      path: '/practice1',
      image: '/lovable-uploads/7f1096dd-a6ef-47b5-92ba-6243ac09360d.png',
      alt: 'Hábitos Atômicos',
      isPro: false,
      isAvailable: true
    },
    {
      path: '/vendas',
      image: '/lovable-uploads/e687d43b-0677-4795-907f-fed3566ebdcf.png',
      alt: 'Generalista',
      isPro: true,
      isAvailable: false
    },
    {
      path: '/vendas',
      image: '/lovable-uploads/1fdec32a-a0f5-4c0c-b655-f206a8d95c1a.png',
      alt: 'Essencialismo',
      isPro: true,
      isAvailable: false
    }
  ];

  const handleBookClick = (isPro: boolean, path: string) => {
    if (isPro) {
      // Redireciona direto ou talvez mostre disabled visualmente, mas não abre mais modal
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/60 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-white/50 mb-8 md:mb-12 hover:bg-white/70 transition-all duration-300">
      <p className="text-xl text-gray-700 text-center mb-8 font-medium">
        Escolha um best-seller para treinar agora:
      </p>
      
      <div className="relative overflow-hidden px-4 md:px-12">
        <Carousel
          opts={{
            align: "center",
            loop: true,
            slidesToScroll: isMobile ? 1 : 2,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {books.map((book, index) => (
              <CarouselItem 
                key={index} 
                className={`pl-2 md:pl-4 ${isMobile ? 'basis-full' : 'basis-1/3'}`}
              >
                <div 
                  className={`w-full max-w-[280px] mx-auto cursor-pointer ${!book.isAvailable ? 'opacity-50' : ''}`}
                  onClick={() => handleBookClick(book.isPro, book.path)}
                >
                  <BookCard 
                    imageSrc={book.image}
                    alt={book.alt}
                    path={book.path}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
          
          <CarouselPrevious className="absolute -left-2 md:-left-4 transform scale-100 md:scale-125 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500 z-20" />
          <CarouselNext className="absolute -right-2 md:-right-4 transform scale-100 md:scale-125 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500 z-20" />
        </Carousel>
      </div>

      {/* GoProModal removido */}
    </div>
  );
};
