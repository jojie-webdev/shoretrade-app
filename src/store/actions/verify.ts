import { VerifyMeta, VerifyPayload } from 'types/store/VerifyState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'VERIFY_2FA';
const asyncAction = createAsyncAction<VerifyMeta, VerifyPayload>(ns);

const verifyActions = {
  ...asyncAction,
};

export default verifyActions;
