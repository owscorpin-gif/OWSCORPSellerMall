import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ProductShowcase from "@/components/ProductShowcase";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import NewsletterSection from "@/components/NewsletterSection";
import ProductCard from "@/components/ProductCard";
import AuthForm from "@/components/AuthForm";
import AdminLogin from "@/components/AdminLogin";
import ShoppingCartDrawer from "@/components/ShoppingCartDrawer";
import AnalyticsCard from "@/components/AnalyticsCard";
import ProductUploadForm from "@/components/ProductUploadForm";
import DataTable from "@/components/DataTable";
import DeveloperProfile from "@/components/DeveloperProfile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

import webTemplateImg from "@assets/generated_images/Web_application_template_product_731777cf.png";
import mobileAppImg from "@assets/generated_images/Mobile_app_template_product_89c05747.png";
import aiAgentImg from "@assets/generated_images/AI_automation_product_visual_0b36ebea.png";
import desktopSoftwareImg from "@assets/generated_images/Desktop_software_product_mockup_bf6d6b00.png";
import websiteTemplateImg from "@assets/generated_images/Website_template_product_visual_1d4c2204.png";

function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  const showcaseProducts = [
    {
      id: "web",
      title: "Web Templates",
      description: "Professional website templates and themes for modern businesses",
      priceRange: "$29 - $199",
      image: webTemplateImg
    },
    {
      id: "mobile",
      title: "Mobile Apps",
      description: "Ready-to-use mobile application templates for iOS and Android",
      priceRange: "$49 - $299",
      image: mobileAppImg
    },
    {
      id: "ai",
      title: "AI Agents",
      description: "Intelligent automation solutions and AI-powered tools",
      priceRange: "$79 - $499",
      image: aiAgentImg
    }
  ];

  const featuredProducts = [
    {
      id: "1",
      title: "Modern Dashboard Template",
      developer: "TechStudio",
      price: 49.99,
      rating: 4.5,
      reviewCount: 234,
      image: webTemplateImg,
      category: "Web Templates"
    },
    {
      id: "2",
      title: "Mobile E-commerce App",
      developer: "AppMasters",
      price: 79.99,
      rating: 5,
      reviewCount: 456,
      image: mobileAppImg,
      category: "Mobile Apps"
    },
    {
      id: "3",
      title: "AI Content Generator",
      developer: "AI Solutions",
      price: 99.99,
      rating: 4.8,
      reviewCount: 189,
      image: aiAgentImg,
      category: "AI Agents"
    },
    {
      id: "4",
      title: "Desktop Project Manager",
      developer: "SoftWorks",
      price: 69.99,
      rating: 4.6,
      reviewCount: 312,
      image: desktopSoftwareImg,
      category: "Desktop Software"
    },
    {
      id: "5",
      title: "Website Builder Kit",
      developer: "WebCraft",
      price: 54.99,
      rating: 4.7,
      reviewCount: 278,
      image: websiteTemplateImg,
      category: "Web Templates"
    },
    {
      id: "6",
      title: "Social Media Dashboard",
      developer: "TechStudio",
      price: 44.99,
      rating: 4.4,
      reviewCount: 167,
      image: webTemplateImg,
      category: "Web Templates"
    }
  ];

  const mockCartItems = [
    {
      id: "1",
      title: "Modern Dashboard Template",
      developer: "TechStudio",
      price: 49.99,
      quantity: 1,
      image: webTemplateImg
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartItemCount={mockCartItems.length}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setAuthOpen(true)}
        isLoggedIn={false}
      />
      
      <main className="flex-1">
        <HeroCarousel />
        <StatsSection />
        <AboutSection />
        <ProductShowcase 
          products={showcaseProducts}
          onAddToCart={(id) => console.log('View category:', id)}
        />

        <div className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-primary text-lg font-semibold mb-2">// Featured Products</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Top-Rated Software & Templates
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our most popular products trusted by thousands of customers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
                  onClick={(id) => console.log('View product:', id)}
                />
              ))}
            </div>
          </div>
        </div>

        <TestimonialCarousel />
        <NewsletterSection onSubscribe={(email) => console.log('Subscribe:', email)} />
      </main>

      <Footer />

      <ShoppingCartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={mockCartItems}
        onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
        onRemove={(id) => console.log('Remove:', id)}
        onCheckout={() => console.log('Checkout')}
      />
    </div>
  );
}

function DeveloperDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userName="John Developer" />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Developer Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage your products and track your sales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnalyticsCard
            title="Total Revenue"
            value="$12,345"
            change="+20.1% from last month"
            icon={DollarSign}
            trend="up"
          />
          <AnalyticsCard
            title="Products Sold"
            value="234"
            change="+12.5% from last month"
            icon={ShoppingBag}
            trend="up"
          />
          <AnalyticsCard
            title="Active Products"
            value="12"
            icon={ShoppingBag}
          />
          <AnalyticsCard
            title="Total Customers"
            value="456"
            change="+8.2% from last month"
            icon={Users}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductUploadForm
            onSubmit={(data) => console.log('Product uploaded:', data)}
          />
          
          <DeveloperProfile
            onSave={(data) => console.log('Profile saved:', data)}
          />
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'User', status: 'active' },
    { id: 2, name: 'Jane Developer', email: 'jane@example.com', type: 'Developer', status: 'active' },
    { id: 3, name: 'Tech Corp', email: 'contact@techcorp.com', type: 'Company', status: 'pending' }
  ];

  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'type', label: 'Type' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={true} userName="Admin" />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-lg">Manage users, products, and platform settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnalyticsCard
            title="Total Revenue"
            value="$45,231"
            change="+18.1% from last month"
            icon={DollarSign}
            trend="up"
          />
          <AnalyticsCard
            title="Total Users"
            value="1,234"
            change="+15.3% from last month"
            icon={Users}
            trend="up"
          />
          <AnalyticsCard
            title="Active Products"
            value="567"
            change="+7.2% from last month"
            icon={ShoppingBag}
            trend="up"
          />
          <AnalyticsCard
            title="Monthly Sales"
            value="892"
            change="+23.1% from last month"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            <DataTable
              columns={userColumns}
              data={mockUsers}
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

function AuthPage() {
  return <AuthForm />;
}

function AdminLoginPage() {
  return <AdminLogin />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/developer" component={DeveloperDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <p className="text-muted-foreground">Page not found</p>
          </div>
        </div>
      </Route>
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
