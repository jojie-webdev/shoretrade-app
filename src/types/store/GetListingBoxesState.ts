import { GenericResponse } from 'types/GenericResponse';

export type GetListingBoxesMeta = {
  listingId: string;
  weight: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetListingBoxesResponseItem = {
  token: string;
  boxes: {
    count: number;
    id: string;
    quantity: number;
    weight: number;
  }[][];
  shipping: [];
};

export type GetListingBoxesPayload = GenericResponse<{
  token: string;
  boxes: {
    count: number;
    id: string;
    quantity: number;
    weight: number;
  }[][];
  shipping: [];
}>;
