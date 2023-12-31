import { HTMLAttributes } from 'react';

import { IconPosition } from 'components/base/Button/Button.props';
import { ModalProps } from 'components/layout/Modal/Modal.props';

type ConfirmationModalGeneratedProps = {
  title?: string | JSX.Element;
  description?: string | React.ReactNode;
  actionIconPosition?: IconPosition;
  actionIcon?: JSX.Element;
  actionText?: string | JSX.Element;
  cancelText?: string;
  action: () => void;
  cancel?: () => void;
  hideCancel?: boolean;
  hideAction?: boolean;
  switchBtns?: boolean;
  switchBtnsEffect?: boolean;
  disableActionText?: boolean;
};

export type ConfirmationModalProps = ModalProps &
  ConfirmationModalGeneratedProps;
