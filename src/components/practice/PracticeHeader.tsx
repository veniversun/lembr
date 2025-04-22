
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SummaryModal } from "./SummaryModal";

interface PracticeHeaderProps {
  title: string;
  dbKey: string;
  podcastUrl: string;
}

export const PracticeHeader = ({ title, dbKey, podcastUrl }: PracticeHeaderProps) => {
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const updatedTitle = title.replace("Pratique", "Treine");

  const handlePodcastClick = () => {
    if (podcastUrl) {
      window.open(podcastUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold">{updatedTitle}</h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="bg-[#222222] hover:bg-black text-[#f6d964] hover:text-[#f6d964] shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => setIsSummaryModalOpen(true)}
          >
            <BookOpen className="mr-2" /> Resumo
          </Button>
          <Button 
            variant="outline" 
            className="bg-[#222222] hover:bg-black text-[#f6d964] hover:text-[#f6d964] shadow-md hover:shadow-lg transition-all duration-300"
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
      <SummaryModal 
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        dbKey={dbKey}
      />
    </div>
  );
};
