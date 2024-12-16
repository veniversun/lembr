import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, X, Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { CompletionModal } from "@/components/CompletionModal";

const ESSENCIALISMO_URL = "https://www.amazon.com.br/gp/aw/d/8543102146/?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=029c167d676a60ba797f200a14dfb2d3&hsa_cr_id=0&qid=1734359514&sr=1-2-9e67e56a-6f64-441f-a281-df67fc737124&ref_=sbx_be_s_sparkle_lsi4d_asin_1_img&pd_rd_w=VXGnI&content-id=amzn1.sym.0af9561b-236a-4456-ac39-e3caccb7758c%3Aamzn1.sym.0af9561b-236a-4456-ac39-e3caccb7758c&pf_rd_p=0af9561b-236a-4456-ac39-e3caccb7758c&pf_rd_r=RJJ8CM35R1FZ6XK61CH5&pd_rd_wg=YLViT&pd_rd_r=5f6e858d-b7d6-4eb1-9ce7-74c2fa390e67";

const Practice3 = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewStack, setReviewStack] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["essen-cards"],
    queryFn: async () => {
      const { data, error } = await supabase.from("essen").select("*");
      if (error) throw error;
      return data.map(card => ({
        question: card.q,
        answer: card.a
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
    return <CompletionModal 
      correctCount={correctCount} 
      incorrectCount={incorrectCount}
      bookUrl={ESSENCIALISMO_URL}
    />;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pratique Essencialismo</h1>
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

export default Practice3;
