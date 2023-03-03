import {
  AcceptNegotiationMeta,
  AcceptNegotiationPayload,
} from 'types/store/AcceptNegotiationState';
import { createAsyncReducer } from 'utils/Redux';

import { acceptNegotiationActions } from '../actions';

export default createAsyncReducer<
  AcceptNegotiationMeta,
  AcceptNegotiationPayload
>(acceptNegotiationActions);
