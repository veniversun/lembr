import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      title: "CEO of Company",
      text: "This is an amazing service! Highly recommend.",
      rating: 5,
      avatar: "https://example.com/avatar1.jpg"
    },
    {
      name: "Jane Smith",
      title: "Marketing Director",
      text: "A game changer for our business.",
      rating: 4,
      avatar: "https://example.com/avatar2.jpg"
    },
    {
      name: "Alice Johnson",
      title: "Product Manager",
      text: "Fantastic experience from start to finish.",
      rating: 5,
      avatar: "https://example.com/avatar3.jpg"
    },
    {
      name: "Bob Brown",
      title: "Developer",
      text: "I love using this product every day!",
      rating: 4,
      avatar: "https://example.com/avatar4.jpg"
    },
    {
      name: "Charlie Davis",
      title: "Designer",
      text: "The best tool I've ever used for my projects.",
      rating: 5,
      avatar: "https://example.com/avatar5.jpg"
    }
  ];

  return (
    <div className="w-full py-12">
      <div className="w-full max-w-4xl mx-auto">
        <Carousel className="w-full relative" opts={{
          align: "start",
        }}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <div className="rounded-lg bg-gray-800/90 p-6 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-700 text-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-white/90 mb-4">{testimonial.text}</p>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${testimonial.avatar})` }}
                      />
                      <div>
                        <p className="font-medium text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-white/70">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/20 text-white hover:bg-white/30" />
          <CarouselNext className="bg-white/20 text-white hover:bg-white/30" />
        </Carousel>
      </div>
    </div>
  );
};
