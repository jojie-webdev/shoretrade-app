export interface BreadcrumbsProps {
  sections: { label: string; link?: string; onClick?: () => void }[];
  isLight?: boolean;
}
