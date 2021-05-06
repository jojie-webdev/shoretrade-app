import { ReactNode } from 'react';

export interface ListCardProps {
  title: string;
  totalCount: number;
  data: any;
  icon: ReactNode;
  listItems: ReactNode;
}
