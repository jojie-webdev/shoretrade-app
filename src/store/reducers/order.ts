import { OrderMeta, OrderPayload } from 'types/store/OrderState';
import { createAsyncReducer } from 'utils/Redux';

import { orderActions } from '../actions';

export default createAsyncReducer<OrderMeta, OrderPayload>(orderActions);
