export interface ResetPasswordForm {
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordGeneratedProps {
  pending: boolean;
  isError: boolean;
  savePassword: (data: ResetPasswordForm) => void;
  noAppFound: boolean;
}
