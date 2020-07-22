import { RouteProps } from 'react-router-dom';

interface Route extends RouteProps {
  path: string;
}

export type Routes = {
  [key: string]: Route;
};
