import ProductCard from '../ProductCard';
import productImage from '@assets/generated_images/Web_application_template_product_731777cf.png';

export default function ProductCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ProductCard
        id="1"
        title="Modern Dashboard Template"
        developer="TechStudio"
        price={49.99}
        rating={4.5}
        reviewCount={234}
        image={productImage}
        category="Web Templates"
        onAddToCart={(id) => console.log('Added to cart:', id)}
        onClick={(id) => console.log('Clicked product:', id)}
      />
    </div>
  );
}
