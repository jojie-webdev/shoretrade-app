import { GenericResponse } from 'types/GenericResponse';

export type GetNotificationsMeta = any;

export type NotificationType =
  | 'account'
  | 'inactivity'
  | 'ordering'
  | 'listings'
  | 'market_requests'
  | 'market_board'
  | 'cart'
  | 'orders'
  | 'rating_favourite'
  | 'aquafutures';

export type NotifName = 'Credit Added' | 'Order Placed';

export type NotificationItemResponse = {
  resource: NotificationType;
  id: string;
  name: NotifName;
  description: string;
  isRead: boolean;
  content: string;
  read_at: Date | null;
  created_at: Date | null;
};

export type GetNotificationsPayload = GenericResponse<{
  token: string;

  total: number;
  unread: number;
  notifications: NotificationItemResponse[];
}>;
