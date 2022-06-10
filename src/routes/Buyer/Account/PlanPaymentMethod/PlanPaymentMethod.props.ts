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
  isPaymentLoading: boolean;
  setSelectedCardId: Dispatch<SetStateAction<string>>;
  defaultCard: string;
  onRemoveCard: (card: Card) => void;
}
