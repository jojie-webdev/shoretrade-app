import { RouteProps } from 'react-router-dom';

export interface Route extends RouteProps {
  path: string;
  nested?: boolean;
  title?: string; // Used for sidebar links and dashboard title
  hideFromSidebar?: boolean;
}

export type Routes = {
  [key: string]: Route;
};
