import { SendOrderRatingMeta, SendOrderRatingPayload } from 'types/store/SendOrderRatingState';
import { createAsyncReducer } from 'utils/Redux';
import { sendOrderRatingActions } from '../actions';

export default createAsyncReducer<SendOrderRatingMeta, SendOrderRatingPayload>(
  sendOrderRatingActions
);
