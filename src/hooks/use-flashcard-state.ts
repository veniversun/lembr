import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseFlashcardStateProps {
  bookType: string;
  cards: Array<{ question: string; answer: string }>;
}

export const useFlashcardState = ({ bookType, cards }: UseFlashcardStateProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewStack, setReviewStack] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [processedCards, setProcessedCards] = useState<Set<number>>(new Set());
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());
  const [isCardError, setIsCardError] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down' | null>(null);

  const updateProgress = async (isCorrect: boolean) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.log("No user ID found in localStorage");
      return;
    }

    try {
      console.log('Updating progress for user:', userId, 'book:', bookType);
      
      // First check if a progress record exists
      const { data: existingProgress, error: fetchError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("book_type", bookType)
        .maybeSingle();

      if (fetchError) {
        console.error("Error fetching progress:", fetchError);
        return;
      }

      if (existingProgress) {
        // Update existing progress
        const { error: updateError } = await supabase
          .from("user_progress")
          .update({
            correct_count: isCorrect ? (existingProgress.correct_count || 0) + 1 : existingProgress.correct_count,
            incorrect_count: !isCorrect ? (existingProgress.incorrect_count || 0) + 1 : existingProgress.incorrect_count,
          })
          .eq("id", existingProgress.id);

        if (updateError) {
          console.error("Error updating progress:", updateError);
        }
      } else {
        // Create new progress record
        const { error: insertError } = await supabase
          .from("user_progress")
          .insert({
            user_id: userId,
            book_type: bookType,
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
      setReviewStack(prev => prev.slice(1));
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
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setTimeout(() => setSlideDirection(null), 300);
  };

  const handleCorrect = async () => {
    if (!isFlipped) return;
    
    setCorrectCount(prev => prev + 1);
    setCompletedCards(prev => new Set(prev).add(currentCardIndex));
    setProcessedCards(prev => new Set(prev).add(currentCardIndex));
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

  return {
    currentCardIndex,
    isFlipped,
    setIsFlipped,
    reviewStack,
    correctCount,
    incorrectCount,
    completedCards,
    isCardError,
    slideDirection,
    handleNext,
    handlePrevious,
    handleCorrect,
    handleIncorrect,
    processedCards
  };
};