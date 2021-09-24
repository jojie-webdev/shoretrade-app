import {
  GetSellerDashboardSalesMeta,
  GetSellerDashboardSalesPayload,
} from 'types/store/GetSellerDashboardSalesState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_DASHBOARD_SALES';
const asyncAction = createAsyncAction<
  GetSellerDashboardSalesMeta,
  GetSellerDashboardSalesPayload
>(ns);

const getSellerDashboardSalesActions = {
  ...asyncAction,
};

export default getSellerDashboardSalesActions;
