import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, type ComponentType } from "react";
import { useToast } from "@/hooks/use-toast";

// Page imports
import { 
  HomePage, 
  ProductsPage, 
  ProductDetailPage, 
  CartPage, 
  DashboardPage, 
  AdminPage, 
  ProfilePage 
} from "@/pages";
import NotFoundPage from "@/pages/not-found";

// Protected Route Component
function ProtectedRoute({ 
  component: Component, 
  requiredRole 
}: { 
  component: ComponentType; 
  requiredRole?: string[];
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    } else if (!isLoading && isAuthenticated && requiredRole) {
      if (!requiredRole.includes(user?.role || '')) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page",
          variant: "destructive",
        });
        setLocation('/');
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, toast, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && !requiredRole.includes(user?.role || '')) {
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:id" component={ProductDetailPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/profile">
        {() => <ProtectedRoute component={ProfilePage} />}
      </Route>
      <Route path="/dashboard">
        {() => <ProtectedRoute component={DashboardPage} requiredRole={['developer', 'company', 'admin']} />}
      </Route>
      <Route path="/admin">
        {() => <ProtectedRoute component={AdminPage} requiredRole={['admin']} />}
      </Route>
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
