import { GenericResponse } from 'types/GenericResponse';

export type GetListingTypesByCategoryMeta = {
  categoryId: string;
};

export type GetListingTypesByCategoryRequestData = {
  categoryId: string;
  addressId: string;
};

export type GetListingTypesByCategoryTypeItem = {
  count: string;
  id: string;
  measurementUnit: string; // 'kg
  name: string;
  price: {
    from: number;
    to: number;
    unit: string; // ex. Grams
  };
  from: number;
  to: number;
  unit: string; // ex. Grams
  thumbnail: string;
};

export type GetListingTypesByCategoryPayload = GenericResponse<{
  type: GetListingTypesByCategoryTypeItem[];
}>;
