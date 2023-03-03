import {
  CreateNegotiationMeta,
  CreateNegotiationPayload,
} from 'types/store/CreateNegotiationState';
import { createAsyncReducer } from 'utils/Redux';

import { createNegotiationActions } from '../actions';

export default createAsyncReducer<
  CreateNegotiationMeta,
  CreateNegotiationPayload
>(createNegotiationActions);
