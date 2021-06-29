import { GenericResponse } from 'types/GenericResponse';

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetAllListingsMeta = {};

export type GetAllListingsResponseItem = {
  id: string;
  sellerId: string;
  type: string;
  typeId: string;
  typeMetric: string; // ex. "Grams"
  ends: string; // ex. "yyyy-mm-ddThh:mm:ss.000Z"
  origin: {
    state: string;
    suburb: string;
    countryCode: string;
  };
  pricePerKilo: string; // number string
  sizeId: string;
  sizeFrom?: string;
  sizeTo?: string;
  categoryName: string;
  catchDate: string; // ex. yyyy-mm-dd
  description: string; // note
  fishermanId: string;
  fishermanFirstName: string;
  fishermanLastName: string;
  coopName: string;
  coopImage: string; // image uri
  coopId: string;
  rating?: string; // ex. "5.0"
  createdAt: string; // ex. "yyyy-mm-ddThh:mm:ss.000Z"
  specifications: string[]; // Ex. ['Frozen','Bone Out','Skin On']
  stateIds: string[];
  isFavourite: false;
  images: string[]; // array of image uri
  minimumOrder: string; // number string
  sellInMultiplesOf: boolean;
  remaining: number;
  originalWeight: number;
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
  isAquafuture: boolean;
  allowedWeightAdjustment: number;
  measurementUnit: string; // ex. 'kg' or 'dozen'
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
};

export type GetAllListingsPayload = GenericResponse<{
  token: string;
  orders: GetAllListingsResponseItem[];
}>;
