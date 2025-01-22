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
    title: "Hábitos Atômicos",
    route: "/practice",
    description: "Desenvolva hábitos positivos e transforme sua vida",
    image: "/lovable-uploads/7f1096dd-a6ef-47b5-92ba-6243ac09360d.png"
  },
  {
    title: "Generalista",
    route: "/vendas",
    description: "Domine os conceitos fundamentais de diversas áreas",
    image: "/lovable-uploads/e687d43b-0677-4795-907f-fed3566ebdcf.png"
  },
  {
    title: "Psicologia Financeira",
    route: "/vendas",
    description: "Aprenda sobre os vieses cognitivos que afetam suas decisões financeiras",
    image: "/lovable-uploads/9f6375ff-2f40-4c84-b108-d2251eb21364.png"
  },
  {
    title: "Essencialismo",
    route: "/vendas",
    description: "Aprenda a focar no que realmente importa",
    image: "/lovable-uploads/1fdec32a-a0f5-4c0c-b655-f206a8d95c1a.png"
  }
];

export const BookCarousel = () => {
  return (
    <Carousel className="w-full max-w-5xl mx-auto relative" opts={{ 
      align: "center",
      loop: true,
      slidesToScroll: 2,
    }}>
      <CarouselContent className="-ml-2 md:-ml-4">
        {books.map((book, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/2 relative">
            <Link to={book.route}>
              <div className="cursor-pointer">
                <div className="relative group transition-all duration-300">
                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full h-auto transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
                    <span className="text-white font-medium">Começar</span>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -left-[15%] top-0 bottom-0 w-[15%] bg-gradient-to-r from-white/80 to-transparent z-10" />
      <div className="absolute -right-[15%] top-0 bottom-0 w-[15%] bg-gradient-to-l from-white/80 to-transparent z-10" />
      <CarouselPrevious className="hidden md:flex absolute -left-12 transform scale-150 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500 z-20" />
      <CarouselNext className="hidden md:flex absolute -right-12 transform scale-150 bg-white/80 hover:bg-white transition-all duration-300 border-2 border-purple-300 hover:border-purple-500 z-20" />
    </Carousel>
  );
};