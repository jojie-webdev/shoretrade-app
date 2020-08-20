import { ChangeEvent } from 'react';

export interface YourDetailsGeneratedProps {
  userDetails: UserDetails;
  businessDetails: BusinessDetails;
  onClickSave: (updateUserForm: UpdateUserForm) => void;
  updatingUser: boolean;
  loadingUser: boolean;
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

export type UpdateUserForm = UserDetails & BusinessDetails;

export type QueryParams = { companyId: string };
