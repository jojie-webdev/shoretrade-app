import {
  GetAllListingsMeta,
  GetAllListingsPayload,
} from 'types/store/GetAllListingsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ALL_LISTINGS';
const asyncAction = createAsyncAction<
  GetAllListingsMeta,
  GetAllListingsPayload
>(ns);

const getAllListingsActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getAllListingsActions;
