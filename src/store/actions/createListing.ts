import {
  CreateListingMeta,
  CreateListingPayload,
} from 'types/store/CreateListingState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CREATE_LISTING';
const asyncAction = createAsyncAction<CreateListingMeta, CreateListingPayload>(
  ns
);

const createListingActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default createListingActions;
