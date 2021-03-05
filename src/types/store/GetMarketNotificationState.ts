import { GenericResponse } from 'types/GenericResponse';

export type GetMarketNotificationMeta = {};

export type GetMarketNotificationPayload = GenericResponse<{
  token: string;
  currentNotification: {
    id?: string;
    type?: string;
    metadata?: {
      company_id?: string;
      market_offer_id?: string;
      market_request_id?: string;
      type_id?: string;
    };
    createdAt?: string; // date iso string
  };
}>;
