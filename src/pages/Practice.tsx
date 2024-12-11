import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, X, Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const Practice = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewStack, setReviewStack] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["habatom"],
    queryFn: async () => {
      const { data, error } = await supabase.from("habatom").select("q, a");
      if (error) throw error;
      // Map the data to match the expected format
      return data.map(item => ({
        question: item.q,
        answer: item.a
      }));
    },
  });

  const handleNext = () => {
    setIsFlipped(false);
    if (reviewStack.length > 0) {
      const nextIndex = reviewStack[0];
      setCurrentCardIndex(nextIndex);
      setReviewStack(reviewStack.slice(1));
    } else {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleCorrect = () => {
    console.log("Card marked as correct:", currentCardIndex);
    setCorrectCount(prev => prev + 1);
    handleNext();
  };

  const handleIncorrect = () => {
    console.log("Card marked as incorrect:", currentCardIndex);
    setIncorrectCount(prev => prev + 1);
    setReviewStack([...reviewStack, currentCardIndex]);
    handleNext();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading cards...</p>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No flashcards available.</p>
      </div>
    );
  }

  const progressPercentage = ((currentCardIndex + 1) / cards.length) * 100;
  const isCompleted = currentCardIndex >= cards.length - 1 && reviewStack.length === 0;

  if (isCompleted) {
    return (
      <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8">Parabéns, você terminou sua revisão!</h1>
          <div className="space-y-4">
            <div className="text-lg">
              <p>Acertos: {correctCount}</p>
              <p>Erros: {incorrectCount}</p>
            </div>
            <Link to="/">
              <Button className="mt-4">
                <Home className="mr-2" /> Voltar para página inicial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pratique Hábitos Atômicos</h1>
          <Link to="/">
            <Button variant="outline">
              <Home className="mr-2" /> Início
            </Button>
          </Link>
        </div>
        
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

        <div className="relative perspective-1000">
          <div
            className={`w-full min-h-[300px] cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <Card className="absolute w-full h-full backface-hidden bg-white">
              <div className="flex items-center justify-center h-full p-6 text-xl">
                {cards[currentCardIndex].question}
              </div>
            </Card>
            
            <Card className="absolute w-full h-full backface-hidden rotate-y-180 bg-white">
              <div className="flex items-center justify-center h-full p-6 text-xl">
                {cards[currentCardIndex].answer}
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button onClick={handlePrevious} variant="outline">
            <ChevronLeft className="mr-2" /> Previous
          </Button>
          <Button 
            onClick={handleCorrect} 
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none"
          >
            <Check className="mr-2" /> Acertei
          </Button>
          <Button 
            onClick={handleIncorrect} 
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white border-none"
          >
            <X className="mr-2" /> Errei
          </Button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          Card {currentCardIndex + 1} of {cards.length}
          {reviewStack.length > 0 && (
            <span className="ml-2">({reviewStack.length} cards to review)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;