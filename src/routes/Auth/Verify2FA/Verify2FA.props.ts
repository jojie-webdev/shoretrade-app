import { Dispatch } from 'react';

export interface Verify2FAGeneratedProps {
  verify: (code: string) => void;
  pending: boolean;
  backToLogin: () => void;
  resendCode: () => void;
  isError: boolean;
  showSellerPendingModal: boolean;
}
