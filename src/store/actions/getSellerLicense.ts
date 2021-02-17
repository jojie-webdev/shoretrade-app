import {
  GetSellerLicenseMeta,
  GetSellerLicensePayload,
} from 'types/store/GetSellerLicenseState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_LICENSE';
const asyncAction = createAsyncAction<
  GetSellerLicenseMeta,
  GetSellerLicensePayload
>(ns);

const getSellerLicenseByIdActions = {
  ...asyncAction,
};

export default getSellerLicenseByIdActions;
