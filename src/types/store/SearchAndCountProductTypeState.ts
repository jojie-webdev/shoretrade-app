import { GenericResponse } from 'types/GenericResponse';

export type SearchAndCountProductTypeMeta = {
  term: string;
  address: string;
};

export type SearchAndCountProductTypeResponseItem = {
  count: string;
  label: string;
  value: string;
};

export type SearchAndCountProductTypePayload = GenericResponse<{
  token: string;
  types: SearchAndCountProductTypeResponseItem[];
}>;
