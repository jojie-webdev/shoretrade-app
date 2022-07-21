import { Dispatch } from 'react';

import { AsyncState } from 'types/store/AsyncState';
import { GetPaymentMethodsResponseItem } from 'types/store/GetPaymentMethodsState';

export interface CardDetails {
  number: string;
  exp: string; // 'mm/yy'
  cvc: string;
  name: string;
  isDefault: boolean;
}

export interface CardItem extends GetPaymentMethodsResponseItem {
  isDefault: boolean;
}

export interface CardPrivateProps {
  cards: GetPaymentMethodsResponseItem[];
  cardDetails: CardDetails;
  setCardDetails: Dispatch<Partial<CardDetails>>;
  onAddCard: (x: CardDetails) => void;
  onUpdateCard: (x: CardDetails) => void;
  onRemoveCard: () => void;
  isLoading: boolean;
  isRemoving: boolean;
  isExisting: boolean;
  addCardResult?: AsyncState;
}

export interface CardGeneratedProps extends CardPrivateProps {}

export interface FieldsetCardProps extends CardGeneratedProps {
  formik?: any;
}
