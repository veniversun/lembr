import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthModal } from "@/components/auth/AuthModal";
import { RegistradoModal } from "@/components/auth/RegistradoModal";

interface PracticeHeaderProps {
  title: string;
}

export const PracticeHeader = ({ title }: PracticeHeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegistradoModal, setShowRegistradoModal] = useState(false);
  const updatedTitle = title.replace("Pratique", "Treine");

  const handleConquistasClick = () => {
    // Temporarily disabled
    console.log("Conquistas clicked - auth disabled");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">{updatedTitle}</h1>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleConquistasClick}
          >
            <Trophy className="mr-2" /> Conquistas
          </Button>
          <Link to="/">
            <Button variant="outline">
              <Home className="mr-2" /> Início
            </Button>
          </Link>
        </div>
      </div>
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      <RegistradoModal open={showRegistradoModal} onOpenChange={setShowRegistradoModal} />
    </>
  );
};