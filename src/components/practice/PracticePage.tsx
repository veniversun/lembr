import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Flashcard } from "@/components/Flashcard";
import { CompletionModal } from "@/components/CompletionModal";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ProgressBar } from "@/components/practice/ProgressBar";
import { CardControls } from "@/components/practice/CardControls";
import { AnimatedFlashcardContainer } from "@/components/practice/AnimatedFlashcardContainer";
import { useFlashcardState } from "@/hooks/use-flashcard-state";
import { usePracticeShortcuts } from "@/hooks/use-practice-shortcuts";

interface PracticePageProps {
  title: string;
  bookType: string;
  tableName: string;
  bookUrl: string;
}

export const PracticePage = ({ title, bookType, tableName, bookUrl }: PracticePageProps) => {
  const { data: cards = [], isLoading } = useQuery({
    queryKey: [tableName],
    queryFn: async () => {
      const { data, error } = await supabase.from(tableName).select("q, a");
      if (error) throw error;
      return data.map(item => ({
        question: item.q,
        answer: item.a
      }));
    },
  });

  const {
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
    handleIncorrect
  } = useFlashcardState({ bookType, cards });

  usePracticeShortcuts({
    onCorrect: handleCorrect,
    onIncorrect: handleIncorrect,
    onPrevious: handlePrevious,
    isFlipped,
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><p>Loading cards...</p></div>;
  if (!cards.length) return <div className="flex items-center justify-center min-h-screen"><p>No flashcards available.</p></div>;
  
  const isCompleted = completedCards.size === cards.length && reviewStack.length === 0;
  if (isCompleted) return <CompletionModal correctCount={correctCount} incorrectCount={incorrectCount} bookUrl={bookUrl} />;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <PracticeHeader title={title} />
        
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