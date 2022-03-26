import { Dispatch, SetStateAction } from 'react';

export type NewCardDetails = {
  cardNumber: string;
  cardExpiryDate: string;
  cardCvc: string;
  cardName: string;
  isDefault: boolean;
};

export interface PlanPaymentMethodGeneratedProps {
  payPlanAmountDue: (newCardDetails: NewCardDetails) => void;
  cards: {
    brand: string;
    expMonth: number;
    expYear: number;
    id: string;
    lastFour: string;
    name: string;
  }[];
  amountDue: string;
  selectedCardId: string;
  isPaymentLoading: boolean;
  setSelectedCardId: Dispatch<SetStateAction<string>>;
}
