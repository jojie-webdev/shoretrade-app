export interface ChangePasswordGeneratedProps {
  onClickSave: (details: ChangePasswordDetails) => void;
  pending: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
}

export interface ChangePasswordDetails {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
