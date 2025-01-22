import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";
import { Header } from "@/components/home/Header";
import { YouTubeSection } from "@/components/home/YouTubeSection";
import { Footer } from "@/components/home/Footer";
import { ComparisonTable } from "@/components/sales/ComparisonTable";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green for correct, red for incorrect

const Completion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctCount = 0, incorrectCount = 0, bookUrl = "/" } = location.state || {};

  const totalAttempts = Math.max(correctCount + incorrectCount, 1);
  const successPercentage = Math.round((correctCount / totalAttempts) * 100);

  console.log('Completion stats:', {
    correctCount,
    incorrectCount,
    totalAttempts,
    successPercentage
  });

  const pieData = [
    { name: "Acertos", value: correctCount || 0 },
    { name: "Erros", value: incorrectCount || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="relative p-8 rounded-lg overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 shadow-lg">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Parabéns!</h2>
            <p className="text-xl text-white/90">
              Você completou mais um Treino!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-semibold mb-2 text-gray-800">
              Taxa de Acerto: {successPercentage}%
            </p>
            <div className="h-[300px] bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-lg">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <a href={bookUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button 
              className="w-full bg-[#222222] hover:bg-black text-[#f6d964] hover:text-[#f6d964] transition-colors"
            >
              <ShoppingCart className="mr-2" /> Quero o Livro
            </Button>
          </a>
          <Link to="/" className="flex-1">
            <Button 
              className="w-full bg-[#222222] hover:bg-black text-[#f6d964] hover:text-[#f6d964] transition-colors"
            >
              <Home className="mr-2" /> Voltar para Início
            </Button>
          </Link>
        </div>

        <ComparisonTable />

        <YouTubeSection />
      </div>
      <Footer />
    </div>
  );
};

export default Completion;