export type Option = {
  priceId: number;
  name: string;
  est: string;
  price: string;
};

export interface ShippingCardProps {
  options: Option[];
  selectedPriceId: number;
  onPress: (priceId: number) => void;
}
