import {
  EditableMarketRequestState,
  EditableMarketRequestPayload,
} from 'types/store/EditableMarketRequest';
import { createAsyncReducer } from 'utils/Redux';

import { createMarketRequestActions } from '../actions';

export default createAsyncReducer<
  EditableMarketRequestState,
  EditableMarketRequestPayload
>(createMarketRequestActions);
