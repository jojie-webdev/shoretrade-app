import {
  ChangePasswordMeta,
  ChangePasswordPayload,
} from 'types/store/ChangePasswordState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CHANGE_PASSWORD';
const asyncAction = createAsyncAction<
  ChangePasswordMeta,
  ChangePasswordPayload
>(ns);

const changePasswordActions = {
  ...asyncAction,
};

export default changePasswordActions;
