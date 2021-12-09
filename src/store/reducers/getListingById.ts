import { getListingByIdActions } from 'store/actions';
import {
  GetListingByIdMeta,
  GetListingByIdPayload,
} from 'types/store/GetListingByIdState';
import { createAsyncReducer } from 'utils/Redux';

export default createAsyncReducer<GetListingByIdMeta, GetListingByIdPayload>(
  getListingByIdActions
);
