export interface NotificationItemProps {
  type: NotificationType;
  isRead: boolean;
  content: string;
  date: moment.Moment | null;
  fullView?: boolean;
}

export type NotificationType =
  | 'account'
  | 'orders'
  | 'marketRequests'
  | 'listings'
  | 'cart';

export interface NotifAvatarProps {
  type: NotificationType;
}
