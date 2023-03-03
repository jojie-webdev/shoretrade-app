import {
  AcceptNegotiationMeta,
  AcceptNegotiationPayload,
} from 'types/store/AcceptNegotiationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ACCEPT_NEGOTIATION';
const asyncAction = createAsyncAction<
  AcceptNegotiationMeta,
  AcceptNegotiationPayload
>(ns);

const acceptNegotiationActions = {
  ...asyncAction,
};

export default acceptNegotiationActions;
