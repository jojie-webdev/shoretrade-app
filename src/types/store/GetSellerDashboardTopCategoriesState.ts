import { GenericResponse } from 'types/GenericResponse';

export type GetSellerDashboardTopCategoriesMeta = {
  // iso date strings
  dateFrom: string;
  dateTo: string;
};

export type GetSellerDashboardTopCategoriesPayload = {
  message: string;
  data: {
    topCategories: {
      id: string;
      name: string;
      total: number;
    }[];
    previousTopCategories: {
      id: string;
      name: string;
      total: number;
    }[];
  };
};
