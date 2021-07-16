import { GenericResponse } from 'types/GenericResponse';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CreateCustomListingMeta = {};

export type CreateCustomListingRequestData = {
  employee: string;
  type: string; // custom type name
  category: string; // category id
  metric: string; // metric id
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
  catchRecurrence: string | null;
  description: string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  ends: string | null; // date iso string
  isAquafuture: boolean;
  addressId: string;
  packaging?: {
    id?: string;
    custom?: {
      width: number;
      height: number;
      length: number;
      airlineApproved?: boolean;
    };
  };
};

export type CreateCustomListingPayload = GenericResponse;
