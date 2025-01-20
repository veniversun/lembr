import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center justify-center gap-1 mt-2">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-400" />
      ))}
    </div>
  );
};

const Testimonial = ({ name, role, quote, rating }: TestimonialProps) => {
  return (
    <div className="bg-gray-800/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-800/95 transition-all duration-300 h-full">
      <p className="text-gray-200 italic mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="text-center">
        <p className="font-semibold text-gray-100">{name}</p>
        <p className="text-gray-300 text-sm">{role}</p>
        <StarRating rating={rating} />
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Guilherme",
      role: "Advogado",
      quote: "Eu tinha a sensação de ler muito e acabar ficando com muito pouco memorizado..Com o Lembr eu posso rever e internalizar os principais pontos dos livros",
      rating: 4.5
    },
    {
      name: "Walter",
      role: "Servidor Público",
      quote: "O aplicativo me ajudou a revisar conceitos do livro que li ano passado. Com isso, não preciso reler e posso praticar imediatamente!",
      rating: 5
    },
    {
      name: "Débora",
      role: "Empreendedora",
      quote: "Gosto bastante das opções de acerto e erro. Posso revisar somente os conceitos que tenho mais dificuldade. É preciso melhorar o design do site.",
      rating: 4
    }
  ];

  return (
    <div className="w-full py-12 bg-gradient-to-r from-purple-900/90 via-purple-800/90 to-purple-900/90">
      <div className="w-full max-w-4xl mx-auto">
        <Carousel className="w-full relative" opts={{
          align: "start",
          loop: true,
        }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-3/5">
                <Testimonial {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex absolute -left-12 transform scale-150 bg-gray-200 hover:bg-white transition-all duration-300 border-2 border-purple-400 hover:border-purple-300" />
          <CarouselNext className="hidden md:flex absolute -right-12 transform scale-150 bg-gray-200 hover:bg-white transition-all duration-300 border-2 border-purple-400 hover:border-purple-300" />
        </Carousel>
      </div>
    </div>
  );
};