import { AddAddressMeta, AddAddressPayload } from 'types/store/AddAddressState';
import { createAsyncReducer } from 'utils/Redux';

import { addAddressActions } from '../actions';

export default createAsyncReducer<AddAddressMeta, AddAddressPayload>(
  addAddressActions
);
