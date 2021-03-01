import { GenericResponse } from 'types/GenericResponse';

export type UpdateSellerLicenseMeta = {
  id: string;
  companyId: string;
};

interface Response extends GenericResponse {
  companyId: string;
}

export type UpdateSellerLicensePayload = Response;
