import { Dispatch } from 'react';

export interface CardDetails {
  number: string;
  exp: string; // 'mm/yy'
  cvc: string;
  name: string;
  isDefault: boolean;
}

export interface PaymentMethodPublicProps {
  onBack: () => void;
}

export interface PaymentMethodGeneratedProps extends PaymentMethodPublicProps {
  cardDetails: CardDetails;
  setCardDetails: Dispatch<Partial<CardDetails>>;
}
