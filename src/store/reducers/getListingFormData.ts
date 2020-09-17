import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
} from 'types/store/GetListingFormDataState';
import { createAsyncReducer } from 'utils/Redux';

import { getListingFormDataActions } from '../actions';

export default createAsyncReducer<
  GetListingFormDataMeta,
  GetListingFormDataPayload
>(getListingFormDataActions);
