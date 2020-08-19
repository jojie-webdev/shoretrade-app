import { GetUserMeta, GetUserPayload } from 'types/store/GetUserState';
import { createAsyncReducer } from 'utils/Redux';

import { getUserActions } from '../actions';

export default createAsyncReducer<GetUserMeta, GetUserPayload>(getUserActions);
