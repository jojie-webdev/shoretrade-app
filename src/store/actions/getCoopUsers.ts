import {
  GetCoopUsersMeta,
  GetCoopUsersPayload,
} from 'types/store/GetCoopUsersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_COOP_USERS';
const asyncAction = createAsyncAction<GetCoopUsersMeta, GetCoopUsersPayload>(
  ns
);

const getCoopUsersActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getCoopUsersActions;
