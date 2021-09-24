import {
  GetSellerDashboardTopCategoriesMeta,
  GetSellerDashboardTopCategoriesPayload,
} from 'types/store/GetSellerDashboardTopCategoriesState';
import { createAsyncReducer } from 'utils/Redux';

import { getSellerDashboardTopCategoriesActions } from '../actions';

export default createAsyncReducer<
  GetSellerDashboardTopCategoriesMeta,
  GetSellerDashboardTopCategoriesPayload
>(getSellerDashboardTopCategoriesActions);
