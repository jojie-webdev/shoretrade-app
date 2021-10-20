import { GenericResponse } from 'types/GenericResponse';

export type SellerLicenseStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'DELETED'
  | 'DECLINED';

export type SellerLicense = {
  url: string;
  id: string;
  name: string;
  approved: SellerLicenseStatus;
  created_at: string;
  expired_at: string;
  url_back?: string;
  state_id: string;
};

export type GetSellerLicenseMeta = {
  companyId: string;
};

export type GetSellerLicensePayload = GenericResponse<{
  licenses: SellerLicense[];
}>;
