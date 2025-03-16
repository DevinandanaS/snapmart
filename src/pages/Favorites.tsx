
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Favorites() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-3">Your Favorites</h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You haven't added any supermarkets or products to your favorites yet.
          </p>
          <Button className="mx-auto" href="/">
            Browse Supermarkets
          </Button>
        </motion.div>
      </main>
      
      <Navbar />
    </div>
  );
}
