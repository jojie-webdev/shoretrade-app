import { GenericResponse } from 'types/GenericResponse';

export type GetMarketRequestBuyerFiltersMeta = {
  buyerId: string;
};

export type GetMarketRequestBuyerFiltersResponseItem = {
  location: Array<{ text: string; key: string }>;
  rating: Array<{ text: string; key: string }>;
  favouriteSellers: Array<{ text: string; key: string }>;
};

export type GetMarketRequestBuyerFiltersPayload = GenericResponse<
  GetMarketRequestBuyerFiltersResponseItem
>;
