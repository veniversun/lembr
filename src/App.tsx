import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";

// Pages
import Index from "@/pages/Index";
import Practice1 from "@/pages/Practice1";
import Practice2 from "@/pages/Practice2";
import Practice3 from "@/pages/Practice3";
import Practice4 from "@/pages/Practice4";
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
        <Route path="/practice1" element={<Practice1 />} />
        <Route path="/practice2" element={<Practice2 />} />
        <Route path="/practice3" element={<Practice3 />} />
        <Route path="/practice4" element={<Practice4 />} />
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