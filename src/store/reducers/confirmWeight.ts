import {
  ConfirmWeightMeta,
  ConfirmWeightPayload,
} from 'types/store/ConfirmWeightState';
import { createAsyncReducer } from 'utils/Redux';

import { confirmWeightActions } from '../actions';

export default createAsyncReducer<ConfirmWeightMeta, ConfirmWeightPayload>(
  confirmWeightActions
);
