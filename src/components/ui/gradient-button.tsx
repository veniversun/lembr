import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";

export const GradientButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:opacity-90 transition-opacity",
        className
      )}
      {...props}
    />
  );
};