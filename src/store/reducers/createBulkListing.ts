import {
  CreateBulkListingMeta,
  CreateBulkListingPayload,
} from 'types/store/CreateBulkListingState';
import { createAsyncReducer } from 'utils/Redux';

import { createBulkListingActions } from '../actions';

export default createAsyncReducer<
  CreateBulkListingMeta,
  CreateBulkListingPayload
>(createBulkListingActions);
