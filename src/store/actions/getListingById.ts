import { createAsyncAction } from 'utils/Redux';
import { 
  GetListingByIdMeta, 
  GetListingByIdPayload
} from 'types/store/GetListingByIdState';

const ns = 'GET_LISTING_BY_ID';
const asyncAction = createAsyncAction<
  GetListingByIdMeta,
  GetListingByIdPayload
>(ns);

const getListingByIdActions = {
  ...asyncAction
};

export default getListingByIdActions;
