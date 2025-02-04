import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CardData, DatabaseRow } from "@/types/practice";

export const usePracticeCards = (tableName: "essen" | "psifin" | "habatom" | "generalista") => {
  return useQuery<CardData[]>({
    queryKey: [tableName],
    queryFn: async () => {
      console.log('Fetching data from table:', tableName);
      
      let query = supabase
        .from(tableName)
        .select("q, a, id");

      // Only add n filter for habatom table
      if (tableName === 'habatom') {
        query = query.eq('n', 1);
      }

      const { data, error } = await query
        .order('id', { ascending: true })
        .limit(10);
      
      if (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
      
      console.log('Fetched data:', data);
      return (data as any[]).map(row => ({
        question: row.q,
        answer: row.a
      }));
    },
  });
};