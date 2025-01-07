import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Trophy, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BookCarousel } from "@/components/BookCarousel";

interface CompletionModalProps {
  correctCount: number;
  incorrectCount: number;
  bookUrl: string;
}

export const CompletionModal = ({ correctCount, incorrectCount, bookUrl }: CompletionModalProps) => {
  const totalAttempts = correctCount + incorrectCount;
  const successPercentage = totalAttempts > 0 
    ? Math.round((correctCount / totalAttempts) * 100) 
    : 0;

  const handleConquistasClick = () => {
    console.log("Conquistas clicked - auth disabled");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Parabéns!</h2>
            <p className="text-gray-600">
              Você completou mais uma sessão de estudos
            </p>
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

            <div className="text-center space-y-4">
              <p className="text-xl font-semibold">Continue praticando</p>
              <Link to={bookUrl}>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  <BookOpen className="mr-2" /> Continuar Praticando
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <Home className="mr-2" /> Voltar para Início
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold mb-4 text-center">
              Conheça outros livros
            </p>
            <BookCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};