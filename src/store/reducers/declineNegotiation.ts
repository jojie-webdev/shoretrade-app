import {
  DeclineNegotiationMeta,
  DeclineNegotiationPayload,
} from 'types/store/DeclineNegotiationState';
import { createAsyncReducer } from 'utils/Redux';

import { declineNegotiationActions } from '../actions';

export default createAsyncReducer<
  DeclineNegotiationMeta,
  DeclineNegotiationPayload
>(declineNegotiationActions);
