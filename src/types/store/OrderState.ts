import { GenericResponse } from 'types/GenericResponse';

import { CartItem } from './CartState';
import { GetAddressesResponseItem } from './GetAddressesState';
import { GetCartDataItem } from './GetCartState';

export type OrderShipping = {
  carrierName: string;
  deliveryMethod: string; // 'road'
  deliveryOption: string; // 'depot'
  gstCharge: number;
  maxTransitTime: string; // yyyy-mm-dd
  minTransitTime: string;
  netCharge: number;
  price: number;
  priceId: string;
  quoteId: number;
  serviceName: string;
  viaSFM?: boolean;
};

export type OrderCartItem = (CartItem | GetCartDataItem) & {
  shipping: OrderShipping;
};

export type OrderMeta = {
  cartId: string;
  employeeId: string;
  cart: OrderCartItem[][]; // Array of listings inside array of sellers
  currentAddress: GetAddressesResponseItem;
  totalPrice: number;
  paymentMode?: string;
};

export type OrderPayload = GenericResponse;
