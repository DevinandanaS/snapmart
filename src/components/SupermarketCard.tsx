
import { Link } from "react-router-dom";
import { Star, Clock, Circle, Truck, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Supermarket } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SupermarketCardProps {
  supermarket: Supermarket;
  index: number;
}

export function SupermarketCard({ supermarket, index }: SupermarketCardProps) {
  const {
    id,
    name,
    image,
    rating,
    ratingCount,
    deliveryTime,
    distance,
    hasDelivery,
    deliveryFee,
    categories,
  } = supermarket;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="block overflow-hidden rounded-2xl border border-border bg-card hover:shadow-elevated transition-all duration-300 h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
          <Badge 
            className={cn(
              "absolute top-3 left-3",
              hasDelivery 
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {hasDelivery ? 'Home Delivery' : 'No Delivery'}
          </Badge>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-semibold text-lg leading-tight">{name}</h3>
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground text-xs ml-1">({ratingCount})</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {categories.slice(0, 3).map((category) => (
              <Badge 
                key={category} 
                variant="secondary"
                className="text-xs font-normal"
              >
                {category}
              </Badge>
            ))}
            {categories.length > 3 && (
              <Badge 
                variant="secondary"
                className="text-xs font-normal"
              >
                +{categories.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span>{deliveryTime} min</span>
            </div>
            
            <div className="flex items-center">
              <Circle className="w-3.5 h-3.5 mr-1 fill-current" style={{ fontSize: '4px' }} />
              <span>{distance} km</span>
            </div>
            
            <div className="flex items-center">
              <Truck className={cn(
                "w-3.5 h-3.5 mr-1",
                hasDelivery ? "text-primary" : "text-muted"
              )} />
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link to={`/supermarket/${id}`}>
              <Button size="sm" variant="default">
                Shop Now
              </Button>
            </Link>
            {!hasDelivery && (
              <Link to="/hire-delivery">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center gap-1 text-xs"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Hire Delivery
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
