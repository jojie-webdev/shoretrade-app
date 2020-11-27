import {
  ResetPasswordMeta,
  ResetPasswordPayload,
} from 'types/store/ResetPasswordState';
import { createAsyncReducer } from 'utils/Redux';

import { resetPasswordActions } from '../actions';

export default createAsyncReducer<ResetPasswordMeta, ResetPasswordPayload>(
  resetPasswordActions
);
