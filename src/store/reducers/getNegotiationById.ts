import {
  GetNegotiationByIdMeta,
  GetNegotiationByIdPayload,
} from 'types/store/GetNegotiationByIdState';
import { createAsyncReducer } from 'utils/Redux';

import { getNegotiationByIdActions } from '../actions';

export default createAsyncReducer<
  GetNegotiationByIdMeta,
  GetNegotiationByIdPayload
>(getNegotiationByIdActions);
