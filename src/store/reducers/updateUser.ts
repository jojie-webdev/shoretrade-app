import { UpdateUserMeta, UpdateUserPayload } from 'types/store/UpdateUserState';
import { createAsyncReducer } from 'utils/Redux';

import { updateUserActions } from '../actions';

export default createAsyncReducer<UpdateUserMeta, UpdateUserPayload>(
  updateUserActions
);
