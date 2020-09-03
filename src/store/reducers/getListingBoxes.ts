import {
  GetListingBoxesMeta,
  GetListingBoxesPayload,
} from 'types/store/GetListingBoxesState';
import { createAsyncReducer } from 'utils/Redux';

import { getListingBoxesActions } from '../actions';

export default createAsyncReducer<GetListingBoxesMeta, GetListingBoxesPayload>(
  getListingBoxesActions
);
