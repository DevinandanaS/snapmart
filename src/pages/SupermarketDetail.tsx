
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, ArrowLeft, Home, ChevronRight, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { getSupermarketById, getProductsBySupermarketId } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Product } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

export default function SupermarketDetail() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();
  
  const supermarket = id ? getSupermarketById(id) : undefined;
  const products = id ? getProductsBySupermarketId(id) : [];
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [product.id]: quantity
    }));
    
    if (quantity > 0) {
      toast({
        description: `Added ${product.name} to cart`,
      });
    } else {
      toast({
        description: `Removed ${product.name} from cart`,
      });
    }
  };

  if (!supermarket && !isLoading) {
    return (
      <div className="min-h-screen pb-20">
        <Header />
        <main className="container mx-auto px-4 pt-28 pb-20 text-center">
          <div className="py-12">
            <h1 className="text-2xl font-display font-bold mb-3">Supermarket Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The supermarket you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
        <Navbar />
      </div>
    );
  }

  const categories = ["all", ...new Set(products.map(p => p.category.toLowerCase()))];
  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="pb-20">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-48" />
            <div className="container mx-auto px-4 py-4">
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-6" />
              <Skeleton className="h-10 w-full mb-6" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-40 rounded-md" />
                <Skeleton className="h-40 rounded-md" />
                <Skeleton className="h-40 rounded-md" />
                <Skeleton className="h-40 rounded-md" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={supermarket?.image} 
                  alt={supermarket?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Link to="/">
                  <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
                    <Home className="h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/search">
                  <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="absolute top-4 right-4">
                <Link to="/cart">
                  <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
              
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-2xl font-display font-bold">{supermarket?.name}</h1>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{supermarket?.rating}</span>
                  <span className="text-white/70 text-sm ml-1">({supermarket?.ratingCount})</span>
                </div>
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{supermarket?.deliveryTime} min</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{supermarket?.distance} km</span>
                </div>
                
                <div>
                  <Badge className={supermarket?.hasDelivery ? "bg-primary" : "bg-muted text-muted-foreground"}>
                    {supermarket?.hasDelivery ? 'Home Delivery' : 'No Delivery'}
                  </Badge>
                </div>
              </div>
              
              <div className="mb-6 overflow-x-auto -mx-4 px-4">
                <Tabs 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="bg-transparent h-12 p-1 w-auto inline-flex space-x-1">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="rounded-full px-4 py-2 capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
                      >
                        <CategoryIcon category={category} size={16} />
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products
                  .filter(p => activeTab === 'all' || p.category.toLowerCase() === activeTab)
                  .map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      cartQuantity={cart[product.id] || 0}
                      index={index}
                    />
                  ))}
              </div>
              
              {products.filter(p => activeTab === 'all' || p.category.toLowerCase() === activeTab).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found in this category</p>
                </div>
              )}
            </div>
            
            {itemCount > 0 && (
              <div className="fixed bottom-20 left-0 right-0 p-4 z-10">
                <div className="container mx-auto">
                  <Link to="/cart">
                    <Button className="w-full flex justify-between items-center py-6">
                      <span className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        View Cart • {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </span>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">
                          ${Object.entries(cart).reduce((sum, [id, qty]) => {
                            const product = products.find(p => p.id === id);
                            return sum + (product ? product.price * qty : 0);
                          }, 0).toFixed(2)}
                        </span>
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <Navbar />
    </div>
  );
}
