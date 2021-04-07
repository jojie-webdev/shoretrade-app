import { Dispatch } from 'react';

export interface CardDetails {
  number: string;
  exp: string; // 'mm/yy'
  cvc: string;
  name: string;
  isDefault: boolean;
}

export interface PaymentMethodPublicProps {
  total: string;
  processingOrder: boolean;
  orderError: string;
  placeOrder: () => void;
  onBack: () => void;
}

export interface PaymentMethodGeneratedProps extends PaymentMethodPublicProps {
  balance: string;
  cardDetails: CardDetails;
  setCardDetails: Dispatch<Partial<CardDetails>>;
}
