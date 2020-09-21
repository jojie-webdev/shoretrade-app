import {
  UpdateListingMeta,
  UpdateListingPayload,
} from 'types/store/UpdateListingState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_LISTING';
const asyncAction = createAsyncAction<UpdateListingMeta, UpdateListingPayload>(
  ns
);

const updateListingActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default updateListingActions;
