import {
  CreateNegotiationMeta,
  CreateNegotiationPayload,
} from 'types/store/CreateNegotiationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'NEGOTIATE';
const asyncAction = createAsyncAction<
  CreateNegotiationMeta,
  CreateNegotiationPayload
>(ns);

const createNegotiationActions = {
  ...asyncAction,
};

export default createNegotiationActions;
