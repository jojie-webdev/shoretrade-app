import { GetUserMeta, GetUserPayload } from 'types/store/GetUserState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_USER';
const asyncAction = createAsyncAction<GetUserMeta, GetUserPayload>(ns);

const getUserActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getUserActions;
