export type AccountOption = {
  value: string;
  label: string;
  image: string;
};

export type ChooseAccountPublicProps = {
  accountOptions: AccountOption[];
  onSelectAccount: (account: string) => void;
  onUploadCSV: (csv: File, salesChannel: string) => void;
  isUploadingCSV: boolean;
  userPending: boolean;
};

export type ChooseAccountProps = ChooseAccountPublicProps;
