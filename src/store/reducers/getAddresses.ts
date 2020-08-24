import {
  GetAddressesMeta,
  GetAddressesPayload,
} from 'types/store/GetAddressesState';
import { createAsyncReducer } from 'utils/Redux';

import { getAddressesActions } from '../actions';

export default createAsyncReducer<GetAddressesMeta, GetAddressesPayload>(
  getAddressesActions
);
