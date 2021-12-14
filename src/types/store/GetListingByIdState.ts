import { GenericResponse } from 'types/GenericResponse';

export type GetListingByIdMeta = {
  listingId: string;
};

export type GetListingByIdData = {
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
  catch_date?: string; // ex. yyyy-mm-dd
  catch_recurrence?: string;
  default_photo: string;
  description: string; // note
  fishermanId: string;
  fishermanFirstName: string;
  fishermanLastName: string;
  coop_name: string;
  coop_image: string; // image uri
  coop_id: string;
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
  minimum_order: string; // number string
  sellInMultiplesOf: boolean;
  remaining_weight: number;
  original_weight: number;
  boxes: {
    id: string;
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
  is_aquafuture: boolean;
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
};

export type GetListingByIdPayload = GenericResponse<GetListingByIdData>;
