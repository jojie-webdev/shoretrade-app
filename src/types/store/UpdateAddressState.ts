import { GenericResponse } from 'types/GenericResponse';

export type UpdateAddressMeta = {
  addressId: string;
  companyId: string;
  address: string;
  countryCode: string;
  default: boolean;
  level: string;
  postcode: string;
  state: string;
  streetName: string;
  streetNumber: string;
  suburb: string;
  unitNumber: string;
};

export type UpdateAddressPayload = GenericResponse;
