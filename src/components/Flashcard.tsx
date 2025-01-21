import { Card } from "@/components/ui/card";

interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onClick: () => void;
  isError?: boolean;
}

export const Flashcard = ({ 
  question, 
  answer, 
  isFlipped, 
  onClick, 
  isError = false 
}: FlashcardProps) => {
  return (
    <div 
      className="relative w-full h-[300px] perspective-1000"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <Card 
          className={`absolute w-full h-full border-2 border-orange-500 shadow-lg backface-hidden ${
            isError ? "bg-red-50" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-center h-full p-6 text-xl font-bold">
            {question}
          </div>
        </Card>
        
        <Card 
          className={`absolute w-full h-full border-2 border-orange-500 shadow-lg backface-hidden rotate-y-180 ${
            isError ? "bg-red-50" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-center h-full p-6 text-xl">
            {answer}
          </div>
        </Card>
      </div>
    </div>
  );
};