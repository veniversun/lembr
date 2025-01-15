import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Trophy, ShoppingCart } from "lucide-react";
import { BookCarousel } from "@/components/BookCarousel";
import { Header } from "@/components/home/Header";
import { YouTubeSection } from "@/components/home/YouTubeSection";
import { Footer } from "@/components/home/Footer";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green for correct, red for incorrect

const Completion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctCount = 0, incorrectCount = 0, bookUrl = "/" } = location.state || {};

  const totalAttempts = correctCount + incorrectCount;
  const successPercentage = totalAttempts > 0 
    ? Math.round((correctCount / totalAttempts) * 100) 
    : 0;

  const pieData = [
    { name: "Acertos", value: correctCount },
    { name: "Erros", value: incorrectCount },
  ];

  const handleConquistasClick = () => {
    console.log("Redirecting to cadastro page");
    navigate('/cadastro');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="relative p-8 rounded-lg overflow-hidden bg-[#222222]">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Parabéns!</h2>
            <p className="text-xl text-gray-300">
              Você completou mais uma sessão de estudos
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-semibold mb-2 text-foreground">
              Taxa de Acerto: {successPercentage}%
            </p>
            <div className="h-[300px] bg-card rounded-lg p-4 border border-border">
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-xl font-semibold text-foreground">Veja como está sua evolução geral</p>
              <Button 
                variant="outline"
                className="w-full bg-[#222222] hover:bg-[#333333] text-white border-none"
                onClick={handleConquistasClick}
              >
                <Trophy className="mr-2" /> Conquistas
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-xl font-semibold text-foreground">Compre o livro com desconto</p>
              <p></p>
              <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  className="w-full bg-[#222222] hover:bg-[#333333] text-white border-none"
                >
                  <ShoppingCart className="mr-2" /> Comprar Livro
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/">
            <Button 
              variant="secondary" 
              className="w-full bg-[#555555] hover:bg-[#666666] text-white border-none"
            >
              <Home className="mr-2" /> Voltar para Início
            </Button>
          </Link>
        </div>

        <div>
          <p className="text-xl font-semibold mb-4 text-center text-foreground">
            Treine outros livros
          </p>
          <BookCarousel />
        </div>

        <YouTubeSection />
      </div>
      <Footer />
    </div>
  );
};

export default Completion;