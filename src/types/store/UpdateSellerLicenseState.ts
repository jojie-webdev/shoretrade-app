import { GenericResponse } from 'types/GenericResponse';

import { SellerLicenseStatus } from './GetSellerLicenseState';

export type UpdateSellerLicenseMeta = {
  id: string;
  companyId: string;
  name?: string;
  sellerLicenseFile?: File | null;
  sellerLicenseFileBack?: File | null;
  expiredAt?: string;
  fileType?: string;
  fileTypeBack?: string;
  url?: string;
  urlBack?: string;
  stateId?: string;
  status?: SellerLicenseStatus;
};

interface Response extends GenericResponse {
  companyId: string;
}

export type UpdateSellerLicensePayload = Response;
