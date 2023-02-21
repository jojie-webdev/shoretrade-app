import { createAsyncReducer } from 'utils/Redux';
import {
  CreateBuyerCounterNegotiationMeta,
  CreateBuyerCounterNegotiationPayload,
} from 'types/store/CreateBuyerCounterNegotiationState';
import { createBuyerCounterNegotiationActions } from '../actions';

export default createAsyncReducer<
  CreateBuyerCounterNegotiationMeta,
  CreateBuyerCounterNegotiationPayload
>(createBuyerCounterNegotiationActions);
