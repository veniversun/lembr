import React from 'react';
import { Brain, Coins, GraduationCap, Atom } from 'lucide-react';
import { CategoryCard } from './CategoryCard';

export const CategoriesSection = () => {
  const categories = [
    { Icon: Brain, title: 'Psicologia', path: '/practice2' },
    { Icon: Coins, title: 'Finanças', path: '/practice2' },
    { Icon: GraduationCap, title: 'Liderança', path: '/practice4' },
    { Icon: Atom, title: 'Disciplina', path: '/practice' }
  ];

  return (
    <div className="flex-1 bg-white/60 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-white/50 hover:bg-white/70 transition-all duration-300">
      <p className="text-lg text-gray-700 text-center mb-8 font-medium">Estude por temas:</p>
      <div className="grid grid-cols-2 gap-6 px-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            Icon={category.Icon}
            title={category.title}
            path={category.path}
          />
        ))}
      </div>
    </div>
  );
};