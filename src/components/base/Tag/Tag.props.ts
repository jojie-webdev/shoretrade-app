export interface TagProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  alt?: boolean;
  onClickRemove?: () => void;
  onClick?: () => void;
}
