import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

interface PracticeHeaderProps {
  title: string;
}

export const PracticeHeader = ({ title }: PracticeHeaderProps) => {
  const updatedTitle = title.replace("Pratique", "Treine");

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{updatedTitle}</h1>
      <Link to="/">
        <Button variant="outline">
          <Home className="mr-2" /> Início
        </Button>
      </Link>
    </div>
  );
};