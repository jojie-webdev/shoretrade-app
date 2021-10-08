import { GenericResponse } from 'types/GenericResponse';

export type RemoveCartItemMeta = {
  employeeId: string;
  cartId: string;
  transactionRef: string;
};

export type RemoveCartItemPayload = {
  message: string;
  data: {
    count: number;
  };
};
