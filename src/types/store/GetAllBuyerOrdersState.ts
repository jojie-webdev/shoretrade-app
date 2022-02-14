import { GenericResponse } from 'types/GenericResponse';

import { GetAllSellerOrder } from './GetAllSellerOrdersState';

export type GetAllBuyerOrdersMeta = {
  status?: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED';
  limit?: number;
  page?: string;
  term?: string;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  orderId?: string;
  orderLineItemId?: string;
};

export type GetAllBuyerOrdersPayload = GenericResponse<{
  count: {
    headerCount: {
      [key: string]: number;
    };
    selectionCount: number;
  };
  orders: GetAllSellerOrder[];
}>;
