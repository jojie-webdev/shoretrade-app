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
  | 'aquafutures'
  | 'negotiations';

export type NotifName =
  | 'Credit Added'
  | 'Order Placed'
  | 'Address Approved'
  | 'Address Approval';
export type NotifTitle = 'New Address Approved';

export type NotificationItemResponse = {
  resource: NotificationType;
  id: string;
  name: NotifName;
  title: NotifTitle | string;
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

export const GLOBAL_DEACTIVATION_MESSAGE =
  'Are you sure you want to turn off all external notifications?';
