import {
  GetBankDetailsMeta,
  GetBankDetailsPayload,
} from 'types/store/GetBankDetailsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_BANK_DETAILS';
const asyncAction = createAsyncAction<
  GetBankDetailsMeta,
  GetBankDetailsPayload
>(ns);

const getBankDetailsActions = {
  ...asyncAction,
};

export default getBankDetailsActions;
