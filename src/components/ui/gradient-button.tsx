import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";

export const GradientButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 transition-opacity",
        className
      )}
      {...props}
    />
  );
};