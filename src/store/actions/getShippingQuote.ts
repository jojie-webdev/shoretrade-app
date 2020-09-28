import {
  GetShippingQuoteMeta,
  GetShippingQuotePayload,
} from 'types/store/GetShippingQuoteState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SHIPPING_QUOTE';

const asyncAction = createAsyncAction<
  GetShippingQuoteMeta,
  GetShippingQuotePayload
>(ns);

const getShippingQuoteActions = {
  ...asyncAction,
};

export default getShippingQuoteActions;
