import { GenericResponse } from 'types/GenericResponse';

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetCoopUsersMeta = {};

export type GetCoopUsersRequest = {
  userId: string;
};

export type GetCoopUsersResponseItem = {
  ownerEmployeeId: string;
  company: string;
  profileImage: string;
  employees: {
    employeeId: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    relationship: string; // ex. 'ADMIN'
  }[];
};

export type GetCoopUsersPayload = GenericResponse<{
  token: string;
  users: GetCoopUsersResponseItem[];
}>;
