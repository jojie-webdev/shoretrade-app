import { GenericResponse } from 'types/GenericResponse';

export type GetBuyerSearchFilterDataMeta = {
  typeId: string;
};

export type FilterDataResponse = {
  maxBoxCount: number;
  minBoxCount: number;
  origin: string[];
  sizeFrom: number | string;
  sizeOptions: [];
  sizeTo: number | string;
  specifications: [
    {
      categoryStateOptionId: string;
      groupOption: number;
      state: { id: string; name: string };
      id: string;
      name: string;
      stateOptionId: string;
    }
  ][];
  stateRules: Record<string, string[]>;
  typeMetric: string;
};

export type GetBuyerSearchFilterDataPayload = GenericResponse<
  FilterDataResponse
>;
