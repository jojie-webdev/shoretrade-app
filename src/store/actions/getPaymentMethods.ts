import {
  GetPaymentMethodsMeta,
  GetPaymentMethodsPayload,
} from 'types/store/GetPaymentMethodsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_PAYMENT_METHODS';
const asyncAction = createAsyncAction<
  GetPaymentMethodsMeta,
  GetPaymentMethodsPayload
>(ns);

const getPaymentMethodsActions = {
  ...asyncAction,
};

export default getPaymentMethodsActions;
