import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  onCartClick?: () => void;
  cartItemCount?: number;
  onLoginClick?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  onMenuClick?: () => void;
}

export default function Header({
  onCartClick,
  cartItemCount = 0,
  onLoginClick,
  isLoggedIn = false,
  userName,
  onMenuClick
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={onMenuClick}
              className="lg:hidden"
              data-testid="button-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center gap-2" data-testid="link-home">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground font-bold text-sm">
                OWS
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-lg leading-none">OWSCORP</span>
                <span className="text-xs text-muted-foreground">Online Web Solution & Corporation</span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for software, templates, apps..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="text-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2"
                data-testid="button-profile"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{userName || "Profile"}</span>
              </Button>
            ) : (
              <Button 
                onClick={onLoginClick}
                size="sm"
                data-testid="button-login"
              >
                Login
              </Button>
            )}
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-mobile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
