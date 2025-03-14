import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { SupermarketCard } from "@/components/SupermarketCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supermarkets } from "@/lib/data";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeHero } from "@/components/HomeHero";
import { HireDeliveryBanner } from "@/components/HireDeliveryBanner";

const categories = [
  "All",
  "Groceries",
  "Dairy",
  "Meat",
  "Bakery",
  "Snacks",
  "Organic",
  "Beverages",
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMarkets, setFilteredMarkets] = useState(supermarkets);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = supermarkets;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(market => 
        market.categories.includes(selectedCategory)
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(market => 
        market.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredMarkets(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <HomeHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="overflow-x-auto pb-3 mb-6 -mx-4 px-4">
          <Tabs 
            defaultValue="All" 
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="bg-transparent h-12 p-1 w-auto inline-flex space-x-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <HireDeliveryBanner />
        
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-xl">Featured Supermarkets</h2>
            <Link to="/search" className="text-primary text-sm font-medium">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-border">
                  <Skeleton className="aspect-[16/9] w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-2/3 mb-3" />
                    <div className="flex gap-2 mb-3">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredMarkets.map((market, index) => (
                <SupermarketCard 
                  key={market.id} 
                  supermarket={market} 
                  index={index}
                />
              ))
            )}
          </div>
        </section>
        
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="font-display font-semibold text-xl">Special Offers</h2>
              <Badge className="ml-2 bg-accent text-accent-foreground">
                <Tag className="h-3 w-3 mr-1" />
                Save big
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              Array(2).fill(0).map((_, i) => (
                <Skeleton key={i} className="w-full aspect-[21/9] rounded-2xl" />
              ))
            ) : (
              <>
                <motion.div 
                  className="relative overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30 rounded-2xl" />
                  <div className="absolute inset-0 flex flex-col justify-center px-6 py-4">
                    <Badge className="self-start mb-2 bg-white text-primary">Limited Time</Badge>
                    <h3 className="text-white font-display font-bold text-xl mb-2">Free Delivery on First Order</h3>
                    <p className="text-white/90 text-sm mb-3">Use code: FIRSTORDER</p>
                    <Button variant="outline" size="sm" className="self-start bg-white text-primary hover:bg-white/90 border-transparent">
                      Order Now
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/80 to-accent/30 rounded-2xl" />
                  <div className="absolute inset-0 flex flex-col justify-center px-6 py-4">
                    <Badge className="self-start mb-2 bg-white text-accent">20% Off</Badge>
                    <h3 className="text-white font-display font-bold text-xl mb-2">Fresh Dairy Products</h3>
                    <p className="text-white/90 text-sm mb-3">Valid until June 30</p>
                    <Button variant="outline" size="sm" className="self-start bg-white text-accent hover:bg-white/90 border-transparent">
                      Shop Now
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Navbar />
    </div>
  );
}
