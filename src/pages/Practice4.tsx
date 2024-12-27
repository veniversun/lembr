import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Flashcard } from "@/components/Flashcard";
import { CompletionModal } from "@/components/CompletionModal";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ProgressBar } from "@/components/practice/ProgressBar";
import { CardControls } from "@/components/practice/CardControls";
import { RegistrationModal } from "@/components/RegistrationModal";
import { AnimatedFlashcardContainer } from "@/components/practice/AnimatedFlashcardContainer";

const GENERALISTA_BOOK_URL = "https://www.amazon.com.br/Por-generalistas-vencem-mundo-especialistas/dp/6580634340";

const Practice4 = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewStack, setReviewStack] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());
  const [cardCooldowns, setCardCooldowns] = useState<{ [key: number]: number }>({});
  const [isCardError, setIsCardError] = useState(false);
  const [processedCards, setProcessedCards] = useState<Set<number>>(new Set());
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["generalista-cards"],
    queryFn: async () => {
      const { data, error } = await supabase.from("generalista").select("q, a");
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
        if (now - timestamp >= 30 * 60 * 1000) {
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
        .eq("book_type", "generalista")
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
    setSlideDirection('left');
    
    if (reviewStack.length > 0 && processedCards.size === cards.length) {
      const nextIndex = reviewStack[0];
      setCurrentCardIndex(nextIndex);
      setReviewStack(reviewStack.slice(1));
    } else {
      let nextIndex = currentCardIndex;
      do {
        nextIndex = (nextIndex + 1) % cards.length;
      } while (processedCards.has(nextIndex) && nextIndex !== currentCardIndex);
      setCurrentCardIndex(nextIndex);
    }
    
    setTimeout(() => setSlideDirection(null), 300);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setIsCardError(false);
    setSlideDirection('right');
    
    let prevIndex = currentCardIndex;
    do {
      prevIndex = (prevIndex - 1 + cards.length) % cards.length;
      if (!cardCooldowns[prevIndex]) break;
    } while (prevIndex !== currentCardIndex);
    
    setCurrentCardIndex(prevIndex);
    setTimeout(() => setSlideDirection(null), 300);
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

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><p>Loading cards...</p></div>;
  if (!cards.length) return <div className="flex items-center justify-center min-h-screen"><p>No flashcards available.</p></div>;
  const isCompleted = completedCards.size === cards.length && reviewStack.length === 0;
  if (isCompleted) return <CompletionModal correctCount={correctCount} incorrectCount={incorrectCount} bookUrl={GENERALISTA_BOOK_URL} />;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <RegistrationModal />
      <div className="max-w-2xl mx-auto">
        <PracticeHeader title="Pratique Por Que Os Generalistas Vencem" />
        
        <ProgressBar 
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          totalCards={cards.length}
          completedCards={completedCards}
        />

        <AnimatedFlashcardContainer slideDirection={slideDirection}>
          <Flashcard
            question={cards[currentCardIndex].question}
            answer={cards[currentCardIndex].answer}
            isFlipped={isFlipped}
            onClick={handleCardClick}
            isError={isCardError}
          />
        </AnimatedFlashcardContainer>

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

export default Practice4;
