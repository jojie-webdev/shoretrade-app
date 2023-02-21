import {
  CreateBuyerCounterNegotiationMeta,
  CreateBuyerCounterNegotiationPayload,
} from 'types/store/CreateBuyerCounterNegotiationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CREATE_BUYER_COUNTER_NEGOTIATION';
const asyncAction = createAsyncAction<
  CreateBuyerCounterNegotiationMeta,
  CreateBuyerCounterNegotiationPayload
>(ns);

const createBuyerCounterNegotiationActions = {
  ...asyncAction,
};

export default createBuyerCounterNegotiationActions;
