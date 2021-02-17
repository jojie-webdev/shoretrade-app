import { GenericResponse } from 'types/GenericResponse';

export type GetAccountCompletionMeta = {
  companyId: string;
};

export type GetAccountCompletionRequestData = {
  checklist: {
    label: string;
    isChecked: boolean;
  }[];
  progressPercentage: string;
};

export type GetAccountCompletionPayload = GenericResponse<
  GetAccountCompletionRequestData
>;
