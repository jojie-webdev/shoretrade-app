import {
  UpdateBankDetailsMeta,
  UpdateBankDetailsPayload,
} from 'types/store/UpdateBankDetailsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_BANK_DETAILS';
const asyncAction = createAsyncAction<
  UpdateBankDetailsMeta,
  UpdateBankDetailsPayload
>(ns);

const updateBankDetailsActions = {
  ...asyncAction,
};

export default updateBankDetailsActions;
