import { GenericResponse } from 'types/GenericResponse';

export type GetUserMeta = {};

export type UserCompany = {
  id: string;
  name: string;
  abn: string;
  isApproved: boolean;
  employeeId: string;
  ownerId: string;
  relationship: string;
  credit: string;
  bankRefNumber: string;
  stripeId?: string;
  debtFinancing?: string;
  addresses: [
    {
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
      approved: string;
      flatDeliveryFee?: any;
      depotAddress: {
        id: string;
        suburb: string;
        postcode: string;
        countryCode: string;
        cutOffTime: string;
      };
      createdAt: string;
      updatedAt: string;
    },
  ];
};

export type GetUserPayload = GenericResponse<{
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    profileImage: string; // image uri
    userGroup: string; // SELLER_ADMIN | BUYER_ADMIN
    status: string;
    companies: UserCompany[]; // TODO: Change to actual company data type
  };
  token: string;
}>;
