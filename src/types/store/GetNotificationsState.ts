import { GenericResponse } from 'types/GenericResponse';

export type GetNotificationsMeta = any;

export type NotificationType =
  | 'account'
  | 'inactivity'
  | 'ordering'
  | 'market-requests'
  | 'listings'
  | 'cart'
  | 'rating-favourite'
  | 'aquafutures';

export type NotificationItemResponse = {
  resource: NotificationType;
  id: string;
  name: string;
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
