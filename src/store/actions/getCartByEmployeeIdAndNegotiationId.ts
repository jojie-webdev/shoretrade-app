import {
  GetCartByEmployeeIdAndNegotiationIdMeta,
  GetCartByEmployeeIdAndNegotiationIdPayload,
} from 'types/store/GetCartByEmployeeIdAndNegotiationIdState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_CART_BY_EMPLOYEE_ID_AND_NEGOTIATION_ID';
const asyncAction = createAsyncAction<
  GetCartByEmployeeIdAndNegotiationIdMeta,
  GetCartByEmployeeIdAndNegotiationIdPayload
>(ns);

const getCartByEmployeeIdAndNegotiationIdActions = {
  ...asyncAction,
};

export default getCartByEmployeeIdAndNegotiationIdActions;
