import { GenericResponse } from 'types/GenericResponse';

export type GetNotificationsMeta = {
  accountId: string;
};

export type NotificationType =
  | 'account'
  | 'inactivity'
  | 'orders'
  | 'market-requests'
  | 'listings'
  | 'cart'
  | 'rating-favourite'
  | 'aquafutures';

export type NotificationItemResponse = {
  type: NotificationType;
  archived: boolean;
  isRead: boolean;
  content: string;
  date: Date | null;
};

export type GetNotificationsPayload = GenericResponse<{
  token: string;
  data: {
    totalAll: number;
    totalArchived: number;
    totalUnread: number;
    item: NotificationItemResponse[];
  };
}>;
