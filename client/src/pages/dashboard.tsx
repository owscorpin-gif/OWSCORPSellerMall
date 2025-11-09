import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import AnalyticsCard from "@/components/AnalyticsCard";
import ProductUploadForm from "@/components/ProductUploadForm";
import DeveloperProfile from "@/components/DeveloperProfile";
import { DollarSign, ShoppingBag, Users, Star } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: analytics } = useQuery<any>({
    queryKey: ['/api/analytics/seller'],
    enabled: isAuthenticated,
  });

  const { data: sellerProfile } = useQuery<any>({
    queryKey: ['/api/seller-profile'],
    enabled: isAuthenticated,
  });

  const uploadProductMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest('/api/products', 'POST', data);
    },
    onSuccess: () => {
      toast({ title: "Product uploaded successfully!" });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics/seller'] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const saveProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      if (sellerProfile) {
        await apiRequest('/api/seller-profile', 'PATCH', data);
      } else {
        await apiRequest('/api/seller-profile', 'POST', data);
      }
    },
    onSuccess: () => {
      toast({ title: "Profile saved successfully!" });
      queryClient.invalidateQueries({ queryKey: ['/api/seller-profile'] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Developer' : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userName={userName} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Developer Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage your products and track your sales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnalyticsCard
            title="Total Revenue"
            value={`$${(analytics?.totalRevenue || 0).toFixed(2)}`}
            icon={DollarSign}
          />
          <AnalyticsCard
            title="Products Sold"
            value={(analytics?.totalSales || 0).toString()}
            icon={ShoppingBag}
          />
          <AnalyticsCard
            title="Active Products"
            value={(analytics?.activeProducts || 0).toString()}
            icon={ShoppingBag}
          />
          <AnalyticsCard
            title="Avg Rating"
            value={(analytics?.avgRating || 0).toFixed(1)}
            icon={Star}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductUploadForm
            onSubmit={(data) => uploadProductMutation.mutate(data)}
          />
          
          <DeveloperProfile
            initialData={sellerProfile}
            onSave={(data) => saveProfileMutation.mutate(data)}
          />
        </div>
      </div>
    </div>
  );
}
