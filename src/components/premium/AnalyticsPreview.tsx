import { BarChart, LineChart, PieChart, Target } from "lucide-react";

export const AnalyticsPreview = () => {
  return (
    <div className="flex-1">
      <h3 className="text-center text-base font-medium text-gray-700 mb-4">
        Tenha análise detalhada!
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <BarChart className="w-16 h-16 text-purple-500" />
          <span className="text-sm mt-2 font-medium">Progresso por livro</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <PieChart className="w-16 h-16 text-orange-500" />
          <span className="text-sm mt-2 font-medium">Taxa de acertos</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <LineChart className="w-16 h-16 text-green-500" />
          <span className="text-sm mt-2 font-medium">Evolução diária</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Target className="w-16 h-16 text-blue-500" />
          <span className="text-sm mt-2 font-medium">Domínio de temas</span>
        </div>
      </div>
    </div>
  );
};