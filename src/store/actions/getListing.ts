import { GetListingMeta, GetListingPayload } from 'types/store/GetListingState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_LISTING';
const asyncAction = createAsyncAction<GetListingMeta, GetListingPayload>(ns);

const getListingActions = {
  ...asyncAction,
};

export default getListingActions;
