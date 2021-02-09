import { createAsyncAction } from 'utils/Redux';
import {
  GetAccountCompletionMeta,
  GetAccountCompletionPayload,
} from 'types/store/GetAccountCompletionState';

const ns = 'GET_ACCOUNT_COMPLETION';
const asyncAction = createAsyncAction<
  GetAccountCompletionMeta,
  GetAccountCompletionPayload
>(ns);

const getAddressesActions = {
  ...asyncAction,
};

export default getAddressesActions;
