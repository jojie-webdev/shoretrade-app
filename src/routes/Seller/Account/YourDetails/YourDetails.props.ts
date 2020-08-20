import { ChangeEvent } from 'react';

export interface YourDetailsGeneratedProps {
  userDetails: UserDetails;
  businessDetails: BusinessDetails;
  onChangeUserDetails: (
    name: keyof UserDetails
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeBusinessDetails: (
    name: keyof BusinessDetails
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

export interface BusinessDetails {
  businessName: string;
  abn: string;
}

export type QueryParams = { companyId: string };
