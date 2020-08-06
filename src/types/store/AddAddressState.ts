import { GenericResponse } from 'types/GenericResponse';

export type AddAddressMeta = {
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

export type AddAddressPayload = GenericResponse;
