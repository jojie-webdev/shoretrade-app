import { NotificationType } from 'types/store/GetNotificationsState';

export interface NotificationItemProps {
  type: NotificationType;
  isRead: boolean;
  name: string;
  content: string;
  date: Date | null;
  fullView?: boolean;
  onMarkasRead: () => void;
  onDelete: () => void;
  handleNotifOnClick: () => void;
}

export interface NotifAvatarProps {
  type: NotificationType;
}
