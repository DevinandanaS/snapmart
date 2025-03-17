
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CreditCard, Wallet, DollarSign, Check, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export default function Payment() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "debit-card" | "wallet" | "cash-on-delivery">("credit-card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully.",
      });
      navigate("/orders");
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="mb-6 flex items-center">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-display font-bold">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg border border-border p-5 mb-6">
              <h2 className="font-display font-semibold text-lg mb-4">Delivery Address</h2>
              
              <Tabs defaultValue="address1" className="w-full mb-4">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="address1">Home</TabsTrigger>
                  <TabsTrigger value="address2">Work</TabsTrigger>
                </TabsList>
                
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-medium">123 Main Street</p>
                  <p className="text-muted-foreground">Apt 4B</p>
                  <p className="text-muted-foreground">New York, NY 10001</p>
                </div>
              </Tabs>
              
              <Button variant="outline" className="w-full mt-2">
                Add New Address
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-5">
              <h2 className="font-display font-semibold text-lg mb-4">Payment Method</h2>
              
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={(value) => setPaymentMethod(value as any)}
                className="space-y-3 mb-6"
              >
                <div className="flex items-center space-x-2 border border-border rounded-lg p-3 cursor-pointer hover:bg-accent/20">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center cursor-pointer flex-grow">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                    Credit Card
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border border-border rounded-lg p-3 cursor-pointer hover:bg-accent/20">
                  <RadioGroupItem value="debit-card" id="debit-card" />
                  <Label htmlFor="debit-card" className="flex items-center cursor-pointer flex-grow">
                    <CreditCard className="h-5 w-5 mr-2 text-green-500" />
                    Debit Card
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border border-border rounded-lg p-3 cursor-pointer hover:bg-accent/20">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex items-center cursor-pointer flex-grow">
                    <Wallet className="h-5 w-5 mr-2 text-purple-500" />
                    Digital Wallet
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border border-border rounded-lg p-3 cursor-pointer hover:bg-accent/20">
                  <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                  <Label htmlFor="cash-on-delivery" className="flex items-center cursor-pointer flex-grow">
                    <DollarSign className="h-5 w-5 mr-2 text-yellow-500" />
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>
              
              {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="4111 1111 1111 1111" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" type="password" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-5 h-fit">
            <h2 className="font-display font-semibold text-lg mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">3 Items</span>
                <span>$10.77</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>$3.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$0.86</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span>$15.62</span>
              </div>
            </div>
            
            <Button 
              type="submit" 
              onClick={handleSubmit}
              className="w-full flex gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing Payment...</>
              ) : (
                <>
                  Place Order
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
}
