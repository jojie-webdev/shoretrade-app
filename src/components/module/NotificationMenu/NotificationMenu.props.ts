import {
  NotificationItemResponse,
  NotificationType,
  NotifName,
} from 'types/store/GetNotificationsState';

export interface NotificationMenuProps {
  notifTotal: number;
  unreadTotal: number;
  notifsData: NotificationItemResponse[];
  handleMarkasRead: (notificationId: string) => void;
  handleMarkAllasRead: () => void;
  handleOnDelete: (notificationId: string) => void;
  handleNotifOnClick: (
    resource: NotificationType,
    appType: 'buyer' | 'seller',
    name?: NotifName
  ) => void;
}
