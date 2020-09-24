export interface InteractionCreditCardProps {
  brand: string; // Ex. 'Visa'
  expMonth: number;
  expYear: number;
  id: string;
  lastFour: string;
  name: string;
  isDefault: boolean;
  onClick: () => void;
}
