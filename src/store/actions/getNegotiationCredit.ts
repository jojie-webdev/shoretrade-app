import {
  GetNegotiationCreditMeta,
  GetNegotiationCreditPayload,
} from 'types/store/GetNegotiationCreditState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_NEGOTIATION_CREDIT';
const asyncAction = createAsyncAction<
  GetNegotiationCreditMeta,
  GetNegotiationCreditPayload
>(ns);

const getNegotiationCreditActions = {
  ...asyncAction,
};

export default getNegotiationCreditActions;
