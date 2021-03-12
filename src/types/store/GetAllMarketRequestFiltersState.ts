import { GenericResponse } from 'types/GenericResponse';

export type GetAllMarketRequestFiltersMeta = {
  companyId: string;
};

export type GetAllMarketRequestFiltersResponseItem = {
  destination: Array<{ state: string }>;
  typeOptions: Array<{ categoryName: string; typeIds: string[] }>;
  stateOptions: Array<{ name: string; id: string }>;
  sizeOptions: {
    ungraded: boolean[];
    sizeTo: string;
    sizeFrom: string;
    sizeList: string[];
  };
};

export type GetAllMarketRequestFiltersPayload = GenericResponse<
  GetAllMarketRequestFiltersResponseItem
>;
