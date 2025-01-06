import { Button } from "@/components/ui/button";
import { ChevronLeft, ArrowRight } from "lucide-react";

interface CardControlsProps {
  onPrevious: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
  onShowAnswer: () => void;
  showAnswerButtons: boolean;
  isFlipped: boolean;
}

export const CardControls = ({ 
  onPrevious, 
  onCorrect, 
  onIncorrect, 
  onShowAnswer,
  showAnswerButtons,
  isFlipped 
}: CardControlsProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button onClick={onPrevious} variant="outline" className="sm:flex hidden">
        <ChevronLeft className="mr-2" /> Voltar
      </Button>
      
      {!isFlipped && (
        <Button 
          onClick={onShowAnswer} 
          variant="outline"
          className="bg-orange-500 hover:bg-orange-600 text-white border-none"
        >
          <span>Resposta</span>
          <ArrowRight className="ml-2" />
        </Button>
      )}

      {showAnswerButtons && (
        <>
          <Button 
            onClick={onCorrect} 
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none"
          >
            Acertei
          </Button>
          <Button 
            onClick={onIncorrect} 
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white border-none"
          >
            Errei
          </Button>
        </>
      )}
    </div>
  );
};