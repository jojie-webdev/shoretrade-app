export interface CheckoutCardProps {
  uri?: string;
  name: string;
  price: string;
  weight?: string;
  size?: string;
  vendor?: string;
  unit?: string;
  tags?: { label: string }[];
  onRemove?: () => void;
}
