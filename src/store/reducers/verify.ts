import { VerifyMeta, VerifyPayload } from 'types/store/VerifyState';
import { createAsyncReducer } from 'utils/Redux';

import { verifyActions } from '../actions';

export default createAsyncReducer<VerifyMeta, VerifyPayload>(verifyActions);
