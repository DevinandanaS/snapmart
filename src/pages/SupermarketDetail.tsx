
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getSupermarketById, getProductsBySupermarketId } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function SupermarketDetail() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  const supermarket = id ? getSupermarketById(id) : undefined;
  const products = id ? getProductsBySupermarketId(id) : [];
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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
            <Button as={Link} to="/">
              Return to Home
            </Button>
          </div>
        </main>
        <Navbar />
      </div>
    );
  }

  const categories = ["all", ...new Set(products.map(p => p.category.toLowerCase()))];

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
              
              <div className="absolute top-4 left-4">
                <Button 
                  as={Link} 
                  to="/" 
                  variant="outline" 
                  size="icon" 
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
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
                        className="rounded-full px-4 py-2 capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
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
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-card rounded-lg border border-border overflow-hidden"
                    >
                      <div className="aspect-square bg-muted relative">
                        <img 
                          src={product.image || "/placeholder.svg"} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <span className="text-sm font-medium">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{product.unit}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
              
              {products.filter(p => activeTab === 'all' || p.category.toLowerCase() === activeTab).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found in this category</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      
      <Navbar />
    </div>
  );
}
