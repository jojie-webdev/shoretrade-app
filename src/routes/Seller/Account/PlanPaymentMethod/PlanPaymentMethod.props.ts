import { Dispatch, SetStateAction } from 'react';

export type NewCardDetails = {
  cardNumber: string;
  cardExpiryDate: string;
  cardCvc: string;
  cardName: string;
  isDefault: boolean;
};

export type Card = {
  brand: string;
  expMonth: number;
  expYear: number;
  id: string;
  lastFour: string;
  name: string;
};

export interface PlanPaymentMethodGeneratedProps {
  payPlanAmountDue: (newCardDetails: NewCardDetails) => void;
  cards: Card[];
  amountDue?: string;
  selectedCardId: string;
  setSelectedCardId: Dispatch<SetStateAction<string>>;
  isPaymentLoading: boolean;
  defaultCard: string;
  onRemoveCard: (card: Card) => void;
  companyId: string;
}
