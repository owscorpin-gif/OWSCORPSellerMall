import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X, Minus, Plus } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  developer: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
}

export default function ShoppingCartDrawer({
  open,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout
}: ShoppingCartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6 my-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4" data-testid={`cart-item-${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-1" data-testid={`text-cart-title-${item.id}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{item.developer}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-2 text-sm" data-testid={`text-quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold text-sm" data-testid={`text-price-${item.id}`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onRemove?.(item.id)}
                    data-testid={`button-remove-${item.id}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <SheetFooter className="flex-col gap-4">
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold">Subtotal</span>
            <span className="text-2xl font-bold" data-testid="text-subtotal">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <Button 
            className="w-full" 
            size="lg"
            disabled={items.length === 0}
            onClick={onCheckout}
            data-testid="button-checkout"
          >
            Proceed to Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
