import { GenericResponse } from 'types/GenericResponse';

import { GetSellerOrdersResponseItem } from './GetSellerOrdersState';

export type GetAllSellerOrderType = {
  [key: string]: GetSellerOrdersResponseItem[];
};

export type GetAllSellerOrder = GetAllSellerOrderType & {
  date?: string;
};

export type GetAllSellerOrdersMeta = {
  status?: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED';
  page?: string;
  limit?: number;
  term?: string;
};

// TODO: Update response value
export type GetAllSellerOrdersPayload = GenericResponse<{
  token: string;
  count: {
    headerCount: {
      [key: string]: number;
    };
    selectionCount: number;
  };
  orders: GetAllSellerOrder[];
}>;
