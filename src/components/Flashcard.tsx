import { Card } from "@/components/ui/card";

interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onClick: () => void;
  isError?: boolean;
}

export const Flashcard = ({ question, answer, isFlipped, onClick, isError = false }: FlashcardProps) => {
  return (
    <div className="relative perspective-1000">
      <div
        className={`w-full min-h-[300px] cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={onClick}
      >
        <Card className={`absolute w-full h-full backface-hidden ${isError ? "bg-red-50" : "bg-white"}`}>
          <div className="flex items-center justify-center h-full p-6 text-xl">
            {question}
          </div>
        </Card>
        
        <Card className={`absolute w-full h-full backface-hidden rotate-y-180 ${isError ? "bg-red-50" : "bg-white"}`}>
          <div className="flex items-center justify-center h-full p-6 text-xl">
            {answer}
          </div>
        </Card>
      </div>
    </div>
  );
};