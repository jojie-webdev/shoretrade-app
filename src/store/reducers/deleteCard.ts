import { DeleteCardMeta, DeleteCardPayload } from 'types/store/DeleteCardState';
import { createAsyncReducer } from 'utils/Redux';

import { deleteCardActions } from '../actions';

export default createAsyncReducer<DeleteCardMeta, DeleteCardPayload>(
  deleteCardActions
);
