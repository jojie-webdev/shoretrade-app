import {
  GetListingTypesByCategoryMeta,
  GetListingTypesByCategoryPayload,
} from 'types/store/GetListingTypesByCategoryState';
import { createAsyncReducer } from 'utils/Redux';

import { getListingTypesByCategoryActions } from '../actions';

export default createAsyncReducer<
  GetListingTypesByCategoryMeta,
  GetListingTypesByCategoryPayload
>(getListingTypesByCategoryActions);
