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
      // First get the user's UUID from the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", parseInt(userId))
        .single();

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      // Then get or create progress record using the user's profile ID
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("book_type", bookType)
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