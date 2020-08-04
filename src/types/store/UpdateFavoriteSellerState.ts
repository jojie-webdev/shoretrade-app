import { GenericResponse } from 'types/GenericResponse';

export type UpdateFavoriteSellerMeta = {
  sellerId: string;
  favorite: boolean;
};

export type UpdateFavoriteSellerPayload = GenericResponse;
