export type Option = {
  id: string;
  priceId: string;
  name: string;
  nameId: string;
  subAddress?: string;
  est: string;
  price: string;
  imageUrl: string;
  shipmentMode: string;
};

export interface ShippingCardProps {
  options: Option[];
  isFreeShipping?: boolean;
  selectedDeliveryMethod: string;
  onPress: (priceId: string, option: Option) => void;
}
