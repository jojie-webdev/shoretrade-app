import {
  CreateBulkListingMeta,
  CreateBulkListingPayload,
} from 'types/store/CreateBulkListingState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CREATE_BULK_LISTING';
const asyncAction = createAsyncAction<
  CreateBulkListingMeta,
  CreateBulkListingPayload
>(ns);

const createListingActions = {
  ...asyncAction,
};

export default createListingActions;
