import {
  CreateCustomListingMeta,
  CreateCustomListingPayload,
} from 'types/store/CreateCustomListingState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CREATE_CUSTOM_LISTING';
const asyncAction = createAsyncAction<
  CreateCustomListingMeta,
  CreateCustomListingPayload
>(ns);

const createCustomListingActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default createCustomListingActions;
