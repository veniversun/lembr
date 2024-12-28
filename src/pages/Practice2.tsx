import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Flashcard } from "@/components/Flashcard";
import { CompletionModal } from "@/components/CompletionModal";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ProgressBar } from "@/components/practice/ProgressBar";
import { CardControls } from "@/components/practice/CardControls";
import { AnimatedFlashcardContainer } from "@/components/practice/AnimatedFlashcardContainer";
import { usePracticeShortcuts } from "@/hooks/use-practice-shortcuts";

const PSIFIN_BOOK_URL = "https://www.amazon.com.br/psicologia-financeira-atemporais-gan%C3%A2ncia-felicidade/dp/6555111100";

const Practice2 = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewStack, setReviewStack] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());
  const [cardCooldowns, setCardCooldowns] = useState<{ [key: number]: number }>({});
  const [isCardError, setIsCardError] = useState(false);
  const [processedCards, setProcessedCards] = useState<Set<number>>(new Set());
  const [slideDirection, setSlideDirection] = useState<'up' | 'down' | null>(null);

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
      // First get the user from the users table using the integer ID
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", parseInt(userId))
        .single();

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      // Then get or create progress using the user's ID
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("book_type", "psifin")
        .maybeSingle();

      if (progressError) {
        console.error("Error fetching progress:", progressError);
        return;
      }

      if (progressData) {
        // Update existing progress
        const { error: updateError } = await supabase
          .from("user_progress")
          .update({
            correct_count: isCorrect ? (progressData.correct_count || 0) + 1 : progressData.correct_count,
            incorrect_count: !isCorrect ? (progressData.incorrect_count || 0) + 1 : progressData.incorrect_count,
          })
          .eq("id", progressData.id);

        if (updateError) {
          console.error("Error updating progress:", updateError);
        }
      } else {
        // Create new progress record
        const { error: insertError } = await supabase
          .from("user_progress")
          .insert({
            user_id: userId,
            book_type: "psifin",
            correct_count: isCorrect ? 1 : 0,
            incorrect_count: !isCorrect ? 1 : 0,
          });

        if (insertError) {
          console.error("Error creating progress:", insertError);
        }
      }
    } catch (error) {
      console.error("Error in updateProgress:", error);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setIsCardError(false);
    setSlideDirection('up');
    
    if (reviewStack.length > 0 && processedCards.size === cards.length) {
      const nextIndex = reviewStack[0];
      setCurrentCardIndex(nextIndex);
      setReviewStack(reviewStack.slice(1));
      return;
    }

    let nextIndex = currentCardIndex;
    do {
      nextIndex = (nextIndex + 1) % cards.length;
    } while (processedCards.has(nextIndex) && nextIndex !== currentCardIndex);
    setCurrentCardIndex(nextIndex);
    
    setTimeout(() => setSlideDirection(null), 300);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setIsCardError(false);
    setSlideDirection('down');
    
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

  // Add keyboard shortcuts
  usePracticeShortcuts({
    onCorrect: handleCorrect,
    onIncorrect: handleIncorrect,
    onPrevious: handlePrevious,
    isFlipped,
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><p>Loading cards...</p></div>;
  if (!cards.length) return <div className="flex items-center justify-center min-h-screen"><p>No flashcards available.</p></div>;
  
  const isCompleted = completedCards.size === cards.length && reviewStack.length === 0;
  if (isCompleted) return <CompletionModal correctCount={correctCount} incorrectCount={incorrectCount} bookUrl={PSIFIN_BOOK_URL} />;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <PracticeHeader title="Pratique Psicologia Financeira" />
        
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
            onClick={() => setIsFlipped(!isFlipped)}
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

export default Practice2;