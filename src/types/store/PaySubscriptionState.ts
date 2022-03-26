import { GenericResponse } from 'types/GenericResponse';

export type PaySubscriptionMeta = {
  companyId: string;
  existingCard?: string;
  cardDetails?: {
    cardNumber: string;
    cardExpiryDate: string;
    cardCvc: string;
    cardName: string;
    isDefault: boolean;
  };
};

// TODO: Update response value
export type PaySubscriptionPayload = GenericResponse;
