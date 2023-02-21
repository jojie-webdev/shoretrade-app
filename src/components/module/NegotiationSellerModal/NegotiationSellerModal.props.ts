import { ModalProps } from 'components/layout/Modal/Modal.props';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export interface NegotiationSellerModalProps extends ModalProps {
  negotiation: GetNegotiationByIdRequestResponseItem | undefined;
  isNegotiating?: boolean;
  onSubmit: (counterOffer: number) => void;
}
