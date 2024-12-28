import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const books = [
  {
    title: "Psicologia Financeira",
    route: "/practice2",
    description: "Aprenda sobre os vieses cognitivos que afetam suas decisões financeiras",
    image: "/placeholder.svg"
  },
  {
    title: "Generalista",
    route: "/practice3",
    description: "Domine os conceitos fundamentais de diversas áreas",
    image: "/placeholder.svg"
  },
  {
    title: "Hábitos Atômicos",
    route: "/practice4",
    description: "Desenvolva hábitos positivos e transforme sua vida",
    image: "/placeholder.svg"
  }
];

export const BookCarousel = () => {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {books.map((book, index) => (
          <CarouselItem key={index}>
            <Link to={book.route}>
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.description}</p>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};