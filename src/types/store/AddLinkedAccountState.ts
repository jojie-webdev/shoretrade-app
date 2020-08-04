import { GenericResponse } from 'types/GenericResponse';

export type AddLinkedAccountMeta = {
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  relationship: 'ASSISTANT' | 'SECONDARY'; // SECONDARY === FISHERMAN
  userGroup: 'seller' | 'buyer';
};

export type AddLinkedAccountPayload = GenericResponse;
