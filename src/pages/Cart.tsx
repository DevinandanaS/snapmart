
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, MinusCircle, PlusCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem, Product } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simulated cart data
  useEffect(() => {
    const mockCartItems: CartItem[] = [
      {
        id: "1",
        product: {
          id: "p1",
          name: "Organic Bananas",
          image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1287&auto=format&fit=crop",
          price: 2.99,
          unit: "bunch",
          category: "Fruits",
          supermarketId: "s1",
          inStock: true
        },
        quantity: 2
      },
      {
        id: "2",
        product: {
          id: "p2",
          name: "Fresh Milk",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1160&auto=format&fit=crop",
          price: 3.49,
          unit: "gallon",
          category: "Dairy",
          supermarketId: "s1",
          inStock: true
        },
        quantity: 1
      },
      {
        id: "3",
        product: {
          id: "p3",
          name: "Whole Grain Bread",
          image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop",
          price: 4.29,
          originalPrice: 5.29,
          unit: "loaf",
          category: "Bakery",
          supermarketId: "s1",
          inStock: true
        },
        quantity: 1
      }
    ];

    setTimeout(() => {
      setCartItems(mockCartItems);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleUpdateQuantity = (id: string, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 
            ? { ...item, quantity: newQuantity } 
            : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
    
    toast({
      description: change > 0 ? "Item quantity increased" : "Item quantity decreased",
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      description: "Item removed from cart",
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const deliveryFee = 3.99;
  const tax = calculateSubtotal() * 0.08; // 8% tax
  const total = calculateSubtotal() + deliveryFee + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20">
        <Header />
        <main className="container mx-auto px-4 pt-28 pb-20">
          <h1 className="text-2xl font-display font-bold mb-6">Your Cart</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-muted rounded-lg"></div>
            <div className="h-24 bg-muted rounded-lg"></div>
            <div className="h-24 bg-muted rounded-lg"></div>
            <div className="h-40 bg-muted rounded-lg mt-6"></div>
          </div>
        </main>
        <Navbar />
      </div>
    );
  }

  if (cartItems.length === 0) {
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
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-3">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't added any items to your cart yet. Start exploring our selection of products.
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

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <h1 className="text-2xl font-display font-bold mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center border border-border rounded-lg p-4"
              >
                <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <div className="flex items-baseline">
                    <span className="font-display font-semibold">${item.product.price.toFixed(2)}</span>
                    <span className="text-muted-foreground text-sm ml-1">/ {item.product.unit}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-primary"
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                  >
                    <MinusCircle className="h-5 w-5" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-primary"
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="ml-4 flex-shrink-0 text-right">
                  <div className="font-display font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive h-8 px-2"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="font-display font-semibold text-lg mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/payment">
              <Button className="w-full flex gap-2">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
}
