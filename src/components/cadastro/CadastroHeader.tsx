import { Header } from "@/components/home/Header";

export const CadastroHeader = () => {
  return (
    <div className="space-y-8">
      <Header />
      
      <div className="text-center space-y-2">
        <div className="relative p-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-90" />
          <div className="relative space-y-2">
            <p className="text-lg md:text-xl text-white">
              Quer ter acesso antecipado a todas as funcionalidades do inSumma?
            </p>
            <p className="text-lg md:text-xl text-white font-semibold">
              Basta se registrar agora!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};