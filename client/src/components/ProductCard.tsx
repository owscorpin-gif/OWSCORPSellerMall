import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  developer: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  onAddToCart?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function ProductCard({
  id,
  title,
  developer,
  price,
  rating,
  reviewCount,
  image,
  category,
  onAddToCart,
  onClick
}: ProductCardProps) {
  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
      onClick={() => onClick?.(id)}
      data-testid={`card-product-${id}`}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="backdrop-blur" data-testid={`text-category-${id}`}>
            {category}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="absolute bottom-4 right-4">
            <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-lg shadow-lg">
              ${price}
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1 mb-1" data-testid={`text-title-${id}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2" data-testid={`text-developer-${id}`}>
          by {developer}
        </p>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1" data-testid={`text-rating-${id}`}>
            ({reviewCount})
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gap-2" 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(id);
          }}
          data-testid={`button-add-to-cart-${id}`}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
