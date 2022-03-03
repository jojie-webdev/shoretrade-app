import { GetAccountCompletionRequestData } from 'types/store/GetAccountCompletionState';
import { GetFreeTrialExpiryResponseData } from 'types/store/GetFreeTrialExpiryState';
import { UserCompany } from 'types/store/GetUserState';

export interface LandingGeneratedProps {
  currentCompany: UserCompany | undefined;
  companies: UserCompany[];
  profilePicture: string;
  loadingUser: boolean;
  profileName: string;
  credit?: string;
  company?: Record<string, any>;
  companyRelationship: string;
  updateImage: (image: File) => void;
  updatingImage: boolean;
  logout: () => void;
  permission: boolean;
  accountCompletion?: GetAccountCompletionRequestData;
  freeTrialCountdown?: GetFreeTrialExpiryResponseData;
}
