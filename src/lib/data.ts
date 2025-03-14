
import { Supermarket, Product, DeliveryPerson, Order, Notification } from './types';

export const supermarkets: Supermarket[] = [
  {
    id: '1',
    name: 'Fresh Market',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=2940&auto=format&fit=crop',
    rating: 4.8,
    ratingCount: 1204,
    distance: 1.2,
    deliveryTime: 25,
    hasDelivery: true,
    deliveryFee: 2.99,
    categories: ['Groceries', 'Organic', 'Dairy', 'Meat'],
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  },
  {
    id: '2',
    name: 'Gourmet Grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2874&auto=format&fit=crop',
    rating: 4.6,
    ratingCount: 867,
    distance: 1.8,
    deliveryTime: 30,
    hasDelivery: true,
    deliveryFee: 1.99,
    categories: ['Groceries', 'Imported', 'Snacks', 'Bakery'],
    location: {
      latitude: 37.7833,
      longitude: -122.4167,
    },
  },
  {
    id: '3',
    name: 'ValueMart',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=2874&auto=format&fit=crop',
    rating: 4.3,
    ratingCount: 1547,
    distance: 2.5,
    deliveryTime: 40,
    hasDelivery: true,
    deliveryFee: 0.99,
    categories: ['Groceries', 'Household', 'Dairy', 'Snacks'],
    location: {
      latitude: 37.7695,
      longitude: -122.4143,
    },
  },
  {
    id: '4',
    name: 'Premium Foods',
    image: 'https://images.unsplash.com/photo-1607349913338-fca8f39869d2?q=80&w=2728&auto=format&fit=crop',
    rating: 4.9,
    ratingCount: 732,
    distance: 3.1,
    deliveryTime: 45,
    hasDelivery: false,
    deliveryFee: 0,
    categories: ['Organic', 'Specialty', 'Dairy', 'Meat'],
    location: {
      latitude: 37.7831,
      longitude: -122.4104,
    },
  },
  {
    id: '5',
    name: 'Quick Mart',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=2940&auto=format&fit=crop',
    rating: 4.2,
    ratingCount: 987,
    distance: 0.8,
    deliveryTime: 20,
    hasDelivery: true,
    deliveryFee: 3.49,
    categories: ['Groceries', 'Snacks', 'Beverages', 'Frozen'],
    location: {
      latitude: 37.7864,
      longitude: -122.4036,
    },
  },
];

