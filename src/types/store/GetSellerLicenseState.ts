import { GenericResponse } from 'types/GenericResponse';

export type SellerLicense = {
  url: string;
  id: string;
  name: string;
  approved: string;
  created_at: string;
};

export type GetSellerLicenseMeta = {
  companyId: string;
};

export type GetSellerLicensePayload = GenericResponse<{
  licenses: SellerLicense[];
}>;
