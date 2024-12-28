import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

interface BookCardProps {
  book: {
    id: string;
    title: string;
    url: string;
    image: string;
  };
  progress: {
    correct_count: number | null;
    incorrect_count: number | null;
  };
}

export const BookCard = ({ book, progress }: BookCardProps) => {
  const bookPieData = [
    { name: "Acertos", value: progress.correct_count || 0 },
    { name: "Erros", value: progress.incorrect_count || 0 }
  ];

  return (
    <Card className="p-6">
      <div className="text-center mb-4">
        <div className="mb-2 overflow-hidden rounded-xl shadow-lg">
          <img 
            src={book.image} 
            alt={book.title} 
            className="w-full h-auto transform transition-transform duration-300 hover:scale-105"
          />
        </div>
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
};