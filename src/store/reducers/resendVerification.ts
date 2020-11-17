import {
  ResendVerificationMeta,
  ResendVerificationPayload,
} from 'types/store/ResendVerificationState';
import { createAsyncReducer } from 'utils/Redux';

import { resendVerificationActions } from '../actions';

export default createAsyncReducer<
  ResendVerificationMeta,
  ResendVerificationPayload
>(resendVerificationActions);
