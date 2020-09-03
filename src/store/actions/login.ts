import { LoginMeta, LoginPayload } from 'types/store/LoginState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'LOGIN';
const asyncAction = createAsyncAction<LoginMeta, LoginPayload>(ns);

const loginActions = {
  ...asyncAction,
};

export default loginActions;
