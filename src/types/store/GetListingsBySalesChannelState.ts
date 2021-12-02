import { GenericResponse } from 'types/GenericResponse';

export type GetListingsBySalesChannelMeta = {
  employeeId: string,
  term?: string,
  salesChannel: string;
  limit?: number,
  page?: number
};

export type GetListingsBySalesChannelResponseItem = {
  listing_id: string;
  sellerId: string;
  type_name: string;
  typeId: string;
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
  catchDate?: string; // ex. yyyy-mm-dd
  catch_recurrence?: string;
  default_photo: string;
  description: string; // note
  fishermanId: string;
  fishermanFirstName: string;
  fishermanLastName: string;
  coopName: string;
  coopImage: string; // image uri
  coopId: string;
  rating?: string; // ex. "5.0"
  created_at: string; // ex. "yyyy-mm-ddThh:mm:ss.000Z"
  specifications: {
    id: string;
    name: string;
  }[];
  stateIds: string[];
  images: {
    requirementId: string;
    url: string;
  }[];
  minimumOrder: string; // number string
  sellInMultiplesOf: boolean;
  remaining_weight: number;
  original_weight: number;
  boxes: {
    weight: number;
    count: number;
    quantity: number;
  }[];
  average: number;
  addressId: string;
  addressStreetNumber: string;
  addressUnitNumber: string;
  addressLevel: string;
  addressStreetName: string;
  addressSuburb: string;
  addressPostcode: string;
  addressState: string;
  addressCountryCode: string;
  flatDeliveryFee?: any;
  isAquafuture: boolean;
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
