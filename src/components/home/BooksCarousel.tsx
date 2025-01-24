import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookCard } from './BookCard';

export const BooksCarousel = () => {
  const books = [
    {
      path: '/vendas',
      image: '/lovable-uploads/e687d43b-0677-4795-907f-fed3566ebdcf.png',
      alt: 'Generalista'
    },
    {
      path: '/practice',
      image: '/lovable-uploads/7f1096dd-a6ef-47b5-92ba-6243ac09360d.png',
      alt: 'Hábitos Atômicos'
    },
    {
      path: '/vendas',
      image: '/lovable-uploads/9f6375ff-2f40-4c84-b108-d2251eb21364.png',
      alt: 'Psicologia Financeira'
    },
    {
      path: '/vendas',
      image: '/lovable-uploads/1fdec32a-a0f5-4c0c-b655-f206a8d95c1a.png',
      alt: 'Essencialismo'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/60 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-white/50 mb-8 md:mb-12 hover:bg-white/70 transition-all duration-300">
      <p className="text-xl text-gray-700 text-center mb-8 font-medium">
        Escolha um best-seller para treinar agora:
      </p>
      
      <div className="relative overflow-hidden px-12">
        <Carousel
          opts={{
            align: "center",
            loop: true,
            slidesToScroll: 1,
            startIndex: 0, // Start with Generalista (index 0)
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {books.map((book, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/3 transition-opacity duration-300">
                <div className={`w-full max-w-[220px] mx-auto transform transition-all duration-300
                  ${index === 0 ? 'scale-110 opacity-100' : 'scale-90 opacity-50'}`}>
                  <BookCard 
                    imageSrc={book.image}
                    alt={book.alt}
                    path={book.path}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Left shadow overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          
          {/* Right shadow overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
          
          <CarouselPrevious className="absolute -left-2 transform scale-125 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500 z-20" />
          <CarouselNext className="absolute -right-2 transform scale-125 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500 z-20" />
        </Carousel>
      </div>
    </div>
  );
};