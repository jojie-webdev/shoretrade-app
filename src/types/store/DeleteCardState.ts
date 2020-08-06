import { GenericResponse } from 'types/GenericResponse';

export type DeleteCardMeta = {
  companyId: string;
  card: string;
};

export type DeleteCardPayload = GenericResponse;
