import {
  ForgotPasswordMeta,
  ForgotPasswordPayload,
} from 'types/store/ForgotPasswordState';
import { createAsyncReducer } from 'utils/Redux';

import { forgotPasswordActions } from '../actions';

export default createAsyncReducer<ForgotPasswordMeta, ForgotPasswordPayload>(
  forgotPasswordActions
);
