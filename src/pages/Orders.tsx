
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { sampleOrder } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";

export default function Orders() {
  // In a real app, this would come from your backend or state management
  const orders = [sampleOrder];
  
  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <h1 className="text-2xl font-display font-bold mb-6">Your Orders</h1>
        
        {orders.length === 0 ? (
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
              You haven't placed any orders yet. Browse our supermarkets to find what you need.
            </p>
            <Button className="mx-auto" href="/">
              Start Shopping
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-lg border border-border p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("-", " ")}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Items:</span> {order.items.length}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Total:</span> ${order.grandTotal.toFixed(2)}
                  </p>
                </div>
                
                <Button size="sm">View Details</Button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      
      <Navbar />
    </div>
  );
}
