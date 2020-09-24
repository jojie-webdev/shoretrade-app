import { ChargeCardMeta, ChargeCardPayload } from 'types/store/ChargeCardState';
import { createAsyncReducer } from 'utils/Redux';

import { chargeCardActions } from '../actions';

export default createAsyncReducer<ChargeCardMeta, ChargeCardPayload>(
  chargeCardActions
);
