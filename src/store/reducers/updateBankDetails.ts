import {
  UpdateBankDetailsMeta,
  UpdateBankDetailsPayload,
} from 'types/store/UpdateBankDetailsState';
import { createAsyncReducer } from 'utils/Redux';

import { updateBankDetailsActions } from '../actions';

export default createAsyncReducer<
  UpdateBankDetailsMeta,
  UpdateBankDetailsPayload
>(updateBankDetailsActions);
