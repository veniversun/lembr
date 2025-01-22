import React from 'react';
import { Header } from '@/components/home/Header';
import { MessageBox } from '@/components/home/MessageBox';
import { BooksCarousel } from '@/components/home/BooksCarousel';
import { YouTubeSection } from '@/components/home/YouTubeSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { AnalyticsExamplesSection } from '@/components/home/AnalyticsExamplesSection';
import { Footer } from '@/components/home/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-start bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <p className="text-gray-700 text-center leading-relaxed text-4xl md:text-5xl font-bold mt-8 leading-loose">
          Aplique as grandes ideias dos <br /> melhores Best-Sellers!
        </p>
        
        <br />
        <MessageBox />
        <BooksCarousel />
        
        {/* Container for side-by-side sections with max-width constraint */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 justify-center items-stretch mb-8">
          <YouTubeSection />
          <CategoriesSection />
        </div>
        
        <TestimonialsSection />
        <AnalyticsExamplesSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;