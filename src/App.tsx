import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import Practice2 from "./pages/Practice2";
import Practice3 from "./pages/Practice3";
import Practice4 from "./pages/Practice4";
import Profile from "./pages/Profile";
import Completion from "./pages/Completion";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/practice2" element={<Practice2 />} />
      <Route path="/practice3" element={<Practice3 />} />
      <Route path="/practice4" element={<Practice4 />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/completion" element={<Completion />} />
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