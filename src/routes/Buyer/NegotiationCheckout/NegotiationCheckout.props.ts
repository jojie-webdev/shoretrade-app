import { Option } from 'components/module/ShippingCard/ShippingCard.props';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export interface NegotiationCheckoutGeneratedProps {
  negotiation: GetNegotiationByIdRequestResponseItem | undefined;
  totalValue: number;
  selectedShippingId: Record<string, string>;
  isNegotiationPending: boolean;
  balance: string;
  transactionValueFeePercent: number;
  onDeliveryMethodSelection: (option: Option, orderListingKey: string) => void;
  removeItem: (id: string, orderListingKey: string) => void;
}
