import { NotificationType } from 'types/store/GetNotificationsState';

export interface NotificationItemProps {
  type: NotificationType;
  isRead: boolean;
  content: string;
  date: moment.Moment | null;
  fullView?: boolean;
}

export interface NotifAvatarProps {
  type: NotificationType;
}
