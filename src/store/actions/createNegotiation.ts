import {
  CreateNegotiationMeta,
  CreateNegotiationPayload,
} from 'types/store/CreateNegotiationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CREATE_NEGOTIATION';
const asyncAction = createAsyncAction<
  CreateNegotiationMeta,
  CreateNegotiationPayload
>(ns);

const createNegotiationActions = {
  ...asyncAction,
};

export default createNegotiationActions;
