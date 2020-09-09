import {
  SearchAndCountProductTypeMeta,
  SearchAndCountProductTypePayload,
} from 'types/store/SearchAndCountProductTypeState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'SEARCH_AND_COUNT_PRODUCT_TYPE';
const asyncAction = createAsyncAction<
  SearchAndCountProductTypeMeta,
  SearchAndCountProductTypePayload
>(ns);

const searchAndCountProductTypeActions = {
  ...asyncAction,
};

export default searchAndCountProductTypeActions;
