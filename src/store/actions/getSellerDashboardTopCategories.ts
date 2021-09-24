import {
  GetSellerDashboardTopCategoriesMeta,
  GetSellerDashboardTopCategoriesPayload,
} from 'types/store/GetSellerDashboardTopCategoriesState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_DASHBOARD_TOP_CATEGORIES';
const asyncAction = createAsyncAction<
  GetSellerDashboardTopCategoriesMeta,
  GetSellerDashboardTopCategoriesPayload
>(ns);

const getSellerDashboardTopCategoriesActions = {
  ...asyncAction,
};

export default getSellerDashboardTopCategoriesActions;
