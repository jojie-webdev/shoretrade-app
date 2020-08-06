import { GenericResponse } from 'types/GenericResponse';

export type GetCustomFormDataMeta = {};

export type CategoryData = {
  id: string;
  defaultPhoto: string; // uri
  measurementUnit: string;
  metrics: {
    id: string;
    label: string; // ex. Grams
  }[];
  name: string;
  photoRequirements: {
    id: string;
    title: string;
  }[];
  states: {
    categoryStateOptionId: string;
    groupOrder: number;
    state: {
      id: string;
      name: string;
    };
    stateOptionId: string;
  }[][];
  thumbnail: string; // uri
  stateRules?: Record<string, string[]>; // not included on actual response
};

export type GetCustomFormDataResponse = {
  categories: CategoryData[];
  stateRules: Record<string, string[]>;
  token: string;
};

export type GetCustomFormDataPayload = GenericResponse<
  GetCustomFormDataResponse
>;
