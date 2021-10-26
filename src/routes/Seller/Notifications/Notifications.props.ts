import { Dispatch, SetStateAction } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';
import {
  NotificationItemResponse,
  NotificationType,
  NotifName,
  NotifTitle,
} from 'types/store/GetNotificationsState';
import { UserCompany } from 'types/store/GetUserState';

export interface NotificationsGeneratedProps {
  tabItems: TabItem[];
  handleSelectTab: (key: number) => void;
  activeTab: number;
  notifsData: NotificationItemResponse[];
  totalNotifs: number;
  totalUnreadNotifs: number;
  handleMarkasRead: (notificationId: string) => void;
  handleOnDelete: (notificationId: string) => void;
  handleNotifOnClick: (
    resource: NotificationType,
    appType: 'buyer' | 'seller',
    name?: NotifName,
    title?: NotifTitle | string
  ) => void;
  currentCompany: UserCompany | undefined;
}
