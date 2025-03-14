
import React from "react";
import { Order } from "@/lib/types";
import { CheckCircle, Circle, CircleDot, Clock, Truck, PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface DeliveryStatusProps {
  order: Order;
}

export function DeliveryStatus({ order }: DeliveryStatusProps) {
  const steps = [
    { key: "confirmed", label: "Order Confirmed", icon: CheckCircle },
    { key: "preparing", label: "Preparing", icon: PackageCheck },
    { key: "out-for-delivery", label: "Out for Delivery", icon: Truck },
    { key: "delivered", label: "Delivered", icon: Circle },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === order.status);

  // Calculate estimated delivery time
  const estimatedDelivery = new Date(order.estimatedDelivery);
  const isLate = new Date() > estimatedDelivery && order.status !== "delivered";

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-lg">Delivery Status</h3>
        <Badge
          variant={isLate ? "destructive" : "outline"}
          className="text-xs font-normal"
        >
          <Clock className="h-3 w-3 mr-1" />
          {isLate
            ? "Delayed"
            : `Estimated: ${format(estimatedDelivery, "h:mm a")}`}
        </Badge>
      </div>

      <div className="relative">
        <div
          className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"
          style={{ top: 10, bottom: 10 }}
        />

        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.key} className="relative mb-5 last:mb-0">
              <div className="flex items-start">
                <div className="relative flex-shrink-0 mr-4">
                  <motion.div
                    initial={isCompleted ? { scale: 0.5, opacity: 0 } : {}}
                    animate={isCompleted ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center z-10",
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                      isCurrent && "ring-4 ring-primary/20"
                    )}
                  >
                    {isCurrent ? (
                      <CircleDot className="h-4 w-4" />
                    ) : (
                      <step.icon
                        className={cn(
                          "h-4 w-4",
                          isCompleted ? "" : "text-muted-foreground"
                        )}
                      />
                    )}
                  </motion.div>
                </div>

                <div className="pt-1.5">
                  <p
                    className={cn(
                      "font-medium",
                      isCompleted ? "" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  {isCurrent && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-muted-foreground mt-1"
                    >
                      {step.key === "confirmed" && "Your order is being processed"}
                      {step.key === "preparing" &&
                        "Your items are being packed at the store"}
                      {step.key === "out-for-delivery" &&
                        order.deliveryPerson && (
                          <span className="flex items-center">
                            {order.deliveryPerson.name} is on the way
                          </span>
                        )}
                      {step.key === "delivered" && "Your order has arrived"}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
