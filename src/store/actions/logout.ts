import { LoginPayload } from 'types/store/LoginState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'LOGOUT';
const asyncAction = createAsyncAction<String, LoginPayload>(ns);

const logoutActions = {
  ...asyncAction,
};

export default logoutActions;
