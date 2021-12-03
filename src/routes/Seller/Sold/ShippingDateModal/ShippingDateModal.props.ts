import { ModalProps } from 'components/layout/Modal/Modal.props';

type ShippingDateModalGeneratedProps = {
  loading?: boolean;
  onConfirm: (s: string) => void;
};

export type ShippingDateModalProps = ModalProps &
  ShippingDateModalGeneratedProps;
