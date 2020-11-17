import { createAsyncReducer } from 'utils/Redux';
import {
  GetCoopUsersMeta,
  GetCoopUsersPayload,
} from 'types/store/GetCoopUsersState';
import { getCoopUsersActions } from '../actions';

export default createAsyncReducer<GetCoopUsersMeta, GetCoopUsersPayload>(
  getCoopUsersActions,
);
