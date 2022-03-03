export type PaymentMethodProps = {
  formik?: any;
  otherErrors: Record<string, string>;
  setOtherErrors: (error: Record<string, string>) => void;
};
