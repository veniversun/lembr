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
    <div 
      className="relative w-full h-[300px]"
      style={{ perspective: "2000px" }}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
        onClick={onClick}
      >
        <Card 
          className={`absolute w-full h-full border-2 border-orange-500 shadow-lg ${
            isError ? "bg-red-50" : "bg-white"
          }`}
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="flex items-center justify-center h-full p-6 text-xl">
            {question}
          </div>
        </Card>
        
        <Card 
          className={`absolute w-full h-full border-2 border-orange-500 shadow-lg ${
            isError ? "bg-red-50" : "bg-white"
          }`}
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="flex items-center justify-center h-full p-6 text-xl">
            {answer}
          </div>
        </Card>
      </div>
    </div>
  );
};