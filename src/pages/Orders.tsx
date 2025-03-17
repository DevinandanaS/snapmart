
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Orders() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-display font-bold">Your Orders</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-display font-bold mb-3">No Orders Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Link to="/">
            <Button className="mx-auto">
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </main>
      
      <Navbar />
    </div>
  );
}
