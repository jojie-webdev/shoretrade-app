import { ModalProps } from 'components/layout/Modal/Modal.props';

type ConfirmationModalGeneratedProps = {
  title?: string;
  description?: string;
  actionText?: string;
  cancelText?: string;
  action: () => void;
  cancel?: () => void;
};

export type ConfirmationModalProps = ModalProps &
  ConfirmationModalGeneratedProps;
