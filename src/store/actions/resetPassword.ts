import {
  ResetPasswordMeta,
  ResetPasswordPayload,
} from 'types/store/ResetPasswordState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'RESET_PASSWORD';
const asyncAction = createAsyncAction<ResetPasswordMeta, ResetPasswordPayload>(
  ns
);

const addAddressActions = {
  ...asyncAction,
};

export default addAddressActions;
