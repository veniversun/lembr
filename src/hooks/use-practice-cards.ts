import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CardData, DatabaseRow } from "@/types/practice";

export const usePracticeCards = (tableName: "essen" | "psifin" | "habatom" | "generalista") => {
  return useQuery<CardData[]>({
    queryKey: [tableName],
    queryFn: async () => {
      console.log('Fetching data from table:', tableName);
      const { data, error } = await supabase
        .from(tableName)
        .select("q, a, n, id")
        .eq('n', 1)
        .order('id', { ascending: true })
        .limit(10);
      
      if (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
      
      console.log('Fetched data:', data);
      return (data as DatabaseRow[]).map(row => ({
        question: row.q,
        answer: row.a
      }));
    },
  });
};