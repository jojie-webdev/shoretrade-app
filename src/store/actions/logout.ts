import { LoginPayload } from 'types/store/LoginState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'LOGOUT';
const asyncAction = createAsyncAction<string, LoginPayload>(ns);

const logoutActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  })
};

export default logoutActions;
