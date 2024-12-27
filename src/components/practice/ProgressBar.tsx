import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  correctCount: number;
  incorrectCount: number;
  totalCards: number;
  completedCards: Set<number>;
}

export const ProgressBar = ({ correctCount, incorrectCount, totalCards, completedCards }: ProgressBarProps) => {
  const progressPercentage = (completedCards.size / totalCards) * 100;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Acertos: {correctCount}</span>
        <span>Erros: {incorrectCount}</span>
      </div>
      <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-center text-sm text-gray-600">
        Progresso: {Math.round(progressPercentage)}%
      </div>
    </div>
  );
};