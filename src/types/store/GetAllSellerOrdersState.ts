import { GenericResponse } from 'types/GenericResponse';

import { GetSellerOrdersResponseItem } from './GetSellerOrdersState';

export type GetAllSellerOrderType = {
  [key: string]: GetSellerOrdersResponseItem[];
};

export type GetAllSellerOrder = GetAllSellerOrderType & {
  date?: string;
};

export type GetAllSellerOrdersMeta = {
  status?: 'PLACED' | 'TRANSIT' | 'DELIVERED';
  pending?: boolean;
  page?: string;
  limit?: number;
};

// TODO: Update response value
export type GetAllSellerOrdersPayload = GenericResponse<{
  token: string;
  count: string;
  orders: GetAllSellerOrder[];
}>;
