import { ModalProps } from 'components/layout/Modal/Modal.props';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export interface NegotiationBuyerModalProps extends ModalProps {
  negotiation: GetNegotiationByIdRequestResponseItem;
  onSubmitClick: (buyerNegotiatedPrice: number) => void;
  isCreateBuyerCounterNegotiationPending: boolean;
}
