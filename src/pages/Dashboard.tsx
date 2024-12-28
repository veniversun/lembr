import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { BookCard } from "@/components/dashboard/BookCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProfileCard } from "@/components/dashboard/ProfileCard";

const BOOKS = [
  { 
    id: 'essen',
    title: 'Essencialismo',
    url: 'https://www.amazon.com.br/Essencialismo-Greg-McKeown/dp/8543102146',
    image: '/lovable-uploads/1fdec32a-a0f5-4c0c-b655-f206a8d95c1a.png'
  },
  {
    id: 'psifin',
    title: 'Psicologia Financeira',
    url: 'https://www.amazon.com.br/Psicologia-financeira-Morgan-Housel/dp/6555603577',
    image: '/lovable-uploads/9f6375ff-2f40-4c84-b108-d2251eb21364.png'
  },
  {
    id: 'habatom',
    title: 'Hábitos Atômicos',
    url: 'https://www.amazon.com.br/H%C3%A1bitos-At%C3%B4micos-M%C3%A9todo-Comprovado-Livrar/dp/8550807567',
    image: '/lovable-uploads/7f1096dd-a6ef-47b5-92ba-6243ac09360d.png'
  },
  {
    id: 'generalista',
    title: 'Generalista',
    url: 'https://www.amazon.com.br/generalista-David-Epstein/dp/6580634125',
    image: '/lovable-uploads/e687d43b-0677-4795-907f-fed3566ebdcf.png'
  }
];

const Dashboard = () => {
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      return data;
    },
  });

  const { data: progressData } = useQuery({
    queryKey: ["userProgress"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching progress:", error);
        throw error;
      }
      console.log("Progress data:", data); // Debug log
      return data;
    },
  });

  const { data: usageDays } = useQuery({
    queryKey: ["dailyUsage"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("daily_usage")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching usage days:", error);
        throw error;
      }
      console.log("Usage days data:", data); // Debug log
      return data;
    },
  });

  const totalCorrect = progressData?.reduce((sum, item) => sum + (item.correct_count || 0), 0) || 0;
  const totalIncorrect = progressData?.reduce((sum, item) => sum + (item.incorrect_count || 0), 0) || 0;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Home button */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/">
            <Button variant="outline">
              <Home className="mr-2" /> Início
            </Button>
          </Link>
        </div>

        {/* Profile Information */}
        <ProfileCard 
          firstName={profileData?.first_name}
          lastName={profileData?.last_name}
          email={profileData?.email}
          usageDays={usageDays?.length || 0}
        />

        {/* Overall Statistics */}
        <StatsCard 
          totalCorrect={totalCorrect}
          totalIncorrect={totalIncorrect}
        />

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOKS.map((book) => {
            const bookProgress = progressData?.find(p => p.book_type === book.id) || {
              correct_count: 0,
              incorrect_count: 0
            };
            
            return (
              <BookCard 
                key={book.id} 
                book={book}
                progress={bookProgress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;