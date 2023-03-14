import { Option } from 'components/module/ShippingCard/ShippingCard.props';
import { NegotiationItem } from 'types/store/GetCartByEmployeeIdAndNegotiationIdState';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export type OrderItem = {
  cartItemId: string;
  title: string;
  uri: string;
  name: string;
  price: string;
  tags: { label: string; type: string | 'plain' | 'blue' }[];
  weight: string;
  size: string;
  location: string;
  vendor: string;
  vendorId: string;
  unit: string;
  shippingOptions: {
    id: string;
    priceId: string;
    name: string;
    nameId: string;
    est: string;
    price: string;
    imageUrl: string;
    subAddress?: string;
    shipmentMode: string;
  }[];
  crateFee?: number;
  transactionFee?: number;
  isFreeShipping: boolean;
  isGSTIncluded: boolean;
  listing: {
    isPreAuctionSale?: boolean;
  };
};

// export interface NegotiationCheckoutGeneratedProps {
//   negotiation: GetNegotiationByIdRequestResponseItem | undefined;
//   totalValue: number;
//   selectedShippingId: Record<string, string>;
//   isNegotiationPending: boolean;
//   balance: string;
//   transactionValueFeePercent: number;
//   onDeliveryMethodSelection: (option: Option, orderListingKey: string) => void;
//   removeItem: (id: string, orderListingKey: string) => void;
// }

export interface NegotiationCheckoutGeneratedProps {
  balance: string;
  groupedOrders: Record<string, OrderItem[]>;
  loadingShippingQuotes: boolean;
  loadingCart: boolean;
  totalValue: number;
  keepShopping: () => void;
  placeOrder: () => void;
  selectedShipping: Record<string, any>;
  selectedShippingId: Record<string, string>;
  processingOrder: boolean;
  removeItem: (id: string, orderListingKey: string) => void;
  orderError: string;
  onDeliveryMethodSelection: (option: Option, orderListingKey: string) => void;
  onRefresh: () => void;
  transactionValueFeePercent: number;
}
