import { Button } from "@/components/ui/button";

interface ComparisonTableProps {
  onStartFree?: () => void;
}

export const ComparisonTable = ({ onStartFree }: ComparisonTableProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold mb-4">Grátis</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Acesso a 1 livro
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Flashcards ilimitados
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Estatísticas básicas
            </li>
          </ul>
          <Button 
            onClick={onStartFree}
            className="w-full bg-[#222222] hover:bg-black text-[#f6d964] hover:text-[#f6d964]"
          >
            Começar Grátis
          </Button>
        </div>

        {/* PRO Plan */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-purple-100 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
            Recomendado
          </div>
          <h3 className="text-2xl font-bold mb-4">PRO</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Acesso a todos os livros
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Flashcards ilimitados
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Estatísticas avançadas
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Suporte prioritário
            </li>
          </ul>
          <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
            Em breve
          </Button>
        </div>
      </div>
    </div>
  );
};