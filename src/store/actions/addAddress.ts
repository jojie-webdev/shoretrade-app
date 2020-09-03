import { AddAddressMeta, AddAddressPayload } from 'types/store/AddAddressState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ADD_ADDRESS';
const asyncAction = createAsyncAction<AddAddressMeta, AddAddressPayload>(ns);

const addAddressActions = {
  ...asyncAction,
};

export default addAddressActions;
