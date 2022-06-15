import { GetAccountCompletionRequestData } from 'types/store/GetAccountCompletionState';
import { GetActivePlanResponseData } from 'types/store/GetActivePlanState';
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
  activePlan?: GetActivePlanResponseData;
  currentMarketSector: string;
}
