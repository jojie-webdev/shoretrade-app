import { RegistrationDetails } from '../Register.props';

export type PaymentMethodProps = {
  details: RegistrationDetails;
  formik?: any;
  otherErrors: Record<string, string>;
  setOtherErrors: (error: Record<string, string>) => void;
};
