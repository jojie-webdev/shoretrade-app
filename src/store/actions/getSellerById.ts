import {
  GetSellerByIdMeta,
  GetSellerByIdPayload,
} from 'types/store/GetSellerByIdState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_BY_ID';
const asyncAction = createAsyncAction<GetSellerByIdMeta, GetSellerByIdPayload>(
  ns
);

const getSellerByIdActions = {
  ...asyncAction,
};

export default getSellerByIdActions;
