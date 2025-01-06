import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Trophy, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BookCarousel } from "@/components/BookCarousel";
import { useState } from "react";

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

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <Link to="/" className="block mb-8">
          <Button variant="outline" className="w-full sm:w-auto">
            <Home className="mr-2" /> Página Inicial
          </Button>
        </Link>

        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white p-6 rounded-lg mb-8">
          <h1 className="text-3xl font-bold">Parabéns, você terminou seu treino!</h1>
        </div>
        
        <div className="space-y-6">
          <div className="text-lg space-y-2">
            <p>Acertos: {correctCount}</p>
            <p>Erros: {incorrectCount}</p>
            <p className="font-semibold">Taxa de acerto: {successPercentage}%</p>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
                style={{ width: `${successPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-green-600 font-semibold text-lg">
            Você está melhor que 90% dos usuários!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4 p-6 bg-purple-50 rounded-lg">
              <p className="text-xl font-semibold">Veja como está sua evolução geral</p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full"
              >
                <Trophy className="mr-2" /> Conquistas
              </Button>
            </div>

            <div className="space-y-4 p-6 bg-orange-50 rounded-lg">
              <p className="text-lg font-medium text-orange-600">
                Adquira o livro completo na promoção
              </p>
              <a 
                href={bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="bg-orange-500 hover:bg-orange-600 w-full">
                  <BookOpen className="mr-2" />
                  Comprar agora
                </Button>
              </a>
            </div>
          </div>

          <div className="space-y-4 mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold">Vamos treinar outro livro?</h2>
            <BookCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};