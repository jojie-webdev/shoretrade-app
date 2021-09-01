import { InteractionsProps } from 'components/base/Interactions/Interactions.props';

export interface CreditCardCardProps extends InteractionsProps {
  brand: string; // Ex. 'Visa'
  expMonth?: number;
  expYear?: number;
  id: string;
  lastFour: string;
  name: string;
  isDefault?: boolean;
  onClick: () => void;
}
