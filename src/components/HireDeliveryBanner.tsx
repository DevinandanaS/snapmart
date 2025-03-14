
import { Link } from "react-router-dom";
import { UserPlus, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HireDeliveryBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl mb-10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/20 rounded-2xl" />
      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-6">
          <h2 className="text-white font-display font-bold text-xl md:text-2xl mb-2">
            Need a delivery person?
          </h2>
          <p className="text-white/90 text-sm md:text-base max-w-md mb-4">
            Some stores don't offer delivery, but you can hire one of our trusted delivery partners to pick up your order.
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <Truck className="text-white mr-2 h-4 w-4" />
              <span className="text-white text-sm">Fast Delivery</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <Star className="text-white mr-2 h-4 w-4" />
              <span className="text-white text-sm">Rated 4.8+</span>
            </div>
          </div>
          <Link to="/hire-delivery">
            <Button 
              variant="default" 
              className="bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Hire Delivery Person
            </Button>
          </Link>
        </div>
        <div className="hidden md:block relative w-1/3">
          <img 
            src="https://images.unsplash.com/photo-1607916978741-0d94789ec16c?q=80&w=2787&auto=format&fit=crop"
            alt="Delivery person"
            className="rounded-lg object-cover w-full h-48 shadow-lg"
          />
          <div className="absolute -bottom-3 -right-3 bg-white rounded-lg p-3 shadow-lg">
            <div className="text-sm font-medium">Average Rate</div>
            <div className="text-lg font-bold text-primary">$5.99/trip</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
