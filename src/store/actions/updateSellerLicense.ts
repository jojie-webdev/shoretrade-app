import {
  UpdateSellerLicenseMeta,
  UpdateSellerLicensePayload,
} from 'types/store/UpdateSellerLicenseState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_SELLER_LICENSE';
const asyncAction = createAsyncAction<
  UpdateSellerLicenseMeta,
  UpdateSellerLicensePayload
>(ns);

const updateSellerLicenseActions = {
  ...asyncAction,
};

export default updateSellerLicenseActions;
