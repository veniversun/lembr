import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthModal } from "@/components/auth/AuthModal";
import { supabase } from "@/integrations/supabase/client";
import { RegistradoModal } from "@/components/auth/RegistradoModal";

interface PracticeHeaderProps {
  title: string;
}

export const PracticeHeader = ({ title }: PracticeHeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegistradoModal, setShowRegistradoModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const updatedTitle = title.replace("Pratique", "Treine");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session) {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) return;

        // Fetch user name from the users table with specific user ID
        const { data: userData, error } = await supabase
          .from('users')
          .select('name')
          .eq('id', storedUserId)
          .maybeSingle();

        if (!error && userData) {
          console.log('User data fetched:', userData);
          setUserName(userData.name);
        } else {
          console.error('Error fetching user name:', error);
        }
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setIsAuthenticated(!!session);
      if (session && event === 'SIGNED_IN') {
        setShowRegistradoModal(true);
        // Fetch user name when auth state changes
        const fetchUserName = async () => {
          const storedUserId = localStorage.getItem("userId");
          if (!storedUserId) return;

          const { data: userData, error } = await supabase
            .from('users')
            .select('name')
            .eq('id', storedUserId)
            .maybeSingle();

          if (!error && userData) {
            console.log('User data fetched after auth change:', userData);
            setUserName(userData.name);
          } else {
            console.error('Error fetching user name after auth change:', error);
          }
        };
        fetchUserName();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleConquistasClick = () => {
    if (isAuthenticated) {
      setShowRegistradoModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">{updatedTitle}</h1>
          {isAuthenticated && userName && (
            <p className="text-gray-600 mt-2">Olá, {userName}!</p>
          )}
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