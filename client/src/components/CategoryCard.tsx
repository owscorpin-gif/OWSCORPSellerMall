import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  productCount: number;
  onClick?: () => void;
}

export default function CategoryCard({
  title,
  description,
  icon: Icon,
  productCount,
  onClick
}: CategoryCardProps) {
  return (
    <Card 
      className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
      data-testid={`card-category-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1" data-testid="text-category-title">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {description}
          </p>
          <p className="text-xs text-muted-foreground" data-testid="text-product-count">
            {productCount} products
          </p>
        </div>
      </div>
    </Card>
  );
}
