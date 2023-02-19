import { ModalProps } from 'components/layout/Modal/Modal.props';
import {
  GetActiveOffersRequestResponseItem,
  Negotiations,
} from 'types/store/GetActiveOffersState';

export interface NegotiationSellerModalProps extends ModalProps {
  marketOffer: GetActiveOffersRequestResponseItem;
  modalLastNegotiationsArray: Negotiations[];
  isNegotiating?: boolean;
  onSubmit: (counterOffer: number) => void;
}
