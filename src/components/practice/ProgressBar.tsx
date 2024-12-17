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
      <Progress value={progressPercentage} className="w-full" />
      <div className="text-center text-sm text-gray-600">
        Progresso: {Math.round(progressPercentage)}%
      </div>
    </div>
  );
};