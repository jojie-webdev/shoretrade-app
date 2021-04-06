import {
  EditableMarketRequestState,
  EditableMarketRequestPayload,
} from 'types/store/EditableMarketRequest';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CREATE_MARKET_REQUEST';
const asyncAction = createAsyncAction<
  EditableMarketRequestState,
  EditableMarketRequestPayload
>(ns);

const createMarketRequestActions = {
  ...asyncAction,
};

export default createMarketRequestActions;
