import {
  CreateCustomListingMeta,
  CreateCustomListingPayload,
} from 'types/store/CreateCustomListingState';
import { createAsyncReducer } from 'utils/Redux';

import { createCustomListingActions } from '../actions';

export default createAsyncReducer<
  CreateCustomListingMeta,
  CreateCustomListingPayload
>(createCustomListingActions);
