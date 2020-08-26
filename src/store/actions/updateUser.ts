import { UpdateUserMeta, UpdateUserPayload } from 'types/store/UpdateUserState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_USER';
const asyncAction = createAsyncAction<UpdateUserMeta, UpdateUserPayload>(ns);

const updateUserActions = {
  ...asyncAction,
};

export default updateUserActions;
