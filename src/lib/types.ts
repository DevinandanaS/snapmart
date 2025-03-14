
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Supermarket {
  id: string;
  name: string;
  image: string;
  rating: number;
  ratingCount: number;
  distance: number; // in kilometers
  deliveryTime: number; // in minutes
  hasDelivery: boolean;
  deliveryFee: number;
  categories: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: string;
  supermarketId: string;
  description?: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  supermarketId: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  createdAt: string;
  estimatedDelivery: string;
  deliveryPerson?: DeliveryPerson;
  isCustomDelivery?: boolean;
}

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
  image: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'out-for-delivery' 
  | 'delivered' 
  | 'cancelled';

export type PaymentMethod = 
  | 'credit-card' 
  | 'debit-card' 
  | 'wallet' 
  | 'cash-on-delivery';

export type NotificationType = 
  | 'order-confirmed' 
  | 'order-preparing' 
  | 'order-out-for-delivery' 
  | 'order-delivered' 
  | 'order-delayed' 
  | 'order-cancelled' 
  | 'promotion';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  orderId?: string;
  read: boolean;
  createdAt: string;
}
