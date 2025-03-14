
import { useState } from "react";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  UserPlus, ChevronRight, Star, Clock, MapPin, Truck, User, Phone, CreditCard, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deliveryPeople } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function HireDelivery() {
  const [step, setStep] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Mock function to proceed to next step
  const nextStep = () => {
    if (step === 3) {
      // Final step - show success
      toast({
        title: "Delivery person hired!",
        description: "Your delivery request has been sent successfully.",
        variant: "default",
      });
      return;
    }
    
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl">Hire a Delivery Person</h1>
              <p className="text-muted-foreground">Get your groceries delivered by our trusted partners</p>
            </div>
          </div>
          
          {/* Steps indicator */}
          <div className="flex items-center justify-between mb-8 max-w-md">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  s === step ? 'bg-primary text-white' : 
                  s < step ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {s < step ? <Check className="h-5 w-5" /> : s}
                </div>
                <span className={`text-xs mt-2 ${s === step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Details' : s === 2 ? 'Select' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>
          
          {/* Step 1: Pickup Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Pickup Details</h2>
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium mb-1">Store Name</label>
                    <Input placeholder="Enter store name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Store Address</label>
                    <Input placeholder="Enter store address" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Order Details</label>
                    <Textarea placeholder="Provide details about what needs to be picked up" />
                  </div>
                </div>
              </div>
              
              <Button onClick={nextStep} className="w-full max-w-lg">
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
          
          {/* Step 2: Select Delivery Person */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-semibold mb-4">Select a Delivery Person</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {deliveryPeople.map((person) => (
                  <div 
                    key={person.id}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      selectedPerson === person.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPerson(person.id)}
                  >
                    <div className="flex items-center mb-3">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={person.image} alt={person.name} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{person.name}</h3>
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{person.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <div className="bg-secondary py-1 px-2 rounded-full flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        {person.vehicle}
                      </div>
                      <div className="bg-secondary py-1 px-2 rounded-full flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Fast delivery
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={nextStep} 
                className="w-full max-w-lg"
                disabled={!selectedPerson}
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
          
          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-semibold mb-4">Confirm Details</h2>
              
              <div className="bg-card border rounded-xl p-5 mb-6">
                <h3 className="font-medium text-lg mb-4">Delivery Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">Premium Foods</p>
                        <p className="text-xs text-muted-foreground">123 Market St, San Francisco</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Change</Button>
                  </div>
                  
                  <div className="flex justify-between pb-3 border-b">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">James Wilson</p>
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">4.9</span>
                          <span className="text-muted-foreground ml-2">Honda Scooter</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Change</Button>
                  </div>
                  
                  <div className="flex justify-between pb-3 border-b">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">Contact</p>
                        <p className="text-xs text-muted-foreground">+1234567890</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">Payment</p>
                        <p className="text-xs text-muted-foreground">$5.99 delivery fee</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Change</Button>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={nextStep} 
                className="w-full max-w-lg"
              >
                Confirm Hiring
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>
      
      <Navbar />
    </div>
  );
}
