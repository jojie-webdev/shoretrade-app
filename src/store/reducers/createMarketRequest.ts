import {
  EditableMarketRequestMeta,
  EditableMarketRequestPayload,
} from 'types/store/EditableMarketRequest';
import { createAsyncReducer } from 'utils/Redux';

import { createMarketRequestActions } from '../actions';

export default createAsyncReducer<
  EditableMarketRequestMeta,
  EditableMarketRequestPayload
>(createMarketRequestActions);
