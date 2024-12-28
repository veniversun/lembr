import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

interface StatsCardProps {
  totalCorrect: number;
  totalIncorrect: number;
}

export const StatsCard = ({ totalCorrect, totalIncorrect }: StatsCardProps) => {
  const pieData = [
    { name: "Acertos", value: totalCorrect },
    { name: "Erros", value: totalIncorrect },
  ];

  return (
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
  );
};