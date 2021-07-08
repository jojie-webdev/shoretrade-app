import { GenericResponse } from 'types/GenericResponse';

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetAllBuyerListingsMeta = {};

export type SortOrder = 'ASC' | 'DESC';

export type GetAllBuyerListingResponseItem = {
  id: string;
  name: string;
  category: string;
  specifications: string;
  metric: string;
  size_from: string | null;
  size_to: string | null;
  price: string | number;
  unit: string;
  origin: {
    state: string;
    suburb: string;
    countryCode: string;
  };
  end_data: string;
  catch_date: string;
  created_at: string;
  sortField?: string;
};

export interface GetAllBuyerListingRequestOption {
  sortBy: string;
  sortOrder: SortOrder;
  term: string;
  limit: number | string;
  page: number | string;
  csv?: boolean;
  ids?: string[];
}

export type GetAllBuyerListingsPayload = GenericResponse<{
  token: string;
  sortField: string;
  orders: GetAllBuyerListingResponseItem[];
}>;
