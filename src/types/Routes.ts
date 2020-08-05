import { ReactNode, ReactType } from 'react';

import { SVGProps } from 'components/base/SVG/SVG.props';
import { RouteProps } from 'react-router-dom';

export interface Route extends RouteProps {
  path: string;
  nested?: boolean;
  title?: string; // Used for sidebar links and dashboard title
  icon?: React.FC<SVGProps>; // Used for sidebar icon
  hideFromSidebar?: boolean;
}

export type Routes = {
  [key: string]: Route;
};
