import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

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

  const progressByBook = progressData?.map(item => ({
    name: item.book_type,
    acertos: item.correct_count,
    erros: item.incorrect_count,
  })) || [];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Progress by Book */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Progresso por Livro</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressByBook}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="acertos"
                    stroke="#22c55e"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="erros"
                    stroke="#ef4444"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Detailed Progress */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Detalhes por Livro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressData?.map((progress) => (
              <div
                key={progress.id}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <h3 className="text-xl font-semibold capitalize mb-2">
                  {progress.book_type}
                </h3>
                <div className="space-y-1">
                  <p className="text-green-600">
                    Acertos: {progress.correct_count || 0}
                  </p>
                  <p className="text-red-600">
                    Erros: {progress.incorrect_count || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;