import {
  AddSellerLicenseMeta,
  AddSellerLicensePayload,
} from 'types/store/AddSellerLicenseState';
import { createAsyncReducer } from 'utils/Redux';

import { addSellerLicenseActions } from '../actions';

export default createAsyncReducer<
  AddSellerLicenseMeta,
  AddSellerLicensePayload
>(addSellerLicenseActions);
