import { NotificationType } from 'types/store/GetNotificationsState';

export interface NotificationItemProps {
  type: NotificationType;
  isRead: boolean;
  content: string;
  date: Date | null;
  fullView?: boolean;
  onMarkasRead: () => void;
}

export interface NotifAvatarProps {
  type: NotificationType;
}
