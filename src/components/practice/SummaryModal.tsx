
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  dbKey: string;
}

export const SummaryModal = ({ isOpen, onClose, dbKey }: SummaryModalProps) => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ["summary", dbKey],
    queryFn: async () => {
      if (!dbKey) return null;
      console.log('Buscando resumo do livro para banco_de_dados:', dbKey);
      const { data, error } = await supabase
        .from('resumos')
        .select('*')
        .eq('banco_de_dados', dbKey)
        .maybeSingle();
      
      if (error) {
        console.error('Erro ao buscar resumo:', error);
        throw error;
      }
      
      console.log('Resumo encontrado:', data);
      return data;
    },
  });

  const formatIdeas = (ideas: string | null) => {
    if (!ideas) return '';
    try {
      const ideasArray = JSON.parse(ideas);
      return ideasArray
        .map((idea: string) => `• ${idea.replace(/"/g, '')}`)
        .join('\n');
    } catch (e) {
      return ideas
        .replace(/[\[\]"]/g, '')
        .replace(/,/g, '\n• ')
        .replace(/^/, '• ');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            {summary?.titulo || "Resumo do Livro"}
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="p-4">Carregando...</div>
        ) : summary ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Resumo do Livro:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{summary.resumo}</p>
            </div>
            {summary.ideias && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Principais Ideias:</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {formatIdeas(summary.ideias)}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 text-gray-500">Nenhum resumo encontrado para este livro.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
