import { Dispatch, SetStateAction } from 'react';

import { SVGProps } from 'components/base/SVG/SVG.props';
import { Route } from 'types/Routes';
import { GetUserPayload } from 'types/store/GetUserState';
import { Theme } from 'types/Theme';
import { GetNotificationsPayload, NotificationItemResponse } from 'types/store/GetNotificationsState';

export interface DashboardPublicProps {
  ref?: any;
  children: any;
  routes: Route[];
  onBack?: () => void;
  background?: string;
  screenBackground?: string;
  headerTextColor?: keyof Theme['grey'];
  shouldIncludePadding?: boolean;
  pageTitle?: string;
}

export interface DashboardGeneratedProps extends DashboardPublicProps {
  pageTitle?: string;
  isInnerRoute: (path: string) => boolean;
  shouldIncludePadding: boolean;
  userData: GetUserPayload['data']['user'] | undefined;
  logout: () => void;
  credit: string;
  openSidebar: boolean;
  onClickOpenSideBar: (value: boolean) => void;
  cartItems: number;
  onClickAccount: () => void;
  notifsData: NotificationItemResponse[];
  totalNotifs: number;
  totalUnreadNotifs: number;
  handleMarkasRead: (notificationId: string) => void;
  handleOnDelete: (notificationId: string) => void;
}

// Inner component props
export type NavLinkProps = {
  to: string;
  color: keyof Theme['brand'] | keyof Theme['grey'];
  linkText?: string;
  iconColor?: string;
  Icon?: React.FC<SVGProps>;
  onClick: () => void;
  isActive: boolean;
};

// Inner component props
export type IconLinkProps = {
  to: string;
  iconColor?: string;
  Icon?: React.FC<SVGProps>;
  onClick: () => void;
  isActive: boolean;
  isOpen?: boolean;
};

export type HeaderProps = {
  pageTitle: string | undefined;
  userData: GetUserPayload['data']['user'] | undefined;
  textColor: keyof Theme['brand'] | keyof Theme['grey'];
  openSidebar: boolean;
  onClick: () => void;
  onBack?: () => void;
  onClickAccount: () => void;
  cartItems: number;
  notifsData: NotificationItemResponse[];
  totalNotifs: number;
  totalUnreadNotifs: number;
  handleMarkasRead: (notificationId: string) => void;
  handleOnDelete: (notificationId: string) => void;
};
