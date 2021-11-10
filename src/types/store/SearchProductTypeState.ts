import { GenericResponse } from 'types/GenericResponse';

export type SearchProductTypeMeta = {
  term: string;
};

export type SearchProductTypeResponseItem = {
  label: string;
  value: string;
  image: string;
};

export type SearchProductTypePayload = GenericResponse<{
  token: string;
  types: SearchProductTypeResponseItem[];
}>;
