export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  avatar?: string | null;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  banner?: string | null;
  category: string;
  frequency: string;
  price: number;
  subscriptionPrice: number;
  description: string;
  features: string; // JSON parsed to string[]
  subscriptionBenefits: string; // JSON parsed to string[]
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  reviews?: Review[];
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean;
  selectedPlan: 'MONTHLY' | 'BI_MONTHLY' | 'QUARTERLY';
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  totalAmount: number;
  discountAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  items: {
    id: string;
    product: Product;
    isSubscribed: boolean;
    frequency?: string | null;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId?: string | null;
  product: Product;
  plan: string;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  price: number;
  address: string;
  customerName: string;
  customerEmail: string;
  startDate: string;
  nextBilling: string;
}
