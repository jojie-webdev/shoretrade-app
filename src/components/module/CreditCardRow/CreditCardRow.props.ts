export interface CreditCardRowProps {
  active?: boolean;
  brand: string; // Ex. 'Visa'
  lastFour: string;
  onClick: (e: any) => void;
}
