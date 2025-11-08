import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, ShoppingCart, Award } from "lucide-react";
import aboutImage1 from "@assets/generated_images/Web_application_template_product_731777cf.png";
import aboutImage2 from "@assets/generated_images/Mobile_app_template_product_89c05747.png";

export default function AboutSection() {
  const features = [
    { icon: Award, title: "Quality Products", description: "Premium software and templates" },
    { icon: ShoppingCart, title: "Easy Purchase", description: "Simple checkout process" },
    { icon: CheckCircle2, title: "Verified Sellers", description: "Trusted developers only" },
    { icon: Truck, title: "Instant Download", description: "Access products immediately" }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={aboutImage1}
              alt="About 1"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src={aboutImage2}
              alt="About 2"
              className="rounded-lg w-full h-64 object-cover mt-12"
            />
          </div>

          <div>
            <p className="text-primary text-lg font-semibold mb-2">// About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We Provide Quality Software From The Best Developers
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              OWSCORP (Online Web Solution & Corporation) is your trusted marketplace for premium digital products. We connect talented developers and companies with customers seeking quality software solutions.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our platform ensures every product meets high standards of quality, security, and usability. Whether you're looking for web templates, mobile apps, AI agents, or desktop software, we have it all.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" data-testid="button-about-cta">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
