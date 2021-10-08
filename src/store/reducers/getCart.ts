import { GetCartMeta, GetCartPayload } from 'types/store/GetCartState';
import { createAsyncReducer } from 'utils/Redux';

import { getCartActions } from '../actions';

export default createAsyncReducer<GetCartMeta, GetCartPayload>(getCartActions);
