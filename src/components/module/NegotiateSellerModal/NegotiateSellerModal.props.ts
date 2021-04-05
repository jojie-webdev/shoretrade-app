import { ModalProps } from 'components/layout/Modal/Modal.props';

export interface NegotiateSellerModalProps extends ModalProps {
  onSubmit: (counterOffer: number) => void;
  originalOffer: number;
  counterOffer: number;
  counterOffers?: number[];
  originalOffers?: number[];
  isNegotiating?: boolean;
  weight: {
    unit: string;
    value: number;
  };
}
