import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserRegistrationModal } from "@/components/UserRegistrationModal";
import { Flashcard } from "@/components/Flashcard";
import { CompletionModal } from "@/components/CompletionModal";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ProgressBar } from "@/components/practice/ProgressBar";
import { CardControls } from "@/components/practice/CardControls";

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
  const [processedCards, setProcessedCards] = useState<Set<number>>(new Set());

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
    
    // If we have cards in the review stack and all other cards have been processed
    if (reviewStack.length > 0 && processedCards.size === cards.length) {
      const nextIndex = reviewStack[0];
      setCurrentCardIndex(nextIndex);
      setReviewStack(reviewStack.slice(1));
      return;
    }

    // Find the next unprocessed card
    let nextIndex = currentCardIndex;
    do {
      nextIndex = (nextIndex + 1) % cards.length;
    } while (processedCards.has(nextIndex) && nextIndex !== currentCardIndex);

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
    setProcessedCards(prev => new Set(prev).add(currentCardIndex));
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
    setProcessedCards(prev => new Set(prev).add(currentCardIndex));
    setReviewStack(prev => [...prev, currentCardIndex]);
    await updateProgress(false);
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
        <PracticeHeader title="Pratique Psicologia Financeira" />
        
        <ProgressBar 
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          totalCards={cards.length}
          completedCards={completedCards}
        />

        <Flashcard
          question={cards[currentCardIndex].question}
          answer={cards[currentCardIndex].answer}
          isFlipped={isFlipped}
          onClick={() => setIsFlipped(!isFlipped)}
          isError={isCardError}
        />

        <CardControls 
          onPrevious={handlePrevious}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
          showAnswerButtons={isFlipped}
        />

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