import {
  ConfirmWeightMeta,
  ConfirmWeightPayload,
} from 'types/store/ConfirmWeightState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CONFIRM_WEIGHT';
const asyncAction = createAsyncAction<ConfirmWeightMeta, ConfirmWeightPayload>(
  ns
);

const confirmWeightActions = {
  ...asyncAction,
};

export default confirmWeightActions;
