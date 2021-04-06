import getSellerLicenseActions from 'store/actions/getSellerLicense';
import {
  GetSellerLicenseMeta,
  GetSellerLicensePayload,
} from 'types/store/GetSellerLicenseState';
import { createAsyncReducer } from 'utils/Redux';

export default createAsyncReducer<
  GetSellerLicenseMeta,
  GetSellerLicensePayload
>(getSellerLicenseActions);
