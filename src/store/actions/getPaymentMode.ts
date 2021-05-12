import {
  GetPaymentModePayload,
  GetPaymentModeMeta,
} from 'types/store/GetPaymentMode';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_PAYMENT_MODE';
const asyncAction = createAsyncAction<
  GetPaymentModeMeta,
  GetPaymentModePayload
>(ns);

const getPaymentMethodsActions = {
  ...asyncAction,
};

export default getPaymentMethodsActions;
