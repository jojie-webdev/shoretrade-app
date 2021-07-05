import {
  GetAvailableCratesMeta,
  GetAvailableCratesPayload,
} from 'types/store/GetAvailableCrates';
import { createAsyncReducer } from 'utils/Redux';

import { getAvailableCratesActions } from '../actions';

export default createAsyncReducer<
  GetAvailableCratesMeta,
  GetAvailableCratesPayload
>(getAvailableCratesActions);
