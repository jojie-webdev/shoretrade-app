import { ModalProps } from 'components/layout/Modal/Modal.props';

type RateSellerModalGeneratedProps = {
  loading: boolean;
  sendReview: (rating: number, feedback: string) => void;
};

export type RateSellerModalProps = ModalProps & RateSellerModalGeneratedProps;
