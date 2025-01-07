import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, ShoppingCart } from "lucide-react";
import { BookCarousel } from "@/components/BookCarousel";

const Completion = () => {
  const location = useLocation();
  const { correctCount = 0, incorrectCount = 0, bookUrl = "/" } = location.state || {};

  const totalAttempts = correctCount + incorrectCount;
  const successPercentage = totalAttempts > 0 
    ? Math.round((correctCount / totalAttempts) * 100) 
    : 0;

  const handleConquistasClick = () => {
    console.log("Conquistas clicked - auth disabled");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="relative p-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-90" />
          <div className="relative text-center space-y-2 text-white">
            <h2 className="text-3xl font-bold">Parabéns!</h2>
            <p className="text-xl">
              Você completou mais uma sessão de estudos
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-semibold mb-2">
              Taxa de Acerto: {successPercentage}%
            </p>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
                style={{ width: `${successPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-green-600 text-2xl font-bold">{correctCount}</p>
              <p className="text-gray-600">Acertos</p>
            </div>
            <div>
              <p className="text-red-600 text-2xl font-bold">{incorrectCount}</p>
              <p className="text-gray-600">Erros</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-xl font-semibold">Veja como está sua evolução geral</p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full"
                onClick={handleConquistasClick}
              >
                <Trophy className="mr-2" /> Conquistas
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-xl font-semibold">Compre o livro com desconto</p>
              <p></p>
              <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  <ShoppingCart className="mr-2" /> Comprar Livro
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="text-right">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <Home className="mr-2" /> Voltar para Início
            </Button>
          </Link>
        </div>

        <div>
          <p className="text-xl font-semibold mb-4 text-left">
            Conheça outros livros
          </p>
          <BookCarousel />
        </div>
      </div>
    </div>
  );
};

export default Completion;