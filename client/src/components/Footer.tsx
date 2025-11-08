import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground font-bold text-sm">
                OWS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">OWSCORP</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Online Web Solution & Corporation - Your trusted marketplace for premium software and digital products.
            </p>
            <div className="flex gap-2">
              <button className="h-8 w-8 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center" data-testid="link-facebook">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center" data-testid="link-twitter">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center" data-testid="link-linkedin">
                <Linkedin className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-md bg-muted hover-elevate active-elevate-2 flex items-center justify-center" data-testid="link-github">
                <Github className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-web-templates">Web Templates</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-mobile-apps">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-ai-agents">AI Agents</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-desktop-software">Desktop Software</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-about">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-contact">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-careers">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-blog">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-help">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-seller">Become a Seller</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} OWSCORP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
