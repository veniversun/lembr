import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, X, Home, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { UserRegistrationModal } from "@/components/UserRegistrationModal";
import { Flashcard } from "@/components/Flashcard";
import { CompletionModal } from "@/components/CompletionModal";

const PSIFIN_BOOK_URL = "https://www.amazon.com.br/psicologia-financeira-atemporais-gan%C3%A2ncia-felicidade/dp/6555111100/ref=sr_1_1_sspa?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1OIFQI0FDHM4J&dib=eyJ2IjoiMSJ9.h3cFgA0rVC_-71yJnkkqbOEKXCba3UK7NnAIR90R9oSDz5myhB-cLEHT-V5ahn4zv0W77nwgBS0Tyqut31cOeO30nvE8oUPeEE_q1NGjtL6TmpL1DjuGKQEw-k2tPMVHokdRs6We8E9wZ1finiBBxN2YgrcNazZGrQdOB9t_vnKd9TYb1U5xn9xGOJI-JtxCRE7sJ8_2kG_lct15kS6FWuBSwjN6fVqbCHMaYU8-ltfvCgcnI5ASqQRKBx5megjyGo77mY-eMuL2BNXqc9_-vfCa_jZ5I3LPzoEhGcE5oak.BA0-cLmDrur3cMfz8-q1edjmFa1WAKN35RkmdOk1cHg&dib_tag=se&keywords=psicologia+financeira+livro&qid=1734359569&sprefix=psicologia+financeirlivro%2Caps%2C250&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1";

const CARD_COOLDOWN = 30 * 60 * 1000; // 30 minutes in milliseconds

const Practice2 = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewStack, setReviewStack] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showUserModal, setShowUserModal] = useState(true);
  const [userName, setUserName] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());
  const [cardCooldowns, setCardCooldowns] = useState<{ [key: number]: number }>({});
  const [isCardError, setIsCardError] = useState(false);

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["psifin-cards"],
    queryFn: async () => {
      const { data, error } = await supabase.from("psifin").select("q, a");
      if (error) throw error;
      return data.map(card => ({
        question: card.q,
        answer: card.a
      }));
    },
  });

  useEffect(() => {
    const now = Date.now();
    // Remove expired cooldowns
    setCardCooldowns(prev => {
      const updated = { ...prev };
      Object.entries(updated).forEach(([key, timestamp]) => {
        if (now - timestamp >= CARD_COOLDOWN) {
          delete updated[Number(key)];
        }
      });
      return updated;
    });
  }, [currentCardIndex]);

  const updateProgress = async (isCorrect: boolean) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("book_type", "psifin")
        .single();

      if (data) {
        await supabase
          .from("user_progress")
          .update({
            correct_count: isCorrect ? (data.correct_count || 0) + 1 : data.correct_count,
            incorrect_count: !isCorrect ? (data.incorrect_count || 0) + 1 : data.incorrect_count,
          })
          .eq("id", data.id);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setIsCardError(false);
    
    if (reviewStack.length > 0) {
      const nextIndex = reviewStack[0];
      setCurrentCardIndex(nextIndex);
      setReviewStack(reviewStack.slice(1));
      return;
    }

    let nextIndex = currentCardIndex;
    do {
      nextIndex = (nextIndex + 1) % cards.length;
      // Skip cards in cooldown
      if (!cardCooldowns[nextIndex]) break;
    } while (nextIndex !== currentCardIndex);

    setCurrentCardIndex(nextIndex);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setIsCardError(false);
    let prevIndex = currentCardIndex;
    do {
      prevIndex = (prevIndex - 1 + cards.length) % cards.length;
      if (!cardCooldowns[prevIndex]) break;
    } while (prevIndex !== currentCardIndex);
    
    setCurrentCardIndex(prevIndex);
  };

  const handleCorrect = async () => {
    if (!isFlipped) return;
    
    setCorrectCount(prev => prev + 1);
    setCompletedCards(prev => new Set(prev).add(currentCardIndex));
    setCardCooldowns(prev => ({
      ...prev,
      [currentCardIndex]: Date.now()
    }));
    await updateProgress(true);
    handleNext();
  };

  const handleIncorrect = async () => {
    if (!isFlipped) return;
    
    setIncorrectCount(prev => prev + 1);
    setIsCardError(true);
    setReviewStack([...reviewStack, currentCardIndex]);
    await updateProgress(false);
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

  // Calculate progress based on completed cards (only counted when marked correct)
  const progressPercentage = (completedCards.size / cards.length) * 100;
  const isCompleted = completedCards.size === cards.length && reviewStack.length === 0;

  if (isCompleted) {
    return <CompletionModal 
      correctCount={correctCount} 
      incorrectCount={incorrectCount}
      bookUrl={PSIFIN_BOOK_URL}
    />;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <UserRegistrationModal
        open={showUserModal}
        onOpenChange={setShowUserModal}
        userName={userName}
        userNickname={userNickname}
        setUserName={setUserName}
        setUserNickname={setUserNickname}
      />

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pratique Psicologia Financeira</h1>
          <div className="flex gap-4">
            <Link to="/profile">
              <Button variant="outline" className="bg-orange-500 text-white hover:bg-orange-600">
                <Trophy className="mr-2" /> Conquistas
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                <Home className="mr-2" /> Início
              </Button>
            </Link>
          </div>
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

        <Flashcard
          question={cards[currentCardIndex].question}
          answer={cards[currentCardIndex].answer}
          isFlipped={isFlipped}
          onClick={() => setIsFlipped(!isFlipped)}
          isError={isCardError}
        />

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button onClick={handlePrevious} variant="outline">
            <ChevronLeft className="mr-2" /> Previous
          </Button>
          {isFlipped && (
            <>
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
            </>
          )}
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

export default Practice2;