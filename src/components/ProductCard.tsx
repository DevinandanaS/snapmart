
import { useState } from "react";
import { PlusCircle, MinusCircle, Info } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  cartQuantity?: number;
  index: number;
}

export function ProductCard({
  product,
  onAddToCart,
  cartQuantity = 0,
  index,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(cartQuantity);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setQuantity(1);
    onAddToCart(product, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(product, newQuantity);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart(product, newQuantity);
    }
  };

  const {
    name,
    image,
    price,
    originalPrice,
    unit,
    description,
    inStock
  } = product;

  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "relative rounded-xl border border-border overflow-hidden bg-card transition-all duration-300",
        !inStock && "opacity-70"
      )}
    >
      <div className="pt-3 px-3">
        <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
              {discountPercentage}% OFF
            </Badge>
          )}
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <Badge variant="outline" className="text-sm px-3 py-1.5">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <div className="mb-3">
          <h3 className="font-medium leading-tight line-clamp-1">{name}</h3>
          <div className="flex items-baseline mt-1">
            <span className="font-display font-semibold">${price.toFixed(2)}</span>
            <span className="text-muted-foreground text-sm ml-1">
              / {unit}
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground text-xs line-through ml-2">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-border mt-auto">
        {description && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[200px]">
                <p className="text-sm">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {inStock && (
          <>
            {quantity === 0 ? (
              <Button
                className="w-full h-9 text-sm"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? "Added" : "Add to Cart"}
              </Button>
            ) : (
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-primary hover:text-primary"
                  onClick={handleDecrement}
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <span className="font-medium text-lg">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-primary hover:text-primary"
                  onClick={handleIncrement}
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
