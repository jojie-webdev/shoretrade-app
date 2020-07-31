import { Route } from 'types/Routes';

export interface DashboardGeneratedProps extends DashboardPublicProps {
  pageTitle?: string;
}

export interface DashboardPublicProps {
  children: any;
  routes: Route[];
}
