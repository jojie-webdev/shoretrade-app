import { NotificationItemResponse } from 'types/store/GetNotificationsState';

export interface NotificationMenuProps {
  notifTotal: number;
  unreadTotal: number;
  notifsData: NotificationItemResponse[];
  handleMarkasRead: (notificationId: string) => void;
}
