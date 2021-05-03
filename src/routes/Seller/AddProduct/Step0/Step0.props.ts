export type AccountOption = {
  value: string;
  label: string;
};

export type Step0PublicProps = {
  accountOptions: AccountOption[];
  onSelectAccount: (account: string) => void;
  onUploadCSV: (csv: File, account: string) => void;
  isUploadingCSV: boolean;
  userPending: boolean;
};

export type Step0Props = Step0PublicProps;
