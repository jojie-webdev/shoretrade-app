import {
  SearchProductTypeMeta,
  SearchProductTypePayload,
} from 'types/store/SearchProductTypeState';
import { createAsyncReducer } from 'utils/Redux';

import { searchProductTypeActions } from '../actions';

export default createAsyncReducer<
  SearchProductTypeMeta,
  SearchProductTypePayload
>(searchProductTypeActions);
