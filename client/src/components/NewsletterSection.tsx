import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface NewsletterSectionProps {
  onSubscribe?: (email: string) => void;
}

export default function NewsletterSection({ onSubscribe }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (onSubscribe && email) {
      onSubscribe(email);
      setEmail("");
    }
  };

  return (
    <div className="bg-primary py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          Subscribe Our Newsletter
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8">
          Get the latest updates on new products and exclusive offers
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-white h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="input-newsletter-email"
          />
          <Button
            size="lg"
            variant="secondary"
            className="sm:w-auto"
            onClick={handleSubscribe}
            data-testid="button-newsletter-submit"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
