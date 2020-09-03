import {
  SearchAndCountProductTypeMeta,
  SearchAndCountProductTypePayload,
} from 'types/store/SearchAndCountProductTypeState';
import { createAsyncReducer } from 'utils/Redux';

import { searchAndCountProductTypeActions } from '../actions';

export default createAsyncReducer<
  SearchAndCountProductTypeMeta,
  SearchAndCountProductTypePayload
>(searchAndCountProductTypeActions);
