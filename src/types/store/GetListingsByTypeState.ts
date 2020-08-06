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
  caught: string;
  coop: { name: string };
  createdAt: string;
  description: string;
  ends: string;
  fisherman: { name: string };
  id: string;
  images: string[];
  isAquafuture: boolean;
  measurementUnit: string;
  minimumOrder: string;
  origin: { state: string; suburb: string; countryCode: string };
  price: string;
  remaining: number;
  sellInMultiplesOf: boolean;
  size: { from: string; to: string; unit: string };
  state: string[];
  total: number;
  type: string;
};

export type GetListingsByTypePayload = GenericResponse<{
  count: string;
  listings: GetListingsByTypeResponseListingItem[];
}>;
