import { Theme } from 'types/Theme';

export interface BreadcrumbsProps {
  sections: BreadCrumbSection[];
  isLight?: boolean;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
  className?: string;
}

export interface BreadCrumbSection {
  label: string;
  link?: string;
  onClick?: () => void;
  isDone?: boolean;
}
