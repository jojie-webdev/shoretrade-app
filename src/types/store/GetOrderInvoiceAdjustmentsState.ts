import { GenericResponse } from 'types/GenericResponse';

export type GetOrderInvoiceAdjustmentsMeta = {
  orderRefNum: string;
};

export type GetOrderInvoiceAdjustmentResponseItem = {
  initialLabel: string;
  orderAdjustmentsLabel: string[];
};

export type GetOrderInvoiceAdjustmentsPayload = GenericResponse<
  GetOrderInvoiceAdjustmentResponseItem
>;
