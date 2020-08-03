export interface ModalProps {
  title: string;
  overline?: string;
  children?: string;
  isOpen: boolean;
  onClickClose: () => void;
}
