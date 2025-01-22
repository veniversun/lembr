import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

// Pages
import Index from "@/pages/Index";
import Practice from "@/pages/Practice";
import Practice2 from "@/pages/Practice2";
import Practice3 from "@/pages/Practice3";
import Practice4 from "@/pages/Practice4";
import Completion from "@/pages/Completion";
import Cadastro from "@/pages/Cadastro";
import Profile from "@/pages/Profile";
import Vendas from "@/pages/Vendas";
import Auth from "@/pages/Auth";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlus, setIsPlus] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user.id) {
        // Fetch user profile to check plus status
        supabase
          .from("profiles")
          .select("is_plus")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setIsPlus(data?.is_plus || false);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/auth" />;
  }

  if (!isPlus) {
    return <Navigate to="/vendas" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <Practice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice2"
          element={
            <ProtectedRoute>
              <Practice2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice3"
          element={
            <ProtectedRoute>
              <Practice3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice4"
          element={
            <ProtectedRoute>
              <Practice4 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completion"
          element={
            <ProtectedRoute>
              <Completion />
            </ProtectedRoute>
          }
        />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;