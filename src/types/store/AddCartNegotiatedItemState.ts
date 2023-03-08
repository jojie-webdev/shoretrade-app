import { GenericResponse } from 'types/GenericResponse';

export type AddCartNegotiatedItemMeta = {
  negotiationId: string;
  boxes: {
    id: string;
    quantity: number;
  }[];
  employeeId: string;
};

// TODO: Update response value
export type AddCartNegotiatedItemPayload = GenericResponse;
