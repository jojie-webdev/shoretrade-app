import {
  UpdateDefaultCardMeta,
  UpdateDefaultCardPayload,
} from 'types/store/UpdateDefaultCardState';
import { createAsyncReducer } from 'utils/Redux';

import { updateDefaultCardActions } from '../actions';

export default createAsyncReducer<
  UpdateDefaultCardMeta,
  UpdateDefaultCardPayload
>(updateDefaultCardActions);
