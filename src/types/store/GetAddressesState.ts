import { GenericResponse } from 'types/GenericResponse';

export type GetAddressesMeta = {
  companyId: string;
};

export type GetAddressesResponseItem = {
  id: string;
  unitNumber: string;
  level: string;
  streetNumber: string;
  streetName: string;
  suburb: string;
  state: string;
  postcode: string;
  countryCode: string;
  default: boolean;
  approved: 'APPROVED';
  flatDeliveryFee: string | null;
  depotAddress: {
    id: string;
    suburb: string;
    postcode: string;
    countryCode: string;
    cutOffTime: string; // HH:mm
  };
  createdAt: string;
  updatedAt: string;
};

export type GetAddressesPayload = GenericResponse<{
  token: string;
  addresses: GetAddressesResponseItem[];
}>;
