import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      comment: 'OWSCORP provided us with exceptional web templates that saved us months of development time. The quality is outstanding!'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Developer',
      comment: 'As a developer, I appreciate the clean code and comprehensive documentation. Best marketplace for professional templates.'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      comment: 'The AI agents we purchased have transformed our workflow. Highly recommend OWSCORP for quality digital products.'
    }
  ];

  const items = testimonials || defaultTestimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const visibleTestimonials = [
    items[currentIndex],
    items[(currentIndex + 1) % items.length],
    items[(currentIndex + 2) % items.length]
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-lg font-semibold mb-2">// Client's Review</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            More Than 10,000+ Customers Trust Us
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <Card 
                key={`${testimonial.id}-${index}`} 
                className={`transition-all duration-300 ${index === 0 ? 'md:scale-105' : 'md:scale-95 opacity-75'}`}
                data-testid={`testimonial-${index}`}
              >
                <CardContent className="p-6">
                  <Quote className="h-10 w-10 text-primary mb-4 opacity-20" />
                  <p className="text-foreground mb-6 leading-relaxed">
                    {testimonial.comment}
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-12 w-12 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2 flex items-center justify-center shadow-lg"
            data-testid="button-prev-testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-12 w-12 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2 flex items-center justify-center shadow-lg"
            data-testid="button-next-testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
