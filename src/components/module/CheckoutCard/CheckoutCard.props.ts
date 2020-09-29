export interface CheckoutCardProps {
  uri?: string;
  name: string;
  price: string;
  weight?: string;
  size?: string;
  vendor?: string;
  unit?: string;
  onRemove?: () => void;
}
