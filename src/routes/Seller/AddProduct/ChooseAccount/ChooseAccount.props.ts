export type AccountOption = {
  value: string;
  label: string;
};

export type ChooseAccountPublicProps = {
  accountOptions: AccountOption[];
  onSelectAccount: (account: string) => void;
  onUploadCSV: (csv: File) => void;
  isUploadingCSV: boolean;
  userPending: boolean;
};

export type ChooseAccountProps = ChooseAccountPublicProps;
