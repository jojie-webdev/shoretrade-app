import {
  GetListingsByTypeMeta,
  GetListingsByTypePayload,
} from 'types/store/GetListingsByTypeState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_LISTINGS_BY_TYPE';
const asyncAction = createAsyncAction<
  GetListingsByTypeMeta,
  GetListingsByTypePayload
>(ns);

const getListingsByTypeActions = {
  ...asyncAction,
};

export default getListingsByTypeActions;
