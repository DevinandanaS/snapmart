
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: ShoppingBag, label: "Orders", path: "/orders" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Navbar() {
  const location = useLocation();
  
  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-glass border-t border-border px-2 py-2 sm:py-3"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center"
            >
              <div 
                className={cn(
                  "relative w-12 h-12 rounded-full flex items-center justify-center transition-all",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <item.icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-[10px] mt-0.5",
                isActive ? "font-medium text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
