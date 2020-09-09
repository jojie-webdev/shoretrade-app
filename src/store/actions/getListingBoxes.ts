import {
  GetListingBoxesMeta,
  GetListingBoxesPayload,
} from 'types/store/GetListingBoxesState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_LISTING_BOXES';
const asyncAction = createAsyncAction<
  GetListingBoxesMeta,
  GetListingBoxesPayload
>(ns);

const getListingBoxesActions = {
  ...asyncAction,
};

export default getListingBoxesActions;
