import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface YourDetailsGeneratedProps {
  userDetails: UserDetails;
  businessDetails: BusinessDetails;
  onClickSave: (updateUserForm: UpdateUserForm) => void;
  updatingUser: boolean;
  loadingUser: boolean;
  updateUserSuccess: boolean;
  callingCode: string;
  setCallingCode: Dispatch<SetStateAction<string>>;
  permitted: boolean;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  mobile_cc: string;
  mobile_no: string;
}

export interface BusinessDetails {
  businessName: string;
  abn: string;
}

export type UpdateUserForm = UserDetails & BusinessDetails;
