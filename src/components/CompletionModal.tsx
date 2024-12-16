import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
      <div className="max-w-2xl mx-auto text-center space-y-6 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Parabéns, você terminou sua revisão!</h1>
        
        <div className="space-y-6">
          <div className="text-lg space-y-2">
            <p>Acertos: {correctCount}</p>
            <p>Erros: {incorrectCount}</p>
            <p className="font-semibold">Taxa de acerto: {successPercentage}%</p>
          </div>

          <div className="w-full max-w-md mx-auto">
            <Progress value={successPercentage} className="h-4" />
          </div>

          <p className="text-green-600 font-semibold text-lg">
            Você está melhor que 90% dos usuários!
          </p>

          <div className="space-y-4 mt-8 border-t pt-6">
            <p className="text-lg font-medium text-orange-600">
              Adquira o livro completo na promoção
            </p>
            <a 
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-orange-500 hover:bg-orange-600">
                Comprar agora
              </Button>
            </a>
          </div>

          <Link to="/">
            <Button variant="outline" className="mt-4">
              <Home className="mr-2" /> Voltar para página inicial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};