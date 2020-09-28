import { OrderMeta, OrderPayload } from 'types/store/OrderState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ORDER';

const asyncAction = createAsyncAction<OrderMeta, OrderPayload>(ns);

const orderActions = {
  ...asyncAction,
};

export default orderActions;
