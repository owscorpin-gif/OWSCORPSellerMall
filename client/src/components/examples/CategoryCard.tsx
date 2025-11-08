import CategoryCard from '../CategoryCard';
import { Globe } from 'lucide-react';

export default function CategoryCardExample() {
  return (
    <div className="p-8 max-w-md">
      <CategoryCard
        title="Web Templates"
        description="Professional website templates and themes"
        icon={Globe}
        productCount={245}
        onClick={() => console.log('Category clicked')}
      />
    </div>
  );
}
