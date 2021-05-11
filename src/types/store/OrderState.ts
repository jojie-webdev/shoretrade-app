import { GenericResponse } from 'types/GenericResponse';

import { CartItem } from './CartState';
import { GetAddressesResponseItem } from './GetAddressesState';

export type OrderShipping = {
  carrierName: string;
  deliveryMethod: string; // 'road'
  deliveryOption: string; // 'depot'
  gstCharge: number;
  maxTransitTime: string; // yyyy-mm-dd
  minTransitTime: string;
  netCharge: number;
  price: number;
  priceId: number;
  quoteId: number;
  serviceName: string;
};

export type OrderCartItem = CartItem & {
  shipping: OrderShipping;
};

export type OrderMeta = {
  cart: OrderCartItem[][]; // Array of listings inside array of sellers
  currentAddress: GetAddressesResponseItem;
  totalPrice: number;
  paymentMode?: string;
};

export type OrderPayload = GenericResponse;
