import {
  UpdateAddressMeta,
  UpdateAddressPayload,
} from 'types/store/UpdateAddressState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_ADDRESS';
const asyncAction = createAsyncAction<UpdateAddressMeta, UpdateAddressPayload>(
  ns
);

const updateAddressActions = {
  ...asyncAction,
};

export default updateAddressActions;
