import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import Practice2 from "./pages/Practice2";
import Practice3 from "./pages/Practice3";
import Practice4 from "./pages/Practice4";
import Profile from "./pages/Profile";
import Completion from "./pages/Completion";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice2" element={<Practice2 />} />
        <Route path="/practice3" element={<Practice3 />} />
        <Route path="/practice4" element={<Practice4 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;