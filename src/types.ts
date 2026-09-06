export type Category = string;
export type Gender = 'Men' | 'Women' | 'Unisex';
export type ProductStatus = 'Draft' | 'Published' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  category: Category;
  gender: Gender;
  brand: string;
  description: string;
  price: number;
  salePrice?: number;
  bulkPrice?: number;
  bulkQuantity?: number;
  sku: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stockQuantity: number;
  status: ProductStatus;
  createdAt: number;
  updatedAt: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
}

export interface Order {
  id: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    state: string;
    city: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  createdAt: number;
  orderNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: number;
}

export interface AdminSettings {
  businessName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  description: string;
  address: string;
  deliveryFee: number;
  vision: string;
  mission: string;
  businessHours: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}
