import { SVGProps } from 'components/base/SVG/SVG.props';
import { Route } from 'types/Routes';
import { GetUserPayload } from 'types/store/GetUserState';
import { Theme } from 'types/Theme';

export interface DashboardPublicProps {
  children: any;
  routes: Route[];
}

export interface DashboardGeneratedProps extends DashboardPublicProps {
  pageTitle?: string;
  isInnerRoute: (path: string) => boolean;
  shouldIncludePadding: boolean;
  userData: GetUserPayload['data']['user'] | undefined;
  logout: () => void;
}

// Inner component props
export type NavLinkProps = {
  to: string;
  color: keyof Theme['brand'] | keyof Theme['grey'];
  linkText?: string;
  iconColor?: string;
  Icon?: React.FC<SVGProps>;
};

export type HeaderProps = {
  pageTitle: string | undefined;
  userData: GetUserPayload['data']['user'] | undefined;
};
