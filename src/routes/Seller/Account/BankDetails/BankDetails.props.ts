export interface BankDetailsGeneratedProps {
  loading: boolean;
  submitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  onClickSave: (details: BankDetails) => void;
  bankDetails: BankDetails;
  companyRelationship: string;
  toggleBusinessDetailsMessage: boolean;
  onBusinessDetailsClick: () => void;
}

export type BankDetails = {
  accountName: string;
  bsb: string;
  accountNumber: string;
};

export type QueryParams = { companyId: string };
