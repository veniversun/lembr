import { ReactNode } from "react";

interface AnimatedFlashcardContainerProps {
  children: ReactNode;
  slideDirection: 'up' | 'down' | null;
}

export const AnimatedFlashcardContainer = ({ 
  children, 
  slideDirection 
}: AnimatedFlashcardContainerProps) => {
  return (
    <div 
      className={`transition-all duration-300 ${
        slideDirection === 'up' 
          ? 'animate-slide-up' 
          : slideDirection === 'down' 
            ? 'animate-slide-down' 
            : ''
      }`}
    >
      {children}
    </div>
  );
};