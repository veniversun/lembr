import React from 'react';
import { LibraryBig, PieChart, AudioWaveform, Target } from "lucide-react";

export const HorizontalAnalytics = () => {
  const features = [
    {
      icon: LibraryBig,
      title: "Mais Livros",
      description: "Acesso a uma biblioteca crescente de best-sellers com novos títulos todo mês",
      color: "text-purple-500"
    },
    {
      icon: PieChart,
      title: "Mais Questões",
      description: "Pratique com um banco extenso de questões cuidadosamente elaboradas",
      color: "text-orange-500"
    },
    {
      icon: AudioWaveform,
      title: "Podcasts exclusivos",
      description: "Aprenda enquanto se exercita ou dirige com nossos podcasts exclusivos",
      color: "text-green-500"
    },
    {
      icon: Target,
      title: "Resumos por Capítulos",
      description: "Acesse resumos detalhados de cada capítulo para uma compreensão mais profunda",
      color: "text-blue-500"
    }
  ];

  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 mt-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Recursos Premium
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className="flex flex-col items-center p-6 bg-white/80 rounded-lg hover:bg-white/90 transition-colors duration-300"
            >
              <Icon className={`w-12 h-12 ${feature.color} mb-4`} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 text-center">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};