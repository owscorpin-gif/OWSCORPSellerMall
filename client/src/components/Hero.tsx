import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Zap, Shield } from "lucide-react";
import { useState } from "react";
import heroImage from "@assets/generated_images/Hero_section_tech_background_16b0fe3f.png";

interface HeroProps {
  onSearch?: (query: string) => void;
  onBrowseClick?: () => void;
}

export default function Hero({ onSearch, onBrowseClick }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Your Premium Software Marketplace
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Discover AI agents, web templates, mobile apps, and desktop software for all platforms
        </p>

        <div className="w-full max-w-2xl mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for software, templates, apps..."
              className="pl-12 pr-32 h-14 text-lg bg-background/95 backdrop-blur"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              data-testid="input-hero-search"
            />
            <Button 
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSearch}
              data-testid="button-hero-search"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-2 text-white">
            <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="font-semibold">1000+ Products</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-white">
            <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <Shield className="h-6 w-6" />
            </div>
            <p className="font-semibold">Verified Sellers</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-white">
            <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <p className="font-semibold">Instant Download</p>
          </div>
        </div>
      </div>
    </div>
  );
}
