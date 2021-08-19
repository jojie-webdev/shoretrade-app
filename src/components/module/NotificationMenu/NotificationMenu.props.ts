import {
  NotificationItemResponse,
  NotificationType,
} from 'types/store/GetNotificationsState';

export interface NotificationMenuProps {
  notifTotal: number;
  unreadTotal: number;
  notifsData: NotificationItemResponse[];
  handleMarkasRead: (notificationId: string) => void;
  handleOnDelete: (notificationId: string) => void;
  handleNotifOnClick: (
    resource: NotificationType,
    appType: 'buyer' | 'seller'
  ) => void;
}
