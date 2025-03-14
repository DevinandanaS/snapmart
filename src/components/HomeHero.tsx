
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HomeHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function HomeHero({ searchTerm, setSearchTerm }: HomeHeroProps) {
  return (
    <motion.div 
      className="relative mb-8 pb-8 pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl -z-10" />
      
      <div className="text-center mb-6">
        <motion.h1 
          className="font-display font-bold text-3xl md:text-4xl mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Groceries delivered <span className="text-primary">in minutes</span>
        </motion.h1>
        <motion.p 
          className="text-muted-foreground max-w-lg mx-auto mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Browse local supermarkets and get fresh groceries, meat, dairy and snacks delivered right to your door.
        </motion.p>
        
        <motion.div 
          className="relative max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search supermarkets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 h-12 rounded-full shadow-sm"
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 w-9 text-muted-foreground"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <div className="flex justify-center gap-4 flex-wrap">
        <motion.div 
          className="flex items-center bg-primary/10 rounded-full px-4 py-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span className="text-primary font-medium mr-2">50+</span>
          <span className="text-sm">Supermarkets</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center bg-primary/10 rounded-full px-4 py-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <span className="text-primary font-medium mr-2">15k+</span>
          <span className="text-sm">Products</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center bg-primary/10 rounded-full px-4 py-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <span className="text-primary font-medium mr-2">30min</span>
          <span className="text-sm">Fast Delivery</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
