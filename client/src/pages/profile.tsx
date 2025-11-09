import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();

  const { data: orders = [] } = useQuery<any[]>({
    queryKey: ['/api/orders'],
    enabled: isAuthenticated,
  });

  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User' : 'User';

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isAuthenticated} userName={userName} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        <div className="grid gap-8">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              {user?.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl}
                  alt={userName}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <User size={40} className="text-muted-foreground" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">{userName}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <Badge className="mt-2">{user?.role}</Badge>
              </div>
            </div>

            {(user?.role === 'developer' || user?.role === 'company') && (
              <Button onClick={() => window.location.href = '/dashboard'} data-testid="button-dashboard">
                Go to Dashboard
              </Button>
            )}

            {user?.role === 'admin' && (
              <Button onClick={() => window.location.href = '/admin'} data-testid="button-admin">
                Go to Admin Panel
              </Button>
            )}
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBag size={24} />
              My Orders
            </h2>

            {orders.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No orders yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${parseFloat(order.totalAmount).toFixed(2)}
                        </p>
                        <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    {order.items && (
                      <div className="text-sm text-muted-foreground">
                        {order.items.length} item(s)
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
