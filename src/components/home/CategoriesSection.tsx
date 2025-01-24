import React, { useState } from 'react';
import { Brain, Coins, GraduationCap, Atom } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { GoProModal } from './GoProModal';

export const CategoriesSection = () => {
  const [showProModal, setShowProModal] = useState(false);

  const categories = [
    { Icon: Atom, title: 'Disciplina', path: '/practice' },
    { Icon: Brain, title: 'Psicologia', path: '/vendas' },
    { Icon: Coins, title: 'Finanças', path: '/vendas' },
    { Icon: GraduationCap, title: 'Liderança', path: '/vendas' }
  ];

  const handleCategoryClick = (title: string, path: string) => {
    if (title === 'Disciplina') {
      window.location.href = path;
    } else {
      setShowProModal(true);
    }
  };

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
            onClick={() => handleCategoryClick(category.title, category.path)}
          />
        ))}
      </div>

      <GoProModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
      />
    </div>
  );
};