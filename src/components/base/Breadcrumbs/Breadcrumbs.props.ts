import { Theme } from 'types/Theme';

export interface BreadcrumbsProps {
  sections: { label: string; link?: string; onClick?: () => void }[];
  isLight?: boolean;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
}
