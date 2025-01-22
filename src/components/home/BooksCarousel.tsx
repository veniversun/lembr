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
      path: '/practice',
      image: '/lovable-uploads/7f1096dd-a6ef-47b5-92ba-6243ac09360d.png',
      alt: 'Hábitos Atômicos'
    },
    {
      path: '/practice4',
      image: '/lovable-uploads/e687d43b-0677-4795-907f-fed3566ebdcf.png',
      alt: 'Generalista'
    },
    {
      path: '/practice2',
      image: '/lovable-uploads/9f6375ff-2f40-4c84-b108-d2251eb21364.png',
      alt: 'Psicologia Financeira'
    },
    {
      path: '/practice3',
      image: '/lovable-uploads/1fdec32a-a0f5-4c0c-b655-f206a8d95c1a.png',
      alt: 'Essencialismo'
    }
  ];

  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-white/50 mb-8 md:mb-12 hover:bg-white/70 transition-all duration-300">
      <p className="text-xl text-gray-700 text-center mb-8 font-medium">
        Escolha um best-seller para treinar agora:
      </p>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "center",
            loop: true,
            slidesToScroll: 2,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {books.map((book, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/2">
                <div className="w-full max-w-[240px] mx-auto">
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
          <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          
          {/* Right shadow overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
          
          <CarouselPrevious className="absolute -left-4 transform scale-125 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500 z-20" />
          <CarouselNext className="absolute -right-4 transform scale-125 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500 z-20" />
        </Carousel>
      </div>
    </div>
  );
};