export type GetHistoricalListingsMeta = {
  page?: number;
  limit?: number;
  term?: string;
  employeeId: string;
};

export type HistoricalListingItem = {
  id: string;
  type: string;
  type_id: string;
  states: { id: string; name: string }[];
  price_per_unit: number;
  metric: string;
  measurement_unit: string;
  image_preview: string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  size_from: string | null;
  size_to: string | null;
  created_at: string;
  images: { requirement_id: string; url: string }[];
  boxes: {
    weight: number;
    quantity: number;
    count?: number;
  }[];
  minimum_order: number;
  sell_in_multiples_of: boolean;
  packaging: {
    id: string;
    type: string;
    unit: string;
    label: string;
    width: number;
    height: number;
    length: number;
    airline_approved: boolean;
  } | null;
  is_aquafuture: boolean;
  address_id: string;
};

export type GetHistoricalListingsPayload = {
  message: string;
  data: {
    listings: HistoricalListingItem[];
    count: number;
  };
};
