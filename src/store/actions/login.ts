import { createAsyncAction } from 'utils/Redux';
import { LoginMeta, LoginPayload } from 'types/store/LoginState';

const ns = 'LOGIN';
const asyncAction = createAsyncAction<LoginMeta, LoginPayload>(ns);

const loginActions = {
  ...asyncAction,
};

export default loginActions;
