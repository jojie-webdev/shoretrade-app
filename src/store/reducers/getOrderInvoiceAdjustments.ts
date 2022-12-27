import {
  GetOrderInvoiceAdjustmentsMeta,
  GetOrderInvoiceAdjustmentsPayload,
} from 'types/store/GetOrderInvoiceAdjustmentsState';
import { createAsyncReducer } from 'utils/Redux';

import { getOrderInvoiceAdjustmentsActions } from '../actions';

export default createAsyncReducer<
  GetOrderInvoiceAdjustmentsMeta,
  GetOrderInvoiceAdjustmentsPayload
>(getOrderInvoiceAdjustmentsActions);
