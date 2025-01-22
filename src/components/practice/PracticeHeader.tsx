import { Button } from "@/components/ui/button";
import { Home, BookOpen, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

interface PracticeHeaderProps {
  title: string;
}

export const PracticeHeader = ({ title }: PracticeHeaderProps) => {
  const updatedTitle = title.replace("Pratique", "Treine");

  const handlePodcastClick = () => {
    window.open('https://www.youtube.com/watch?v=4F-NbrqWF3k&t=538s', '_blank');
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">{updatedTitle}</h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/vendas">
            <Button 
              variant="outline" 
              className="bg-[#9b87f5] text-white hover:bg-[#7E69AB]"
            >
              <BookOpen className="mr-2" /> Resumo
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="bg-[#9b87f5] text-white hover:bg-[#7E69AB]"
            onClick={handlePodcastClick}
          >
            <Headphones className="mr-2" /> Podcast
          </Button>
        </div>
        <Link to="/">
          <Button variant="outline">
            <Home className="mr-2" /> Início
          </Button>
        </Link>
      </div>
    </div>
  );
};