export interface ModalProps {
  children?: any;
  isOpen: boolean;
  backgroundColor?: string;
  onClickClose: () => void;
  hideClose?: boolean;
  style?: any;
}
