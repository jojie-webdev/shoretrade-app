import { GenericResponse } from 'types/GenericResponse';

export interface State {
  country_code?: string;
  id: string;
  name: string;
  postal: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetStatesMeta = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetStatesPayload = GenericResponse<State[]>;
