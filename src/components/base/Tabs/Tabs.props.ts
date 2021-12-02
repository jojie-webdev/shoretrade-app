import { CSSProperties, HTMLAttributes } from 'react';
import { Justify, ColProps } from 'react-grid-system';

export interface TabsProps {
  tabs?: string[];
  tabElements?: JSX.Element[];
  tabValues?: string[];
  tabStyle?: CSSProperties;
  fitTabWidthToContent?: boolean;
  justify?: Justify;
  selectedTab: string;
  onClickTab: (tab: string) => void;
}

export interface TabColProps extends ColProps{
  fitTabWidthToContent?: boolean;
  children: JSX.Element;
}
