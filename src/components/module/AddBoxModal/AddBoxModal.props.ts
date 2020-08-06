import { ModalProps } from 'components/layout/Modal/Modal.props';

export interface BoxValues {
  weight: string;
  quantity: string;
  count: string;
}

export interface AddBoxModalProps extends ModalProps {
  onAdd: (values: BoxValues) => void;
  unit?: string;
}
