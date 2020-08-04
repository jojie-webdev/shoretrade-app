import { LoginMeta, LoginPayload } from 'types/store/LoginState';
import { createAsyncReducer } from 'utils/Redux';

import { loginActions } from '../actions';

export default createAsyncReducer<LoginMeta, LoginPayload>(loginActions);
