import { UserCompany } from 'types/store/GetUserState';

export interface AccountLandingGeneratedProps {
  currentCompany: UserCompany | undefined;
  companies: UserCompany[];
  profilePicture: string;
  loadingUser: boolean;
  profileName: string;
  companyRelationship: string;
}
