import { GenericResponse } from 'types/GenericResponse';

export type ChargeCardMeta = {
  companyId: string;
  card: string;
  amount: string;
  currency: 'aud';
};

export type ChargeCardPayload = GenericResponse;
