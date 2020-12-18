import {
  GetShippingQuoteMeta,
  GetShippingQuotePayload,
} from 'types/store/GetShippingQuoteState';
import { createAsyncAction, createClearAction } from 'utils/Redux';

const ns = 'GET_SHIPPING_QUOTE';

const asyncAction = createAsyncAction<
  GetShippingQuoteMeta,
  GetShippingQuotePayload
>(ns);

const clearAction = createClearAction(ns);

const getShippingQuoteActions = {
  ...asyncAction,
  ...clearAction,
};

export default getShippingQuoteActions;
