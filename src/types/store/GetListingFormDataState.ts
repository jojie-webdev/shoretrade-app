import { GenericResponse } from 'types/GenericResponse';

export type GetListingFormDataMeta = {
  typeId: string;
  currentListingId?: string;
  currentHistoricalListingId?: string;
};

export type GetListingFormDataResponse = {
  currentListingId?: string; // generated locally
  currentHistoricalListingId?: string; // generated locally
  token: string;
  categoryId: string;
  defaultPhoto: string; // uri
  measurementUnit: string;
  metric: {
    id: string;
    name: string; // ex. Grams
  };
  photoRequirements: {
    id: string;
    title: string;
  }[];
  stateOptions: {
    categoryStateOptionId: string;
    groupOrder: number;
    state: {
      id: string;
      name: string;
    };
    stateOptionId: string;
  }[][];
  stateRules: Record<string, string[]>;
  type: {
    id: string;
    name: string;
  };
  qualityOptions: string[];
};

export type GetListingFormDataPayload = GenericResponse<
  GetListingFormDataResponse
>;
