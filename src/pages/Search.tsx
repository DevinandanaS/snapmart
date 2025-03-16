
import { useState } from "react";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { SupermarketCard } from "@/components/SupermarketCard";
import { supermarkets } from "@/lib/data";
import { motion } from "framer-motion";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMarkets, setFilteredMarkets] = useState(supermarkets);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredMarkets(supermarkets);
    } else {
      const filtered = supermarkets.filter(
        market => market.name.toLowerCase().includes(term.toLowerCase()) ||
        market.categories.some(cat => cat.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredMarkets(filtered);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="mb-6">
          <div className="relative mb-8">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search supermarkets, products, or categories..."
              className="pl-10 py-6 text-base"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {filteredMarkets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-muted-foreground">No results found for "{searchTerm}"</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMarkets.map((market, index) => (
                <SupermarketCard 
                  key={market.id}
                  supermarket={market}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Navbar />
    </div>
  );
}