export const products: Product[] = [
  // Fresh Market Products
  {
    id: '101',
    name: 'Organic Bananas',
    image: '/placeholder.svg',
    price: 1.99,
    unit: 'bunch',
    category: 'Groceries',
    supermarketId: '1',
    description: 'Organic, locally sourced bananas. Perfect ripeness guaranteed.',
    inStock: true,
  },
  {
    id: '102',
    name: 'Grass-fed Ground Beef',
    image: '/placeholder.svg',
    price: 8.99,
    originalPrice: 10.99,
    unit: 'lb',
    category: 'Meat',
    supermarketId: '1',
    description: 'Premium grass-fed beef, free from antibiotics and hormones.',
    inStock: true,
  },
  {
    id: '103',
    name: 'Organic Whole Milk',
    image: '/placeholder.svg',
    price: 4.49,
    unit: 'gallon',
    category: 'Dairy',
    supermarketId: '1',
    description: 'Creamy, farm-fresh organic whole milk from pasture-raised cows.',
    inStock: true,
  },
  {
    id: '104',
    name: 'Organic Carrots',
    image: '/placeholder.svg',
    price: 2.49,
    unit: 'bundle',
    category: 'Groceries',
    supermarketId: '1',
    description: 'Fresh, organic carrots. Perfect for snacking or cooking.',
    inStock: true,
  },
  
  // Gourmet Grocery Products
  {
    id: '201',
    name: 'Artisan Sourdough Bread',
    image: '/placeholder.svg',
    price: 5.99,
    unit: 'loaf',
    category: 'Bakery',
    supermarketId: '2',
    description: 'Freshly baked artisan sourdough bread with a perfect crust.',
    inStock: true,
  },
  {
    id: '202',
    name: 'Imported Italian Pasta',
    image: '/placeholder.svg',
    price: 3.99,
    unit: 'pack',
    category: 'Imported',
    supermarketId: '2',
    description: 'Premium Italian pasta, made with the finest durum wheat.',
    inStock: true,
  },
  {
    id: '203',
    name: 'Gourmet Chocolate Truffles',
    image: '/placeholder.svg',
    price: 12.99,
    originalPrice: 15.99,
    unit: 'box',
    category: 'Snacks',
    supermarketId: '2',
    description: 'Luxurious handmade chocolate truffles in assorted flavors.',
    inStock: true,
  },
  {
    id: '204',
    name: 'Premium Coffee Beans',
    image: '/placeholder.svg',
    price: 14.99,
    unit: 'bag',
    category: 'Beverages',
    supermarketId: '2',
    description: 'Single-origin, freshly roasted coffee beans with complex flavors.',
    inStock: false,
  },
  
  // ValueMart Products
  {
    id: '301',
    name: 'White Bread',
    image: '/placeholder.svg',
    price: 1.49,
    unit: 'loaf',
    category: 'Groceries',
    supermarketId: '3',
    description: 'Soft, sliced white bread, perfect for sandwiches.',
    inStock: true,
  },
  {
    id: '302',
    name: 'Potato Chips',
    image: '/placeholder.svg',
    price: 2.99,
    unit: 'bag',
    category: 'Snacks',
    supermarketId: '3',
    description: 'Crispy potato chips in classic salt flavor.',
    inStock: true,
  },
  {
    id: '303',
    name: 'Cheddar Cheese',
    image: '/placeholder.svg',
    price: 3.99,
    originalPrice: 4.99,
    unit: 'block',
    category: 'Dairy',
    supermarketId: '3',
    description: 'Sharp cheddar cheese, aged for perfect flavor.',
    inStock: true,
  },
  {
    id: '304',
    name: 'Paper Towels',
    image: '/placeholder.svg',
    price: 5.99,
    unit: 'pack',
    category: 'Household',
    supermarketId: '3',
    description: 'Absorbent paper towels, sold in a convenient multi-pack.',
    inStock: true,
  },
];

export const deliveryPeople: DeliveryPerson[] = [
  {
    id: 'd1',
    name: 'James Wilson',
    phone: '+1234567890',
    rating: 4.9,
    vehicle: 'Honda Scooter',
    image: '/placeholder.svg',
  },
  {
    id: 'd2',
    name: 'Sarah Chen',
    phone: '+1234567891',
    rating: 4.8,
    vehicle: 'Electric Bike',
    image: '/placeholder.svg',
  },
  {
    id: 'd3',
    name: 'Miguel Rodriguez',
    phone: '+1234567892',
    rating: 4.7,
    vehicle: 'Toyota Prius',
    image: '/placeholder.svg',
  },
];

export const sampleOrder: Order = {
  id: 'ord123',
  userId: 'u1',
  supermarketId: '1',
  items: [
    {
      id: 'ci1',
      product: products[0],
      quantity: 1,
    },
    {
      id: 'ci2',
      product: products[1],
      quantity: 2,
    },
  ],
  status: 'confirmed',
  total: 19.97,
  deliveryFee: 2.99,
  tax: 1.80,
  grandTotal: 24.76,
  paymentMethod: 'credit-card',
  deliveryAddress: {
    id: 'a1',
    label: 'Home',
    address: '123 Main St',
    city: 'San Francisco',
    postalCode: '94105',
    isDefault: true,
  },
  createdAt: new Date().toISOString(),
  estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(),
  deliveryPerson: deliveryPeople[0],
};

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'order-confirmed',
    title: 'Order Confirmed',
    message: 'Your order #ord123 has been confirmed and is being processed.',
    orderId: 'ord123',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: 'n2',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 20% off on all dairy products today!',
    read: true,
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
  },
  {
    id: 'n3',
    type: 'order-delayed',
    title: 'Delivery Delay',
    message: 'Your order #ord120 is experiencing a slight delay. New ETA: 6:45 PM',
    orderId: 'ord120',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
];

// Helper functions
export function getSupermarketById(id: string): Supermarket | undefined {
  return supermarkets.find(supermarket => supermarket.id === id);
}

export function getProductsBySupermarketId(supermarketId: string): Product[] {
  return products.filter(product => product.supermarketId === supermarketId);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}
