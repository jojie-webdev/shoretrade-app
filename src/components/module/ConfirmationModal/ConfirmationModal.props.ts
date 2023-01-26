import { HTMLAttributes } from 'react';

import { ModalProps } from 'components/layout/Modal/Modal.props';

type ConfirmationModalGeneratedProps = {
  title?: string | JSX.Element;
  description?: string | React.ReactNode;
  actionText?: string;
  cancelText?: string;
  action: () => void;
  cancel?: () => void;
  hideCancel?: boolean;
  switchBtns?: boolean;
  switchBtnsEffect?: boolean;
};

export type ConfirmationModalProps = ModalProps &
  ConfirmationModalGeneratedProps;
