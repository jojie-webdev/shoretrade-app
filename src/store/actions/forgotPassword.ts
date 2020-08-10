import {
  ForgotPasswordMeta,
  ForgotPasswordPayload,
} from 'types/store/ForgotPasswordState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'FORGOT_PASSWORD';
const asyncAction = createAsyncAction<
  ForgotPasswordMeta,
  ForgotPasswordPayload
>(ns);

const forgotPasswordActions = {
  ...asyncAction,
};

export default forgotPasswordActions;
