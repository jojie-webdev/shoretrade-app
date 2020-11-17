export interface BankDetailsGeneratedProps {
  loading: boolean;
  submitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  onClickSave: (details: BankDetails) => void;
  bankDetails: BankDetails;
}

export type BankDetails = {
  accountName: string;
  bsb: string;
  accountNumber: string;
};

export type QueryParams = { companyId: string };
