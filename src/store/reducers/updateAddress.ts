import {
  UpdateAddressMeta,
  UpdateAddressPayload,
} from 'types/store/UpdateAddressState';
import { createAsyncReducer } from 'utils/Redux';

import { updateAddressActions } from '../actions';

export default createAsyncReducer<UpdateAddressMeta, UpdateAddressPayload>(
  updateAddressActions
);
