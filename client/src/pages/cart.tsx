import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import webTemplateImg from "@assets/generated_images/Web_application_template_product_731777cf.png";

export default function CartPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: cartItems = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/cart'],
    enabled: isAuthenticated,
  });

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const items = cartItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      await apiRequest('/api/orders', 'POST', { items });
    },
    onSuccess: () => {
      toast({ title: "Order placed successfully!" });
      setLocation('/profile');
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      await apiRequest(`/api/cart/${id}`, 'PATCH', { quantity });
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const removeItem = async (id: string) => {
    try {
      await apiRequest(`/api/cart/${id}`, 'DELETE');
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({ title: "Removed from cart" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const total = cartItems.reduce((sum: number, item: any) => 
    sum + (parseFloat(item.product?.price || '0') * item.quantity), 0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        isLoggedIn={isAuthenticated}
        onLoginClick={() => window.location.href = "/api/login"}
      />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => setLocation('/products')} data-testid="button-browse">
                Browse Products
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map((item: any) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex gap-6">
                      <img 
                        src={item.product?.imageUrl || webTemplateImg}
                        alt={item.product?.title || 'Product'}
                        className="w-24 h-24 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {item.product?.title || 'Product'}
                        </h3>
                        <p className="text-2xl font-bold text-primary mb-4">
                          ${parseFloat(item.product?.price || '0').toFixed(2)}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              data-testid={`button-decrease-${item.id}`}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              data-testid={`button-increase-${item.id}`}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            data-testid={`button-remove-${item.id}`}
                          >
                            <Trash2 size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold">Total:</span>
                  <span className="text-3xl font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => checkoutMutation.mutate()}
                  disabled={checkoutMutation.isPending}
                  data-testid="button-checkout"
                >
                  {checkoutMutation.isPending ? 'Processing...' : 'Checkout'}
                </Button>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
