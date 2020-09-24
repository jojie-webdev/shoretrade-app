import { ChargeCardMeta, ChargeCardPayload } from 'types/store/ChargeCardState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CHARGE_CARD';
const asyncAction = createAsyncAction<ChargeCardMeta, ChargeCardPayload>(ns);

const chargeCardActions = {
  ...asyncAction,
};

export default chargeCardActions;
