import { ModalProps } from 'components/layout/Modal/Modal.props';

export interface Negotiation {
  offerId: string;
  counterOffer: number;
}

export interface NegotiateModalProps extends ModalProps {
  onSubmit: (values: Negotiation) => void;
  offerId: string;
  negotiationId: string;
  originalOffer: number;
  weight: {
    unit: string;
    value: number;
  };
}
