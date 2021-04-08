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

export type AddCardAndPayMeta = {
  cart: OrderCartItem[][];
  currentAddress: GetAddressesResponseItem;
  totalPrice: number;
  email: string;
  companyId: string;
  cardToken?: string;
  card: {
    number: number;
    exp_month: string;
    exp_year: string;
    cvc: number;
    name: string;
  };
  default?: boolean;
};

export type AddCardAndPayRealPayload = {
  cart: OrderCartItem[][];
  currentAddress: GetAddressesResponseItem;
  totalPrice: number;
  email: string;
  companyId: string;
  cardToken: string;
  currency: string;
};

export type AddCardAndPayPayload = GenericResponse;
