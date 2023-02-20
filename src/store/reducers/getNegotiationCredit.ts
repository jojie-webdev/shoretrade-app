import {
  GetNegotiationCreditMeta,
  GetNegotiationCreditPayload,
} from 'types/store/GetNegotiationCreditState';
import { createAsyncReducer } from 'utils/Redux';

import { getNegotiationCreditActions } from '../actions';

export default createAsyncReducer<
  GetNegotiationCreditMeta,
  GetNegotiationCreditPayload
>(getNegotiationCreditActions);
