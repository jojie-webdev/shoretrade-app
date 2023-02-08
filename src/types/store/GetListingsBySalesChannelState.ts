import { GenericResponse } from 'types/GenericResponse';

export type GetListingsBySalesChannelMeta = {
  employeeId: string;
  term?: string;
  salesChannel: string;
  limit?: number;
  page?: number;
};

export type GetListingsBySalesChannelResponseItem = {
  listing_id: string;
  seller_id: string;
  type_name: string;
  type_id: string;
  end_date?: string; // ex. "yyyy-mm-ddThh:mm:ss.000Z"
  origin: {
    state: string;
    suburb: string;
    countryCode: string;
  };
  price_per_kilo: string; // number string
  sizeId: string;
  size_from?: string;
  size_to?: string;
  categoryName: string;
  catch_date?: string; // ex. yyyy-mm-dd
  catch_recurrence?: string;
  default_photo: string;
  description: string; // note
  fishermanId: string;
  fishermanFirstName: string;
  fishermanLastName: string;
  coop_name: string;
  coopImage: string; // image uri
  coopId: string;
  rating?: string; // ex. "5.0"
  created_at: string; // ex. "yyyy-mm-ddThh:mm:ss.000Z"
  specifications: {
    id: string;
    name: string;
  }[];
  state_ids: string[];
  images: {
    requirement_id: string;
    url: string;
  }[];
  minimum_order: string; // number string
  sell_in_multiples_of: boolean;
  remaining_weight: number;
  original_weight: number;
  boxes: {
    id: string;
    weight: number;
    quantity: number;
    count?: number;
  }[];
  average: number;
  address_id: string;
  addressStreetNumber: string;
  addressUnitNumber: string;
  addressLevel: string;
  addressStreetName: string;
  addressSuburb: string;
  addressPostcode: string;
  addressState: string;
  addressCountryCode: string;
  flatDeliveryFee?: any;
  auction_date?: string;
  is_aquafuture: boolean;
  is_auction_sale: boolean;
  is_pre_auction_sale: boolean;
  is_for_sale_rep_photo: boolean;
  is_actual_photo: boolean;
  allowedWeightAdjustment: number;
  measurement_unit: string; // ex. 'kg' or 'dozen'
  metric_label?: string;
  unitKgConversion: string;
  packaging: {
    id: string;
    label: string;
    type: string;
    airline_approved: boolean;
    length: number;
    width: number;
    height: number;
    company_id: string | null;
  } | null;
  quality: string | null;
  is_ike_jime: boolean;
  is_ice_slurry: boolean;
  template_delivery_date: string | null;
  restrict_to_state?: boolean;
  allow_negotiations: boolean;
};

export type CounterResponseItem = {
  total_count: string;
  all_listing: string;
  direct_listing: string;
  aquafuture: string;
  pre_auction: string;
};

export type GetListingsBySalesChannelPayload = GenericResponse<{
  listings: GetListingsBySalesChannelResponseItem[];
  counter: CounterResponseItem;
}>;
