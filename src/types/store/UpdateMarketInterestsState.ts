import { GenericResponse } from 'types/GenericResponse';

export type MarketInterestItem = {
  id: string;
  name: string;
  categoryId: string;
};

export type UpdateMarketInterestsMeta = {
  companyId: string;
  selling: MarketInterestItem[];
  buying: MarketInterestItem[];
};

export type UpdateMarketInterestsPayload = GenericResponse<{
  selling: MarketInterestItem[];
  buying: MarketInterestItem[];
}>;
