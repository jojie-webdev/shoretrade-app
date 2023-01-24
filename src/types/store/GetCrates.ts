import { GenericResponse } from 'types/GenericResponse';

export type GetCratesMeta = {
  companyId: string;
};

export type GetCratesPayload = GenericResponse<{
  token: string;
  leased: string;
  small_crate: string;
  lidded_crate: string;
  large_crate: string;
}>;
