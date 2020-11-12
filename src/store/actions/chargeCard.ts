import { ChargeCardMeta, ChargeCardPayload } from 'types/store/ChargeCardState';
import { createAsyncAction, createClearAction } from 'utils/Redux';

const ns = 'CHARGE_CARD';
const asyncAction = createAsyncAction<ChargeCardMeta, ChargeCardPayload>(ns);
const clearAction = createClearAction(ns);

const chargeCardActions = {
  ...asyncAction,
  ...clearAction,
};

export default chargeCardActions;
