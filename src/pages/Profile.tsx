
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { User, MapPin, CreditCard, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Profile() {
  // Mock user data - in a real app this would come from authentication
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555-123-4567",
  };

  const profileMenuItems = [
    { icon: MapPin, label: "My Addresses", path: "/addresses" },
    { icon: CreditCard, label: "Payment Methods", path: "/payment-methods" },
    { icon: Settings, label: "Account Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-muted-foreground">{user.phone}</p>
        </motion.div>
        
        <Card className="mb-6">
          <CardContent className="p-0">
            {profileMenuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  className="flex items-center justify-between w-full p-4 h-auto border-b last:border-0"
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{item.label}</span>
                  </div>
                  <div className="text-muted-foreground">→</div>
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
        
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-destructive">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </main>
      
      <Navbar />
    </div>
  );
}
