import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import AnalyticsCard from "@/components/AnalyticsCard";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();

  const { data: analytics } = useQuery<any>({
    queryKey: ['/api/analytics/admin'],
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ['/api/users'],
  });

  const userColumns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value: string) => (
        <Badge variant="default">
          {value}
        </Badge>
      )
    }
  ];

  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Admin' : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userName={userName} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-lg">Manage users, products, and platform settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnalyticsCard
            title="Total Users"
            value={(analytics?.totalUsers || 0).toString()}
            icon={Users}
          />
          <AnalyticsCard
            title="Total Products"
            value={(analytics?.totalProducts || 0).toString()}
            icon={ShoppingBag}
          />
          <AnalyticsCard
            title="Categories"
            value={(analytics?.totalCategories || 0).toString()}
            icon={TrendingUp}
          />
          <AnalyticsCard
            title="Developers"
            value={(analytics?.usersByRole?.developers || 0).toString()}
            icon={Users}
          />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            <DataTable
              columns={userColumns}
              data={users}
              onView={(row) => console.log('View user:', row)}
              onEdit={(row) => console.log('Edit user:', row)}
              onDelete={(row) => console.log('Delete user:', row)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
