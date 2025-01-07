import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Profile = () => {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) return null;
      
      const userId = parseInt(storedUserId, 10); // Convert string to number
      if (isNaN(userId)) return null; // Handle invalid number conversion
      
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
        
      if (error) throw error;
      return data;
    },
  });

  const { data: progressData } = useQuery({
    queryKey: ["userProgress"],
    queryFn: async () => {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) return [];
      
      // Don't convert to number for user_progress table since it expects a string
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", storedUserId);
        
      if (error) throw error;
      return data;
    },
  });

  const chartData = progressData?.map(item => ({
    name: item.book_type,
    acertos: item.correct_count,
    erros: item.incorrect_count,
  })) || [];

  if (!userData) {
    return <div className="p-8">User not found</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-4">Perfil do Usuário</h1>
          <div className="space-y-2">
            <p className="text-lg">Nome: {userData.name}</p>
            <p className="text-lg">Apelido: {userData.nickname}</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Progresso por Livro</h2>
          <div className="space-y-4">
            {progressData?.map((progress) => (
              <div key={progress.id} className="space-y-2">
                <h3 className="text-xl font-semibold capitalize">
                  {progress.book_type}
                </h3>
                <div className="flex gap-4">
                  <p className="text-green-600">
                    Acertos: {progress.correct_count}
                  </p>
                  <p className="text-red-600">
                    Erros: {progress.incorrect_count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Gráfico de Progresso</h2>
          <div className="w-full overflow-x-auto">
            <LineChart
              width={600}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;