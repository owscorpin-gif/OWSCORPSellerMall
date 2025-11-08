import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage1 from "@assets/generated_images/Hero_section_tech_background_16b0fe3f.png";
import heroImage2 from "@assets/generated_images/Website_template_product_visual_1d4c2204.png";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      image: heroImage1,
      title: "The Best Software Marketplace",
      subtitle: "OWSCORP",
      description: "Discover premium AI agents, web templates, and software solutions"
    },
    {
      image: heroImage2,
      title: "Quality Digital Products",
      subtitle: "OWSCORP",
      description: "Professional templates and applications for every platform"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="max-w-2xl text-white">
              <p className="text-primary text-lg md:text-xl mb-4 font-semibold">
                // {slide.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                {slide.description}
              </p>
              <Button size="lg" className="text-lg px-8" data-testid="button-hero-cta">
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur hover-elevate active-elevate-2 flex items-center justify-center text-white"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur hover-elevate active-elevate-2 flex items-center justify-center text-white"
        data-testid="button-next-slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/50"
            }`}
            data-testid={`indicator-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
