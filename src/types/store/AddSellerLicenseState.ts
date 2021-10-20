import { GenericResponse } from 'types/GenericResponse';

export type SellerLicense = {
  url: string;
  name: string;
  fileType: string;
  expiredAt?: string;
  urlBack?: string;
  fileTypeBack?: string;
  stateId: string;
};

export type AddSellerLicenseMeta = {
  companyId: string;
  sellerLicense?: SellerLicense;
  fileName?: string;
  sellerLicenseFile?: File | null;
  sellerLicenseFileBack?: File | null;
  stateId: string;
  expiredAt?: string;
};

export type Payload = {
  companyId: string;
} & GenericResponse<SellerLicense[]>;

export type AddSellerLicensePayload = Payload;
