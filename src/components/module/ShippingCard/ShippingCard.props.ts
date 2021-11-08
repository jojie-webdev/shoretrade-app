export type Option = {
  id: string;
  priceId: string;
  name: string;
  subAddress?: string;
  est: string;
  price: string;
  imageUrl: string
};

export interface ShippingCardProps {
  options: Option[];
  selectedPriceId: string;
  onPress: (priceId: string) => void;
}
