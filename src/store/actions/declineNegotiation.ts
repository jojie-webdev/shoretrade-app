import {
  DeclineNegotiationMeta,
  DeclineNegotiationPayload,
} from 'types/store/DeclineNegotiationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'DECLINE_NEGOTIATION';
const asyncAction = createAsyncAction<
  DeclineNegotiationMeta,
  DeclineNegotiationPayload
>(ns);

const declineNegotiationActions = {
  ...asyncAction,
};

export default declineNegotiationActions;
