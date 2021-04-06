import {
  UpdateSellerLicenseMeta,
  UpdateSellerLicensePayload,
} from 'types/store/UpdateSellerLicenseState';
import { createAsyncReducer } from 'utils/Redux';

import { updateSellerLicenseActions } from '../actions';

export default createAsyncReducer<
  UpdateSellerLicenseMeta,
  UpdateSellerLicensePayload
>(updateSellerLicenseActions);
