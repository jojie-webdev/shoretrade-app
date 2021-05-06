export interface MobileModalProps {
  children?: any;
  isOpen: boolean;
  backgroundColor?: string;
  onClickClose: () => void;
  backdropStyle?: any;
  modalStyle?: any;
}
