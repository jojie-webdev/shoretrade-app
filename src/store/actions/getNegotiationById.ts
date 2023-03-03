import {
  GetNegotiationByIdMeta,
  GetNegotiationByIdPayload,
} from 'types/store/GetNegotiationByIdState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_NEGOTIATION_BY_ID';
const asyncAction = createAsyncAction<
  GetNegotiationByIdMeta,
  GetNegotiationByIdPayload
>(ns);

const getNegotiationByIdActions = {
  ...asyncAction,
};

export default getNegotiationByIdActions;
