import {
  AddSellerLicenseMeta,
  AddSellerLicensePayload,
} from 'types/store/AddSellerLicenseState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ADD_SELLER_LICENSE';
const asyncAction = createAsyncAction<
  AddSellerLicenseMeta,
  AddSellerLicensePayload
>(ns);

const addSellerLicenseActions = {
  ...asyncAction,
};

export default addSellerLicenseActions;
