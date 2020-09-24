import {
  UpdateDefaultCardMeta,
  UpdateDefaultCardPayload,
} from 'types/store/UpdateDefaultCardState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_DEFAULT_CARD';
const asyncAction = createAsyncAction<
  UpdateDefaultCardMeta,
  UpdateDefaultCardPayload
>(ns);

const updateDefaultCardActions = {
  ...asyncAction,
};

export default updateDefaultCardActions;
