import {
  UpdateListingMeta,
  UpdateListingPayload,
} from 'types/store/UpdateListingState';
import { createAsyncReducer } from 'utils/Redux';

import { updateListingActions } from '../actions';

export default createAsyncReducer<UpdateListingMeta, UpdateListingPayload>(
  updateListingActions
);
