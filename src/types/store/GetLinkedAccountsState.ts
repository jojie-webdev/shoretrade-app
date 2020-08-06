import { GenericResponse } from 'types/GenericResponse';

export type GetLinkedAccountsMeta = {
  companyId: string;
};

export type GetLinkedAccountsResponseItem = {
  companyId: string;
  name: string;
  userId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  relationship: string; // ex. 'SECONDARY'
};

export type GetLinkedAccountsPayload = GenericResponse<{
  token: string;
  accounts: GetLinkedAccountsResponseItem[];
}>;
