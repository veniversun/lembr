import React from 'react';

interface BookCardProps {
  imageSrc: string;
  alt: string;
  path: string;
}

export const BookCard = ({ imageSrc, alt }: BookCardProps) => {
  return (
    <div className="cursor-pointer">
      <div className="relative group transition-all duration-300">
        <div className="overflow-hidden rounded-xl shadow-lg h-[280px]">
          <img 
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
          <span className="text-white font-medium">Começar</span>
        </div>
      </div>
    </div>
  );
};