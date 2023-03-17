import { GenericResponse } from 'types/GenericResponse';

export type GetListingsByTypeMeta = {
  typeId: string;
  filterData?: {
    catchmentArea?: string;
    sizeRangeFrom?: number | string;
    sizeRangeTo?: number | string;
    specifications?: string;
    showUngraded?: boolean;
  };
};

export type GetListingsByTypeRequestData = {
  typeId: string;
  addressId: string;
};

export type GetListingsByTypeResponseListingItem = {
  caught?: string; // yyyy-mm-dd
  ends?: string;
  catchRecurrence?: string;
  coop: { name: string };
  createdAt: string;
  description: string;
  fisherman: { name: string };
  id: string;
  images: string[];
  isAquafuture: boolean;
  measurementUnit: string;
  minimumOrder: string;
  origin: { state: string; suburb: string; countryCode: string };
  shippingFrom: { state: string; suburb: string; countryCode: string };
  price: string;
  remaining: number;
  sellInMultiplesOf: boolean;
  size: { from: string; to: string; unit: string };
  state: string[];
  total: number;
  type: string;
  isIkeJime: boolean;
  isIceSlurry: boolean;
  quality?: string;
  templateDeliveryDate: string | null;
  isForSaleRepPhoto: boolean;
  packaging: {
    airline_approved: boolean;
    company_id: string | null;
    height: number;
    id: string;
    label: string;
    length: number;
    type: string;
    width: number;
  };
  allowNegotiations: boolean;
  auctionDate: string;
  negotiationId: string;
};

export type GetListingsByTypePayload = GenericResponse<{
  count: string;
  listings: GetListingsByTypeResponseListingItem[];
}>;
