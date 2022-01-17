import { Dispatch } from 'react';

export type OrderItem = {
  cartItemId: string;
  title: string;
  uri: string;
  name: string;
  price: string;
  tags: { label: string; type: string | 'plain' | 'blue' }[];
  weight: string;
  size: string;
  location: string;
  vendor: string;
  vendorId: string;
  unit: string;
  shippingOptions: {
    id: string;
    priceId: string;
    name: string;
    est: string;
    price: string;
    imageUrl: string;
    subAddress?: string;
  }[];
  crateFee?: number;
};

export interface CheckoutGeneratedProps {
  balance: string;
  groupedOrders: Record<string, OrderItem[]>;
  loadingShippingQuotes: boolean;
  loadingCart: boolean;
  totalValue: number;
  keepShopping: () => void;
  placeOrder: () => void;
  selectedShipping: Record<string, any>;
  selectedShippingId: Record<string, string>;
  setSelectedShippingId: Dispatch<Partial<Record<string, string>>>;
  processingOrder: boolean;
  removeItem: (id: string) => void;
  orderError: string;
}
