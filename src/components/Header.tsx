
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, ShoppingCart, User, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { LocationSelector } from "./LocationSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(2);
  
  // Calculate if page is home for different styling
  const isHome = location.pathname === "/";
  
  // Handle scroll change for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock cart count (in a real app, this would come from a global state)
  useEffect(() => {
    setCartItemCount(3);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled || !isHome 
          ? "bg-glass border-b border-border py-3" 
          : "py-5 bg-transparent"
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Back Button */}
        <div className="flex items-center gap-2">
          {!isHome && (
            <Button variant="ghost" size="icon" className="mr-1" onClick={handleBackClick}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="font-display font-bold text-2xl">
            Snap<span className="text-primary">Mart</span>
          </Link>
        </div>
        
        {/* Location Selector */}
        {scrolled && isHome ? null : <LocationSelector />}
        
        {/* Right Side Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-accent text-accent-foreground text-[10px]"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-primary-foreground text-[10px]"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
