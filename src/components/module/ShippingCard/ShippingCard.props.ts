export type Option = {
  id: string;
  priceId: string;
  name: string;
  secondName?: string;
  est: string;
  price: string;
  imageUrl: string
};

export interface ShippingCardProps {
  options: Option[];
  selectedPriceId: string;
  onPress: (priceId: string) => void;
}
