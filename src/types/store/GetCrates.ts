import { GenericResponse } from 'types/GenericResponse';

export type GetCratesMeta = {
  companyId: string;
};

export type GetCratesPayload = GenericResponse<{
  token: string;
  leased: string;
  small_crate: number;
  lidded_crate: number;
  large_crate: number;
}>;
