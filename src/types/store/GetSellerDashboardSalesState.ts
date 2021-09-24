import { GenericResponse } from 'types/GenericResponse';

export type GetSellerDashboardSalesMeta = {
  // iso date strings
  dateFrom: string;
  dateTo: string;
};

export type GetSellerDashboardSalesPayload = {
  message: string;
  data: {
    graph: {
      date: string;
      paid: number;
      pending: number;
    }[];
    total: {
      paid: number;
      pending: number;
    };
    previousMonthTotal: {
      paid: number;
      pending: number;
    };
  };
};
