import ProductShowcase from '../ProductShowcase';
import webImg from '@assets/generated_images/Web_application_template_product_731777cf.png';
import mobileImg from '@assets/generated_images/Mobile_app_template_product_89c05747.png';
import aiImg from '@assets/generated_images/AI_automation_product_visual_0b36ebea.png';

export default function ProductShowcaseExample() {
  const products = [
    {
      id: '1',
      title: 'Web Templates',
      description: 'Professional website templates and themes for modern businesses',
      priceRange: '$29 - $199',
      image: webImg
    },
    {
      id: '2',
      title: 'Mobile Apps',
      description: 'Ready-to-use mobile application templates for iOS and Android',
      priceRange: '$49 - $299',
      image: mobileImg
    },
    {
      id: '3',
      title: 'AI Agents',
      description: 'Intelligent automation solutions and AI-powered tools',
      priceRange: '$79 - $499',
      image: aiImg
    }
  ];

  return (
    <ProductShowcase 
      products={products}
      onAddToCart={(id) => console.log('Add to cart:', id)}
    />
  );
}
