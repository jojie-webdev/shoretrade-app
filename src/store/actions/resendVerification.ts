import {
  ResendVerificationMeta,
  ResendVerificationPayload,
} from 'types/store/ResendVerificationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'RESEND_2FA_VERIFICATION';
const asyncAction = createAsyncAction<
  ResendVerificationMeta,
  ResendVerificationPayload
>(ns);

const resendVerificationActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {
      lastRequest: new Date(),
    },
  }),
};

export default resendVerificationActions;
