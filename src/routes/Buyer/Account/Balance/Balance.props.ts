import { GetPaymentMethodsResponseItem } from 'types/store/GetPaymentMethodsState';

import { Card } from '../PlanPaymentMethod/PlanPaymentMethod.props';

export interface CardItem extends GetPaymentMethodsResponseItem {
  isDefault: boolean;
}
export interface BalanceGeneratedProps {
  credit: string;
  cards: CardItem[];
  notifMessage: string;
  onRemoveCard: (card: Card) => void;
  defaultCardId?: string;
}
