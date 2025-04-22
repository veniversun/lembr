import React from 'react';
import { Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const YouTubeSection = () => {
  return (
    <div className="flex-1 bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50 hover:bg-white/70 transition-all duration-300">
      <div className="flex flex-col items-center gap-6 h-full justify-center">
        <Youtube className="w-16 h-16 text-red-600 animate-pulse" />
        <p className="text-lg md:text-xl text-gray-700 text-center">
          Para ir além, ouça nosso podcast com análise em detalhes do livros:
        </p>
        <a 
          href="https://www.youtube.com/@lembr.podCast" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-2 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Podcast LEMBR
          </Button>
        </a>
      </div>
    </div>
  );
};