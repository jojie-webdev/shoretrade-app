import { GenericResponse } from 'types/GenericResponse';

import { CartItem } from './CartState';
import { GetAddressesResponseItem } from './GetAddressesState';
import { GetCartDataItem } from './GetCartState';
import {
  OrderShipping as OrderShippingRef,
  OrderCartItem as OrderCartItemRef,
} from './OrderState';

export type OrderShipping = OrderShippingRef;

export type OrderCartItem = OrderCartItemRef;

export type AddCardAndPayMeta = {
  cartId: string;
  employeeId: string;
  cart: OrderCartItem[][];
  currentAddress: GetAddressesResponseItem;
  totalPrice: number;
  email: string;
  companyId: string;
  cardToken?: string;
  existingCard?: string;
  card?: {
    number: number;
    exp_month: number;
    exp_year: number;
    cvc: string;
    name: string;
  };
  default?: boolean;
  paymentMode: string;
  negotiationRequestId?: string;
};

export type AddCardAndPayRealPayload = {
  cartId: string;
  employeeId: string;
  cart: OrderCartItem[][];
  currentAddress: GetAddressesResponseItem;
  totalPrice: number;
  email: string;
  companyId: string;
  cardToken?: string;
  existingCard?: string;
  currency: string;
  paymentMode: string;
  negotiationRequestId?: string;
};

export type AddCardAndPayPayload = GenericResponse;
