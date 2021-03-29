export type AccountOption = {
  value: string;
  label: string;
};

export type Step1PublicProps = {
  accountOptions: AccountOption[];
  onSelectAccount: (account: string) => void;
  onUploadCSV: (csv: File, account: string) => void;
  isUploadingCSV: boolean;
  userPending: boolean;
};

export type Step1Props = Step1PublicProps;
