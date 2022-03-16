import { UserCompany } from './GetUserState';

export type VerifyMeta = {
  email: string;
  verify2Fa: string;
  // playerId?: string; TODO: one signal player id
};

export type VerifyPayload = {
  status: number;
  message: string;
  data: {
    user: {
      companies: UserCompany[];
    };
    token: string;
  };
};
