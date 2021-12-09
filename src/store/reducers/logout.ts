import { LoginPayload } from 'types/store/LoginState';
import { createAsyncReducer } from 'utils/Redux';

import { logoutActions } from '../actions';

export default createAsyncReducer<string, LoginPayload>(logoutActions);
