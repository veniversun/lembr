import { ReactNode } from "react";

interface AnimatedFlashcardContainerProps {
  children: ReactNode;
  slideDirection: 'left' | 'right' | null;
}

export const AnimatedFlashcardContainer = ({ 
  children, 
  slideDirection 
}: AnimatedFlashcardContainerProps) => {
  return (
    <div 
      className={`transition-all duration-300 ${
        slideDirection === 'left' 
          ? 'animate-slide-left' 
          : slideDirection === 'right' 
            ? 'animate-slide-right' 
            : ''
      }`}
    >
      {children}
    </div>
  );
};