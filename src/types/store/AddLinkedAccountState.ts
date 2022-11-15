import { GenericResponse } from 'types/GenericResponse';

export type AddLinkedAccountMeta = {
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile_cc: string;
  mobile_no: string;
  relationship: 'ASSISTANT' | 'SECONDARY'; // SECONDARY === FISHERMAN
  userGroup: 'seller' | 'buyer';
};

export type AddLinkedAccountPayload = GenericResponse;
