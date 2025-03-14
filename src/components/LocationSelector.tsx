
import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export function LocationSelector() {
  const [location, setLocation] = useState("San Francisco, CA");
  const [open, setOpen] = useState(false);
  
  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
    setOpen(false);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-9 px-2 py-1 text-left justify-start text-sm"
        >
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            <MapPin className="h-4 w-4 text-primary mr-1" />
            <span className="truncate max-w-[150px] font-normal">
              {location}
            </span>
            <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
          </motion.span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Delivery location</Label>
            <Input 
              id="location" 
              placeholder="Enter your address" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Recent locations</p>
            
            {["San Francisco, CA", "Oakland, CA", "Palo Alto, CA"].map((loc) => (
              <button
                key={loc}
                className="flex items-center w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted text-left"
                onClick={() => handleLocationSelect(loc)}
              >
                <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                {loc}
              </button>
            ))}
          </div>
          
          <Button 
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Confirm Location
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
