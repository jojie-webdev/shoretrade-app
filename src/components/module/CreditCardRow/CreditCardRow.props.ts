export interface CreditCardRowProps {
  active?: boolean;
  brand: string; // Ex. 'Visa'
  lastFour: string;
  expMonth?: string;
  expYear?: string;
  onClick: (e: any) => void;
}
