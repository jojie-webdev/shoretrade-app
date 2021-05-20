import { GetAccountCompletionRequestData } from 'types/store/GetAccountCompletionState';

export interface AccountCompletionGeneratedProps {
  profileImage: string;
  name: string;
  accountCompletion?: GetAccountCompletionRequestData;
  goToLicenses: () => void;
}
