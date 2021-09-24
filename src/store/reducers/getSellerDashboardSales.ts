import {
  GetSellerDashboardSalesMeta,
  GetSellerDashboardSalesPayload,
} from 'types/store/GetSellerDashboardSalesState';
import { createAsyncReducer } from 'utils/Redux';

import { getSellerDashboardSalesActions } from '../actions';

export default createAsyncReducer<
  GetSellerDashboardSalesMeta,
  GetSellerDashboardSalesPayload
>(getSellerDashboardSalesActions);
