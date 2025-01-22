import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export const Header = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isPlus, setIsPlus] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user.id) {
        supabase
          .from("profiles")
          .select("is_plus")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setIsPlus(data?.is_plus || false);
          });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="bg-[#222222] text-[#f6d964] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BookBrain
        </Link>
        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" className="text-[#f6d964] hover:text-white">
                  Perfil
                </Button>
              </Link>
              {!isPlus && (
                <Link to="/vendas">
                  <Button variant="ghost" className="text-[#f6d964] hover:text-white">
                    Upgrade para PLUS
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                className="text-[#f6d964] hover:text-white"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" className="text-[#f6d964] hover:text-white">
                Entrar
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};