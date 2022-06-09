import { InteractionsProps } from 'components/base/Interactions/Interactions.props';

export interface InteractionCreditCardProps extends InteractionsProps {
  brand: string; // Ex. 'Visa'
  expMonth: number;
  expYear: number;
  id: string;
  lastFour: string;
  name: string;
  isDefault?: boolean;
  hideDetailBtn?: boolean;
  onClick: () => void;
  onRemove?: () => void;
}
