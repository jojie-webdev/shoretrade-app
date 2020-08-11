import { Dispatch } from 'react';

export interface ForgotPasswordForm {
  email: string;
}

export interface ForgotPasswordGeneratedProps {
  pending: boolean;
  success: boolean;
  backToLogin: () => void;
  resetPassword: (data: ForgotPasswordForm) => void;
}
