import { GenericResponse } from 'types/GenericResponse';

export type GetBuyerSearchFiltersMeta = {
  // TODO: Add request values
};

// TODO: Update response value
export type GetBuyerSearchFiltersPayload = GenericResponse<{
  filters: {
    minimum_order: string;
    states: string[];
    metric: string[];
  };
}>;
