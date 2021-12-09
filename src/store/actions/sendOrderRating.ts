import {
  SendOrderRatingMeta,
  SendOrderRatingPayload,
} from 'types/store/SendOrderRatingState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'SEND_ORDER_RATING';
const asyncAction = createAsyncAction<
  SendOrderRatingMeta,
  SendOrderRatingPayload
>(ns);

const sendOrderRatingActions = {
  ...asyncAction,
};

export default sendOrderRatingActions;
