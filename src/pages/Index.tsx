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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <Header />

      <p className="text-gray-700 text-center leading-relaxed text-4xl md:text-5xl font-bold">
        Aprenda o melhor dos Best-Sellers!
      </p>
      
      <br />
      <MessageBox />
      <BooksCarousel />
      <YouTubeSection />
      <CategoriesSection />
      <TestimonialsSection />
      <AnalyticsExamplesSection />
      <Footer />
    </div>
  );
};

export default Index;