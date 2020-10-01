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
}
