import { ModalProps } from 'components/layout/Modal/Modal.props';

type ShippingDateModalGeneratedProps = {
  loading?: boolean;
  onConfirm: (s: string) => void;
  shippingMethod: string;
};

export type ShippingDateModalProps = ModalProps &
  ShippingDateModalGeneratedProps;
