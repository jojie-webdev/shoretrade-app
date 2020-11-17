import { DeleteCardMeta, DeleteCardPayload } from 'types/store/DeleteCardState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'DELETE_CARD';
const asyncAction = createAsyncAction<DeleteCardMeta, DeleteCardPayload>(ns);

const deleteCardActions = {
  ...asyncAction,
};

export default deleteCardActions;
