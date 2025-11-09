import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import type { Product, Category } from "@shared/schema";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ProductShowcase from "@/components/ProductShowcase";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import NewsletterSection from "@/components/NewsletterSection";
import ProductCard from "@/components/ProductCard";
import ShoppingCartDrawer from "@/components/ShoppingCartDrawer";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

import webTemplateImg from "@assets/generated_images/Web_application_template_product_731777cf.png";
import mobileAppImg from "@assets/generated_images/Mobile_app_template_product_89c05747.png";
import aiAgentImg from "@assets/generated_images/AI_automation_product_visual_0b36ebea.png";

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: cartItems = [] } = useQuery<any[]>({
    queryKey: ['/api/cart'],
    enabled: isAuthenticated,
  });

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

  const featuredProducts = products.slice(0, 6);

  const handleAddToCart = async (productId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to cart",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }

    try {
      await apiRequest('/api/cart', 'POST', {
        productId,
        quantity: 1,
      });
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
      });
    } catch (error: any) {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message || "Failed to add to cart",
        variant: "destructive",
      });
    }
  };

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User' : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartItemCount={cartItems.length}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={handleLogin}
        onLogoutClick={handleLogout}
        isLoggedIn={isAuthenticated}
        userName={userName}
      />
      
      <main className="flex-1">
        <HeroCarousel />
        <StatsSection />
        <AboutSection />
        <ProductShowcase 
          products={showcaseProducts}
          onAddToCart={(id) => setLocation('/products')}
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
                  id={product.id}
                  title={product.title}
                  developer="Developer"
                  price={parseFloat(product.price)}
                  rating={parseFloat(product.rating || '0')}
                  reviewCount={product.reviewCount || 0}
                  image={webTemplateImg}
                  category="Category"
                  onAddToCart={handleAddToCart}
                  onClick={(id) => setLocation(`/products/${id}`)}
                />
              ))}
            </div>
          </div>
        </div>

        <TestimonialCarousel />
        <NewsletterSection onSubscribe={(email) => toast({ title: "Thanks for subscribing!" })} />
      </main>

      <Footer />

      <ShoppingCartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems.map((item: any) => ({
          id: item.id,
          title: item.product?.title || 'Product',
          developer: 'Developer',
          price: parseFloat(item.product?.price || '0'),
          quantity: item.quantity,
          image: webTemplateImg,
        }))}
        onUpdateQuantity={async (id, quantity) => {
          try {
            await apiRequest(`/api/cart/${id}`, 'PATCH', { quantity });
            await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
          } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
          }
        }}
        onRemove={async (id) => {
          try {
            await apiRequest(`/api/cart/${id}`, 'DELETE');
            await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
            toast({ title: "Removed from cart" });
          } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
          }
        }}
        onCheckout={() => setLocation('/cart')}
      />
    </div>
  );
}
