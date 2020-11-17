import { GenericResponse } from 'types/GenericResponse';

export type GetListingBoxesMeta = {
  listingId: string;
  weight: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetListingBoxesResponseItem = {};

export type GetListingBoxesPayload = GenericResponse<{
  token: string;
  boxes: {
    count: number | null;
    id: string;
    quantity: number | null;
    weight: number;
  }[][];
  shipping: [];
}>;
