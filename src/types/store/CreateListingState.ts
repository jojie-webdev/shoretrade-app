import { GenericResponse } from 'types/GenericResponse';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CreateListingMeta = {};

export type CreateListingRequestData = {
  employee: string;
  type: string;
  states: string[];
  isUngraded: boolean;
  sizeFrom: string | null;
  sizeTo: string | null;
  images: { url: string; requirementId: string }[];
  pricePerKilo: number;
  boxes: {
    id: string;
    weight: number;
    quantity: number;
    count?: number;
  }[];
  minOrder: number;
  sellInMultiplesOfMinOrder?: boolean;
  catchDate: string | null; // date iso string
  description: string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  ends: string | null; // date iso string
  isAquafuture: boolean;
  addressId: string;
};

export type CreateListingPayload = GenericResponse;
