export interface NotificationItemProps {
  type: NotificationType;
  isRead: boolean;
  content: string;
  date: moment.Moment | null;
  fullView?: boolean;
}

export type NotificationType =
  | 'account'
  | 'inactivity'
  | 'orders'
  | 'market-requests'
  | 'listings'
  | 'cart'
  | 'rating-favourite'
  | 'aquafutures';

export interface NotifAvatarProps {
  type: NotificationType;
}
