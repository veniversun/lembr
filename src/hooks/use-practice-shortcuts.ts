import { useEffect } from "react";

interface PracticeShortcutsProps {
  onCorrect: () => void;
  onIncorrect: () => void;
  onPrevious: () => void;
  onShowAnswer: () => void;
  isFlipped: boolean;
}

export const usePracticeShortcuts = ({
  onCorrect,
  onIncorrect,
  onPrevious,
  onShowAnswer,
  isFlipped,
}: PracticeShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && isFlipped) {
        event.preventDefault();
        onCorrect();
      } else if (event.code === "KeyE" && isFlipped) {
        event.preventDefault();
        onIncorrect();
      } else if (event.code === "Backspace") {
        event.preventDefault();
        onIncorrect();
      } else if (event.code === "Enter" && !isFlipped) {
        event.preventDefault();
        onShowAnswer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCorrect, onIncorrect, onPrevious, onShowAnswer, isFlipped]);
};