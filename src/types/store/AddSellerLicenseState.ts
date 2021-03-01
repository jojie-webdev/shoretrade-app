import { GenericResponse } from 'types/GenericResponse';

export type SellerLicense = {
  url: string;
  name: string;
  fileType: string;
};

export type AddSellerLicenseMeta = {
  companyId: string;
  sellerLicense?: SellerLicense;
  fileName?: string;
  sellerLicenseFile?: File | null;
};

export type Payload = {
  companyId: string;
} & GenericResponse<SellerLicense[]>;

export type AddSellerLicensePayload = Payload;
