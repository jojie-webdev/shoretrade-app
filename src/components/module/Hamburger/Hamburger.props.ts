import { Theme } from 'types/Theme';

export interface HamburgerProps {
  isActive: boolean;
  onClick: () => void;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
  height?: number;
  width?: number;
}
