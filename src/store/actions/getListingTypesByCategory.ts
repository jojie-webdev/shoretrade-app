import {
  GetListingTypesByCategoryMeta,
  GetListingTypesByCategoryPayload,
} from 'types/store/GetListingTypesByCategoryState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_LISTING_TYPES_BY_CATEGORY';
const asyncAction = createAsyncAction<
  GetListingTypesByCategoryMeta,
  GetListingTypesByCategoryPayload
>(ns);

const getListingTypesByCategoryActions = {
  ...asyncAction,
};

export default getListingTypesByCategoryActions;
