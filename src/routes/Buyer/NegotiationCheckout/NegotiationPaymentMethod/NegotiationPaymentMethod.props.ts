import { Dispatch, SetStateAction } from 'react';

import { GetPaymentMethodsResponseItem } from 'types/store/GetPaymentMethodsState';

export interface CardDetails {
  number: string;
  exp: string; // 'mm/yy'
  cvc: string;
  name: string;
  isDefault: boolean;
}

export interface NegotiationPaymentMethodPublicProps {
  totalValue: number;
  selectedShipping: Record<string, any>;
  orderError: string;
  placeOrder: () => void;
  onBack: () => void;
  onRefresh?: () => void;
}

export interface NegotiationPaymentMethodGeneratedProps
  extends NegotiationPaymentMethodPublicProps {
  balance: string;
  cards: GetPaymentMethodsResponseItem[];
  cardDetails: CardDetails;
  clearOrders: () => void;
  setCardDetails: Dispatch<Partial<CardDetails>>;
  selectedCard: string;
  setSelectedCard: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  onAddCard: (values: CardDetails) => void;
  onExistingCard: () => void;
  addCardAndPayError: string;
}
