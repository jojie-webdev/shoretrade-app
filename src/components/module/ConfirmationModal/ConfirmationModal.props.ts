import { ModalProps } from 'components/layout/Modal/Modal.props';

type ConfirmationModalGeneratedProps = {
  title?: string;
  description?: string;
  actionText?: string;
  action: () => void;
};

export type ConfirmationModalProps = ModalProps &
  ConfirmationModalGeneratedProps;
