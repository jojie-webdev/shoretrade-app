import { ProductDetailCardProps } from 'components/module/ProductDetailCard/ProductDetailCard.props';

export interface OrderAccordionItemProps {
  orderNumber: string;
  seller: string;
  orderedBy: string;
  detailsProps: ProductDetailCardProps[];
  shippingOption: string;
  shippingPrice: string;
  total: string;
}
