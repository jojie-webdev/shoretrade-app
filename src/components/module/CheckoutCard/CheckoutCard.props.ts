export interface CheckoutCardProps {
  name: string;
  image?: string;
  vendor?: string;
  size?: string;
  unit?: string;
  type?: string;
  price: string;
  onDelete: () => void;
}
