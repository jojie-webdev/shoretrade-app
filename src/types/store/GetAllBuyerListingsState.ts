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
  end_date: string;
  catch_date: string;
  created_at: string;
  catch_recurrence: string | null;
  remaining_weight: number;
  total_weight: number;
  sales_channel?: string;
  is_ike_jime: boolean;
  is_ice_slurry: boolean;
};

export interface GetAllBuyerListingRequestOption {
  salesChannel: string;
  sortBy: string;
  sortOrder: SortOrder;
  term: string;
  limit: number | string;
  page: number | string;
  csv?: boolean;
  ids?: string[];
  all?: boolean;
  exceptId?: string[];
}

export type CounterResponseItem = {
  total_count: string;
  all_listing: string;
  direct_listing: string;
  aquafuture: string;
  pre_auction: string;
  auction: string;
};

export type GetAllBuyerListingsPayload = GenericResponse<{
  listings: GetAllBuyerListingResponseItem[];
  counter: CounterResponseItem;
  count: string;
}>;
