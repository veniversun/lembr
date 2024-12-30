import React from 'react';
import { BarChart, LineChart, PieChart } from "lucide-react";

export const AnalyticsExamplesSection = () => {
  return (
    <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-white/50 mt-8 hover:bg-white/70 transition-all duration-300">
      <h3 className="text-center text-lg font-medium text-gray-700 mb-6">
        Exemplos de análises disponíveis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <BarChart className="w-16 h-16 text-purple-500 mb-3" />
          <span className="text-sm font-medium text-gray-600">Progresso por livro</span>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <PieChart className="w-16 h-16 text-orange-500 mb-3" />
          <span className="text-sm font-medium text-gray-600">Taxa de acertos</span>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <LineChart className="w-16 h-16 text-green-500 mb-3" />
          <span className="text-sm font-medium text-gray-600">Evolução diária</span>
        </div>
      </div>
    </div>
  );
};