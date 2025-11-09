import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import type { Product, Review } from "@shared/schema";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, ShoppingCart } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import webTemplateImg from "@assets/generated_images/Web_application_template_product_731777cf.png";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { data: product } = useQuery<Product>({
    queryKey: ['/api/products', id],
    enabled: !!id,
  });

  const { data: reviews = [] } = useQuery<any[]>({
    queryKey: [`/api/products/${id}/reviews`],
    enabled: !!id,
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('/api/cart', 'POST', {
        productId: id,
        quantity: 1,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({ title: "Added to cart" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('/api/reviews', 'POST', {
        productId: id,
        rating,
        comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/products/${id}/reviews`] });
      setComment('');
      setRating(5);
      toast({ title: "Review submitted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        isLoggedIn={isAuthenticated}
        onLoginClick={() => window.location.href = "/api/login"}
        onLogoutClick={() => window.location.href = "/api/logout"}
      />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <img 
                src={product.imageUrl || webTemplateImg} 
                alt={product.title}
                className="w-full rounded-md object-cover"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(parseFloat(product.rating || '0')) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount} reviews
                </span>
              </div>

              <div className="text-3xl font-bold text-primary mb-6">
                ${parseFloat(product.price).toFixed(2)}
              </div>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Features:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full"
                onClick={() => {
                  if (!isAuthenticated) {
                    window.location.href = "/api/login";
                    return;
                  }
                  addToCartMutation.mutate();
                }}
                disabled={addToCartMutation.isPending}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="mr-2" size={20} />
                {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>
          </div>

          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>

            {isAuthenticated && (
              <div className="mb-8 p-6 bg-muted rounded-md">
                <h3 className="font-semibold mb-4">Write a Review</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm">Rating:</span>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className={`cursor-pointer ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
                <Textarea
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-4"
                  data-testid="textarea-review"
                />
                <Button 
                  onClick={() => submitReviewMutation.mutate()}
                  disabled={submitReviewMutation.isPending || !comment.trim()}
                  data-testid="button-submit-review"
                >
                  {submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            )}

            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  id={review.id}
                  userName={review.user ? `${review.user.firstName || ''} ${review.user.lastName || ''}`.trim() || 'User' : 'User'}
                  userAvatar={review.user?.profileImageUrl}
                  rating={review.rating}
                  comment={review.comment}
                  date={new Date(review.createdAt).toLocaleDateString()}
                />
              ))}
              {reviews.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
