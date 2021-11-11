import { GenericResponse } from 'types/GenericResponse';

export type SendOrderRatingMeta = {
  rating: number;
  privateFeedback?: string;
  orderId: string;
};

export type SendOrderRatingPayload = GenericResponse;
