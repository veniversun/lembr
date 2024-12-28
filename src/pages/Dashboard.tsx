import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const BOOKS = [
  { 
    id: 'essen',
    title: 'Essencialismo',
    url: 'https://www.amazon.com.br/Essencialismo-Greg-McKeown/dp/8543102146',
    icon: '🎯'
  },
  {
    id: 'psifin',
    title: 'Psicologia Financeira',
    url: 'https://www.amazon.com.br/Psicologia-financeira-Morgan-Housel/dp/6555603577',
    icon: '💰'
  },
  {
    id: 'habatom',
    title: 'Hábitos Atômicos',
    url: 'https://www.amazon.com.br/H%C3%A1bitos-At%C3%B4micos-M%C3%A9todo-Comprovado-Livrar/dp/8550807567',
    icon: '⚛️'
  },
  {
    id: 'hatm',
    title: 'How to Meet People',
    url: 'https://www.amazon.com.br/How-Meet-People-English-Edition-ebook/dp/B0C3KXVF1F',
    icon: '👥'
  },
  {
    id: 'generalista',
    title: 'Generalista',
    url: 'https://www.amazon.com.br/generalista-David-Epstein/dp/6580634125',
    icon: '🌟'
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

      if (error) throw error;
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

      if (error) throw error;
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

      if (error) throw error;
      return data;
    },
  });

  const totalCorrect = progressData?.reduce((sum, item) => sum + (item.correct_count || 0), 0) || 0;
  const totalIncorrect = progressData?.reduce((sum, item) => sum + (item.incorrect_count || 0), 0) || 0;

  const pieData = [
    { name: "Acertos", value: totalCorrect },
    { name: "Erros", value: totalIncorrect },
  ];

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
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-lg">Nome: {profileData?.first_name} {profileData?.last_name}</p>
            <p className="text-lg">Email: {profileData?.email}</p>
            <p className="text-lg">Dias de uso: {usageDays?.length || 0}</p>
          </div>
        </Card>

        {/* Overall Statistics */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Estatísticas Gerais</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOKS.map((book) => {
            const bookProgress = progressData?.find(p => p.book_type === book.id) || {
              correct_count: 0,
              incorrect_count: 0
            };
            
            const bookPieData = [
              { name: "Acertos", value: bookProgress.correct_count || 0 },
              { name: "Erros", value: bookProgress.incorrect_count || 0 }
            ];

            return (
              <Card key={book.id} className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{book.icon}</div>
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                </div>

                <div className="h-[200px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => 
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bookPieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-center">
                  <a 
                    href={book.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full">
                      <BookOpen className="mr-2" />
                      Comprar Livro
                    </Button>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;