import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Flashcard } from "@/components/Flashcard";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { ProgressBar } from "@/components/practice/ProgressBar";
import { CardControls } from "@/components/practice/CardControls";
import { AnimatedFlashcardContainer } from "@/components/practice/AnimatedFlashcardContainer";
import { useFlashcardState } from "@/hooks/use-flashcard-state";
import { usePracticeShortcuts } from "@/hooks/use-practice-shortcuts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PracticePageProps {
  title: string;
  bookType: string;
  tableName: "essen" | "psifin" | "habatom" | "generalista";
  bookUrl: string;
}

type TableRow = {
  q?: string;
  a?: string;
  Q?: string;
  A?: string;
  id?: number;
  created_at?: string;
}

interface CardData {
  question: string;
  answer: string;
}

const mapRowToCardData = (row: TableRow): CardData => ({
  question: row.q || row.Q || '',
  answer: row.a || row.A || ''
});

export const PracticePage = ({ title, bookType, tableName, bookUrl }: PracticePageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: cards = [], isLoading } = useQuery({
    queryKey: [tableName],
    queryFn: async () => {
      console.log('Fetching data from table:', tableName);
      const { data, error } = await supabase
        .from(tableName)
        .select("*");
      
      if (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
      
      console.log('Fetched data:', data);
      return (data as TableRow[]).map(mapRowToCardData);
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
    onShowAnswer: () => setIsFlipped(true),
    isFlipped,
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><p>Loading cards...</p></div>;
  if (!cards.length) return <div className="flex items-center justify-center min-h-screen"><p>No flashcards available.</p></div>;
  
  const isCompleted = completedCards.size === cards.length && reviewStack.length === 0;
  if (isCompleted) {
    navigate('/completion', { 
      state: { 
        correctCount, 
        incorrectCount,
        bookUrl 
      }
    });
    return null;
  }

  const handleError = async () => {
    try {
      await handleIncorrect();
      toast({
        title: "Resposta registrada",
        description: "Continue praticando para melhorar!",
      });
    } catch (error) {
      console.error("Error handling incorrect answer:", error);
      toast({
        title: "Erro ao registrar resposta",
        description: "Tente novamente",
        variant: "destructive",
      });
    }
  };

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
          onIncorrect={handleError}
          onShowAnswer={() => setIsFlipped(true)}
          showAnswerButtons={isFlipped}
          isFlipped={isFlipped}
        />

        <div className="text-center mt-4 text-sm text-gray-500">
          Card {currentCardIndex + 1} of {cards.length}
          {reviewStack.length > 0 && (
            <span className="ml-2">({reviewStack.length} cards to review)</span>
          )}
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          <span className="text-red-500 font-semibold">Erros: {incorrectCount}</span>
        </div>
      </div>
    </div>
  );
};