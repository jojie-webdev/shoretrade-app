import { ModalProps } from 'components/layout/Modal/Modal.props';

type MessageModalGeneratedProps = {
  recipient: string;
  onSend: (message: string) => void;
};

export type MessageModalProps = ModalProps & MessageModalGeneratedProps;
