import { GenericResponse } from 'types/GenericResponse';

export type UpdateFavouriteProductMeta = {
  listingId: string;
  favourite: boolean;
};

export type UpdateFavouriteProductPayload = GenericResponse;
