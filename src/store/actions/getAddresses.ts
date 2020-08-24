import {
  GetAddressesMeta,
  GetAddressesPayload,
} from 'types/store/GetAddressesState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ADDRESSES';
const asyncAction = createAsyncAction<GetAddressesMeta, GetAddressesPayload>(
  ns
);

const getAddressesActions = {
  ...asyncAction,
};

export default getAddressesActions;
