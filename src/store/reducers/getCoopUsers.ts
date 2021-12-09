import {
  GetCoopUsersMeta,
  GetCoopUsersPayload,
} from 'types/store/GetCoopUsersState';
import { createAsyncReducer } from 'utils/Redux';

import { getCoopUsersActions } from '../actions';

export default createAsyncReducer<GetCoopUsersMeta, GetCoopUsersPayload>(
  getCoopUsersActions
);
