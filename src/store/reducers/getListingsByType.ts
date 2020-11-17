import {
  GetListingsByTypeMeta,
  GetListingsByTypePayload,
} from 'types/store/GetListingsByTypeState';
import { createAsyncReducer } from 'utils/Redux';

import { getListingsByTypeActions } from '../actions';

export default createAsyncReducer<
  GetListingsByTypeMeta,
  GetListingsByTypePayload
>(getListingsByTypeActions);
