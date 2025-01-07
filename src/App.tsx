import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import Practice2 from "./pages/Practice2";
import Practice3 from "./pages/Practice3";
import Practice4 from "./pages/Practice4";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("Handling auth callback with hash:", location.hash);
      
      if (!location.hash) {
        console.log("No hash found in URL");
        navigate('/');
        return;
      }

      const hashParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      console.log("Auth callback params:", { accessToken: !!accessToken, type });

      if (accessToken) {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (session && !error) {
            console.log("Successfully authenticated");
            navigate('/');
          } else {
            console.error("Authentication error:", error);
            navigate('/');
          }
        } catch (error) {
          console.error("Error handling auth callback:", error);
          navigate('/');
        }
      } else {
        console.log("No access token found in URL");
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [location, navigate]);

  return null;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/practice2" element={<Practice2 />} />
      <Route path="/practice3" element={<Practice3 />} />
      <Route path="/practice4" element={<Practice4 />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<AuthCallback />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;