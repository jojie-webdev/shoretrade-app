import {
  SearchProductTypeMeta,
  SearchProductTypePayload,
} from 'types/store/SearchProductTypeState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'SEARCH_PRODUCT_TYPE';
const asyncAction = createAsyncAction<
  SearchProductTypeMeta,
  SearchProductTypePayload
>(ns);

const searchProductTypeActions = {
  ...asyncAction,
};

export default searchProductTypeActions;
