import { Dispatch, SetStateAction } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';
import {
  NotificationItemResponse,
  NotificationType,
} from 'types/store/GetNotificationsState';

export interface NotificationsGeneratedProps {
  tabItems: TabItem[];
  setActiveTab: Dispatch<SetStateAction<number>>;
  activeTab: number;
  notifsData: NotificationItemResponse[];
  totalNotifs: number;
  totalUnreadNotifs: number;
  handleMarkasRead: (notificationId: string) => void;
  handleOnDelete: (notificationId: string) => void;
  handleNotifOnClick: (
    resource: NotificationType,
    appType: 'buyer' | 'seller'
  ) => void;
}