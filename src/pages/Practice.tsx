import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, X, Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { CompletionModal } from "@/components/CompletionModal";

const HABITOS_ATOMICOS_URL = "https://www.amazon.com.br/H%C3%A1bitos-At%C3%B4micos-M%C3%A9todo-Comprovado-Livrar/dp/8550807567/ref=sr_1_1?crid=1E0PVCLDRDUTN&dib=eyJ2IjoiMSJ9.W7NUz9nWGiI-J7WD8adtYpMSwikMW3vZH13nssD9yUMSXQLNRmBvEOyWIjTLyUdQUTiNdxXg1-eR4fqpzos-xBQm1TMPZQfqNxYNdAljYNwvFNy16X3oIVfNM_abiDugHJrlfipeDZIO4Lrm_dTtGRcYMZ_cTE3K5UeFYr3wZIJDpqE3mwHUFnN_FDxck3TX85wROs9vmYUpjII1FdiTN5ZI_r2SJWsaDsbUqzKMtoBl_zHwo8mHhvt4CY9fHWGqAtCkj4gxYpCVCYPPhkRtLiK4jWhdOjqZypLZh6hJ0H_hu51jtB3AA6jbZSJPC60X04yORkULhZPws6NoiPKMz7C-F01S8HP1Y8pcX1sjXHku1LSiV7DIno6viU8yxC-DaEJtYcPpu-BlMnHCkvIWvZvD8L8chc3cEhsAnfzgtENL74eRZ6ICLfTUvq4PNMfS.4B1pfCNBeaUzKB7C5Hduk2OwFyR4VYPLA2oUW8mdHkY&dib_tag=se&keywords=habitos+atomicos+livro&qid=1734359514&sprefix=habitos+a%2Caps%2C309&sr=8-1";

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
      const nextIndex = (currentCardIndex + 1) % cards.length;
      setCurrentCardIndex(nextIndex);
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
  };

  const isCompleted = currentCardIndex >= cards.length - 1 && reviewStack.length === 0;

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

  if (isCompleted) {
    return <CompletionModal 
      correctCount={correctCount} 
      incorrectCount={incorrectCount}
      bookUrl={HABITOS_ATOMICOS_URL}
    />;
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
          <Progress value={((correctCount) / cards.length) * 100} className="w-full" />
          <div className="text-center text-sm text-gray-600">
            Progresso: {Math.round(((currentCardIndex + 1) / cards.length) * 100)}%
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
