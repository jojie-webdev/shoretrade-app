import { Dispatch } from 'react';

import { AsyncState } from 'types/store/AsyncState';
import { GetPaymentMethodsResponseItem } from 'types/store/GetPaymentMethodsState';

export interface AddCreditGeneratedProps {
  isPending: boolean;
  cards: GetPaymentMethodsResponseItem[];
  selectedCardId: string;
  setSelectedCardId: Dispatch<string>;
  addCredit: (x: string) => void;
  chargeCardResult?: AsyncState;
  downloadInvoice: (amount: string) => void;
}

export interface FieldsetCreditCardProps {
  cards: GetPaymentMethodsResponseItem[];
  selectedCardId: string;
  setSelectedCardId: Dispatch<string>;
}
