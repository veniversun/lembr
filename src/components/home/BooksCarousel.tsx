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
      path: '/practice',
      image: '/lovable-uploads/7f1096dd-a6ef-47b5-92ba-6243ac09360d.png',
      alt: 'Hábitos Atômicos'
    },
    {
      path: '/practice3',
      image: '/lovable-uploads/1fdec32a-a0f5-4c0c-b655-f206a8d95c1a.png',
      alt: 'Essencialismo'
    }
  ];

  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-white/50 mb-8 md:mb-12 hover:bg-white/70 transition-all duration-300">
      <p className="text-xl text-gray-700 text-center mb-6 font-medium">
        Escolha um best-seller para treinar agora:
      </p>
      
      <Carousel className="w-full max-w-3xl mx-auto relative" opts={{ 
        align: "center",
        loop: true,
      }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {books.map((book, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3">
              <BookCard 
                imageSrc={book.image}
                alt={book.alt}
                path={book.path}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex absolute -left-12 transform scale-150 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500" />
        <CarouselNext className="hidden md:flex absolute -right-12 transform scale-150 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500" />
      </Carousel>
    </div>
  );
};