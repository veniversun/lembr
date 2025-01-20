import React from 'react';
import { Star, StarHalf } from 'lucide-react';

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
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
};

const Testimonial = ({ name, role, quote, rating }: TestimonialProps) => {
  return (
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white/70 transition-all duration-300">
      <p className="text-gray-700 italic mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="text-center">
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-gray-600 text-sm">{role}</p>
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
      quote: "Eu tinha a sensação de ler muito e acabar não ficando com muito pouco memorizado..Com o Lembr eu posso rever e internalizar os principais pontos dos livros",
      rating: 4.5
    },
    {
      name: "Walter",
      role: "Servidor Público",
      quote: "O aplicativo me ajudou a revisar conceitos do livro que li ano passado. Com isso, não preciso reler e posso praticar imediatamente!",
      rating: 5
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};