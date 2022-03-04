import {
  GetActivePlanMeta,
  GetActivePlanPayload,
} from 'types/store/GetActivePlanState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_FREE_TRIAL_EXPIRY';
const asyncAction = createAsyncAction<GetActivePlanMeta, GetActivePlanPayload>(
  ns
);

const getActivePlanActions = {
  ...asyncAction,
};

export default getActivePlanActions;
