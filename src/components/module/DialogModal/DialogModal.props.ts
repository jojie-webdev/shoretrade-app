import { ModalProps } from 'components/layout/Modal/Modal.props';

export interface DialogModalProps extends ModalProps {
  children?: any;
  title?: string;
  overline?: string;
}
