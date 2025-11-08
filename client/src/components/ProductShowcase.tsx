import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  image: string;
}

interface ProductShowcaseProps {
  products?: Product[];
  onAddToCart?: (id: string) => void;
}

export default function ProductShowcase({ products, onAddToCart }: ProductShowcaseProps) {
  return (
    <div className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-lg font-semibold mb-2">// Our Products</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore Our Product Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products?.map((product) => (
            <Card key={product.id} className="overflow-hidden group" data-testid={`product-showcase-${product.id}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold">
                  {product.priceRange}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>
                <Button
                  className="w-full gap-2"
                  onClick={() => onAddToCart?.(product.id)}
                  data-testid={`button-add-${product.id}`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  View Products
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
