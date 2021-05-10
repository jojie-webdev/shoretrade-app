import { Dispatch } from 'react';

export type OrderItem = {
  cartId: string;
  title: string;
  uri: string;
  name: string;
  price: string;
  tags: { label: string }[];
  weight: string;
  size: string;
  location: string;
  vendor: string;
  vendorId: string;
  unit: string;
  shippingOptions: {
    priceId: number;
    name: string;
    est: string;
    price: string;
  }[];
};

export interface CheckoutGeneratedProps {
  balance: string;
  groupedOrders: Record<string, OrderItem[]>;
  loadingShippingQuotes: boolean;
  totalValue: number;
  keepShopping: () => void;
  placeOrder: () => void;
  selectedShipping: Record<string, any>;
  selectedShippingId: Record<string, number>;
  setSelectedShippingId: Dispatch<Partial<Record<string, number>>>;
  processingOrder: boolean;
  removeItem: (id: string) => void;
  orderError: string;
}
