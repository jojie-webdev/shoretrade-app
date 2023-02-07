import {
  GetAllNegotiationsMeta,
  GetAllNegotiationsPayload,
} from 'types/store/GetAllNegotiationsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ALL_NEGOTIATIONS';
const asyncAction = createAsyncAction<
  GetAllNegotiationsMeta,
  GetAllNegotiationsPayload
>(ns);

const getAllNegotiationsActions = {
  ...asyncAction,
};

export default getAllNegotiationsActions;
