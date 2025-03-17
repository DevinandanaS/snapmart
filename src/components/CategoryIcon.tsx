
import {
  Apple,
  Milk,
  Cookie,
  Pizza,
  Beef,
  Fish,
  ChefHat,
  Carrot,
  Wine,
  Sparkles,
  Coffee,
  Banana,
  LucideIcon,
  ShoppingCart
} from "lucide-react";

interface CategoryIconProps {
  category: string;
  size?: number;
  className?: string;
}

export function CategoryIcon({ category, size = 24, className = "" }: CategoryIconProps) {
  // Map of category names to their respective icons
  const iconMap: Record<string, LucideIcon> = {
    all: ShoppingCart,
    fruits: Apple,
    vegetables: Carrot,
    dairy: Milk,
    bakery: Cookie,
    meat: Beef,
    seafood: Fish,
    snacks: Banana,
    beverages: Coffee,
    alcohol: Wine,
    prepared: Pizza,
    frozen: Sparkles,
    organic: Carrot,
    groceries: ShoppingCart
  };

  // Get icon based on category, defaulting to the ShoppingCart icon
  const Icon = iconMap[category.toLowerCase()] || ShoppingCart;

  return <Icon size={size} className={className} />;
}
