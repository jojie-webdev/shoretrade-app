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
  companyRelationship: string;
  toggleBusinessNumberMessage: boolean;
  onBusinessNumberClick: () => void;
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
