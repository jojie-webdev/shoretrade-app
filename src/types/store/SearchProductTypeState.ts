import { GenericResponse } from 'types/GenericResponse';

export type SearchProductTypeMeta = {
  term: string;
};

export type SearchProductTypeResponseItem = {
  label: string;
  value: string;
};

export type SearchProductTypePayload = GenericResponse<{
  token: string;
  types: SearchProductTypeResponseItem[];
}>;
