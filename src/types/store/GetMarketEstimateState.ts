import { GenericResponse } from 'types/GenericResponse';

export type GetMarketEstimateMeta = {
  typeId: string;
  sizeFrom: string;
  sizeTo: string;
  specifications: string;
};

export type GetMarketEstimatePayload = GenericResponse<{
  token: string;
  min: null | number;
  max: null | number;
}>;
