
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { deliveryPeople } from "@/lib/data";

export default function HireDelivery() {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="flex items-center mb-6">
          <Button as={Link} to="/" variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold">Hire Delivery Partner</h1>
        </div>
        
        <div className="bg-primary/10 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="bg-primary/20 p-2 rounded-full mr-3">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Need delivery from a store without a delivery service?</h3>
              <p className="text-sm text-muted-foreground">
                Our delivery partners can pick up your items from any supermarket and deliver them to your doorstep.
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">Available Delivery Partners</h2>
        
        <div className="space-y-4">
          {deliveryPeople.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        <UserPlus className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium">{person.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="mr-2">{person.vehicle}</span>
                        <span>⭐ {person.rating}</span>
                      </div>
                    </div>
                    
                    <Button size="sm">Select</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      
      <Navbar />
    </div>
  );
}
