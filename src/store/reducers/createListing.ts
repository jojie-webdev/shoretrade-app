import {
  CreateListingMeta,
  CreateListingPayload,
} from 'types/store/CreateListingState';
import { createAsyncReducer } from 'utils/Redux';

import { createListingActions } from '../actions';

export default createAsyncReducer<CreateListingMeta, CreateListingPayload>(
  createListingActions
);
