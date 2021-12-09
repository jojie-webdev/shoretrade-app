import {
  GetListingByIdMeta,
  GetListingByIdPayload,
} from 'types/store/GetListingByIdState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_LISTING_BY_ID';
const asyncAction = createAsyncAction<
  GetListingByIdMeta,
  GetListingByIdPayload
>(ns);

const getListingByIdActions = {
  ...asyncAction,
};

export default getListingByIdActions;
