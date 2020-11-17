import { GenericResponse } from 'types/GenericResponse';

export type ConfirmWeightMeta = {
  orderId: string;
  listingId: string;
  listingBoxes: {
    id: string; // start id with "new" for new boxes
    count?: number;
    weight: number;
    quantity: number;
  }[];
  orderLineItemId: string;
};

export type ConfirmWeightPayload = GenericResponse;
