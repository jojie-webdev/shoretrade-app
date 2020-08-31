import {
  GetBankDetailsMeta,
  GetBankDetailsPayload,
} from 'types/store/GetBankDetailsState';
import { createAsyncReducer } from 'utils/Redux';

import { getBankDetailsActions } from '../actions';

export default createAsyncReducer<GetBankDetailsMeta, GetBankDetailsPayload>(
  getBankDetailsActions
);
