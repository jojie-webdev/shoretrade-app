import { GenericResponse } from 'types/GenericResponse';

export type GetMarketInterestsMeta = {
  companyId: string;
};

export type MarketInterestItem = {
  id: string;
  name: string;
};

export type GetMarketInterestsPayload = GenericResponse<{
  selling: MarketInterestItem[];
  buying: MarketInterestItem[];
}>;
