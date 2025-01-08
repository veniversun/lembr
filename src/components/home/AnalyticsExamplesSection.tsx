import { BarChart, LineChart, PieChart, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AnalyticsExamplesSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Analytics section clicked - redirecting to cadastro");
    navigate('/cadastro');
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full max-w-4xl bg-white/60 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-lg border border-white/50 mt-8 hover:bg-white/70 transition-all duration-300 cursor-pointer"
    >
      <h3 className="text-center text-xl font-semibold text-gray-800 mb-8">
        Obtenha análise detalhada de desempenhp!
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <BarChart className="w-20 h-20 text-purple-500 mb-4" />
          <span className="text-base font-medium text-gray-700">Progresso por livro</span>
        </div>
        <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <PieChart className="w-20 h-20 text-orange-500 mb-4" />
          <span className="text-base font-medium text-gray-700">Taxa de acertos</span>
        </div>
        <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <LineChart className="w-20 h-20 text-green-500 mb-4" />
          <span className="text-base font-medium text-gray-700">Evolução diária</span>
        </div>
        <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <Target className="w-20 h-20 text-blue-500 mb-4" />
          <span className="text-base font-medium text-gray-700">Domínio de assuntos</span>
        </div>
      </div>
    </div>
  );
};