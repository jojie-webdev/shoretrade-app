import {
  GetOrderInvoiceAdjustmentsMeta,
  GetOrderInvoiceAdjustmentsPayload,
} from 'types/store/GetOrderInvoiceAdjustmentsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ORDER_INVOICE_ADJUSTMENTS';
const asyncAction = createAsyncAction<
  GetOrderInvoiceAdjustmentsMeta,
  GetOrderInvoiceAdjustmentsPayload
>(ns);

const getOrderInvoiceAdjustmentsActions = {
  ...asyncAction,
};

export default getOrderInvoiceAdjustmentsActions;
