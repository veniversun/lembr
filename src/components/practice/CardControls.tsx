import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, X } from "lucide-react";

interface CardControlsProps {
  onPrevious: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
  showAnswerButtons: boolean;
}

export const CardControls = ({ onPrevious, onCorrect, onIncorrect, showAnswerButtons }: CardControlsProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button onClick={onPrevious} variant="outline">
        <ChevronLeft className="mr-2" /> Previous
      </Button>
      {showAnswerButtons && (
        <>
          <Button 
            onClick={onCorrect} 
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none"
          >
            <Check className="mr-2" /> Acertei
          </Button>
          <Button 
            onClick={onIncorrect} 
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white border-none"
          >
            <X className="mr-2" /> Errei
          </Button>
        </>
      )}
    </div>
  );
};