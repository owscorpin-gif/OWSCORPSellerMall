import ShoppingCartDrawer from '../ShoppingCartDrawer';
import { useState } from 'react';
import productImage from '@assets/generated_images/Web_application_template_product_731777cf.png';

export default function ShoppingCartDrawerExample() {
  const [open, setOpen] = useState(true);
  
  const mockItems = [
    {
      id: '1',
      title: 'Modern Dashboard Template',
      developer: 'TechStudio',
      price: 49.99,
      quantity: 1,
      image: productImage
    },
    {
      id: '2',
      title: 'E-commerce Starter Kit',
      developer: 'WebMasters',
      price: 79.99,
      quantity: 2,
      image: productImage
    }
  ];

  return (
    <div className="p-8">
      <button onClick={() => setOpen(true)}>Open Cart</button>
      <ShoppingCartDrawer
        open={open}
        onClose={() => setOpen(false)}
        items={mockItems}
        onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
        onRemove={(id) => console.log('Remove:', id)}
        onCheckout={() => console.log('Checkout')}
      />
    </div>
  );
}
