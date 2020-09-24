import { GetPaymentMethodsResponseItem } from 'types/store/GetPaymentMethodsState';

export interface CardItem extends GetPaymentMethodsResponseItem {
  isDefault: boolean;
}
export interface BalanceGeneratedProps {
  credit: string;
  cards: CardItem[];
}
