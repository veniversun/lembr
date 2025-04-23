
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";

// Pages
import Index from "@/pages/Index";
import Habatom from "@/pages/Habatom";
import Psifin from "@/pages/Psifin";
import Essen from "@/pages/Essen";
import Generalista from "@/pages/Generalista";
import Completion from "@/pages/Completion";
import Cadastro from "@/pages/Cadastro";
import Profile from "@/pages/Profile";
import Vendas from "@/pages/Vendas";
import Payment from "@/pages/Payment";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/habatom" element={<Habatom />} />
        <Route path="/psifin" element={<Psifin />} />
        <Route path="/essen" element={<Essen />} />
        <Route path="/generalista" element={<Generalista />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
