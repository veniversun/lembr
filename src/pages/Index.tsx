import React from 'react';
import { Header } from '@/components/home/Header';
import { MessageBox } from '@/components/home/MessageBox';
import { BooksCarousel } from '@/components/home/BooksCarousel';
import { YouTubeSection } from '@/components/home/YouTubeSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <Header />
      <MessageBox />
      <BooksCarousel />
      <YouTubeSection />
      <CategoriesSection />
    </div>
  );
};

export default Index;