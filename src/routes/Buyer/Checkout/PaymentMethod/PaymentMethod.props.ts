import { Dispatch } from 'react';

export interface CardDetails {
  number: string;
  exp: string; // 'mm/yy'
  cvc: string;
  name: string;
  isDefault: boolean;
}

export interface PaymentMethodPublicProps {
  totalValue: number;
  processingOrder: boolean;
  selectedShipping: Record<string, any>;
  orderError: string;
  placeOrder: () => void;
  onBack: () => void;
}

export interface PaymentMethodGeneratedProps extends PaymentMethodPublicProps {
  balance: string;
  cardDetails: CardDetails;
  setCardDetails: Dispatch<Partial<CardDetails>>;
  isLoading: boolean;
  onAddCard: (values: CardDetails) => void;
  addCardAndPayError: string;
}
