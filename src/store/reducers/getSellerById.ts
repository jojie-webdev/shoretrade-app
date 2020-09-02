import getSellerByIdActions from 'store/actions/getSellerById';
import {
  GetSellerByIdMeta,
  GetSellerByIdPayload,
} from 'types/store/GetSellerByIdState';
import { createAsyncReducer } from 'utils/Redux';

export default createAsyncReducer<GetSellerByIdMeta, GetSellerByIdPayload>(
  getSellerByIdActions,
);
