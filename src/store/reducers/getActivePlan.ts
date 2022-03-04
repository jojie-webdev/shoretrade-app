import {
  GetActivePlanMeta,
  GetActivePlanPayload,
} from 'types/store/GetActivePlanState';
import { createAsyncReducer } from 'utils/Redux';

import { getActivePlanActions } from '../actions';

export default createAsyncReducer<GetActivePlanMeta, GetActivePlanPayload>(
  getActivePlanActions
);
