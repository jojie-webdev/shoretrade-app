import { PlaceOrderMeta, PlaceOrderPayload } from 'types/store/PlaceOrderState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'PLACE_ORDER';
const asyncAction = createAsyncAction<PlaceOrderMeta, PlaceOrderPayload>(ns);

const placeOrderActions = {
  ...asyncAction,
};

export default placeOrderActions;
