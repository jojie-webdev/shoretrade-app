import {
  ChangePasswordMeta,
  ChangePasswordPayload,
} from 'types/store/ChangePasswordState';
import { createAsyncReducer } from 'utils/Redux';

import { changePasswordActions } from '../actions';

export default createAsyncReducer<ChangePasswordMeta, ChangePasswordPayload>(
  changePasswordActions
);
