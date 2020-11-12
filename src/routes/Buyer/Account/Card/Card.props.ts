import { Dispatch } from 'react';

import { AsyncState } from 'types/store/AsyncState';

export interface CardDetails {
  number: string;
  exp: string; // 'mm/yy'
  cvc: string;
  name: string;
  isDefault: boolean;
}

export interface CardPrivateProps {
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
