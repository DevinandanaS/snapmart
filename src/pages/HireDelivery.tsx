import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function HireDelivery() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-display font-bold">Hire Delivery</h1>
        </div>
        
        <div className="bg-muted p-6 rounded-lg mb-8">
          <p className="text-muted-foreground">
            We connect you with reliable delivery partners to get your groceries from supermarkets 
            that don't offer delivery services.
          </p>
        </div>
        
        <h2 className="text-xl font-medium mb-4">Provide Delivery Details</h2>
        
        <form className="space-y-6">
          {/* Form would go here */}
          <Button 
            className="w-full" 
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setTimeout(() => setIsSubmitting(false), 1500);
            }}
          >
            {isSubmitting ? "Processing..." : "Request Delivery Partner"}
          </Button>
        </form>
      </main>
    </div>
  );
}
