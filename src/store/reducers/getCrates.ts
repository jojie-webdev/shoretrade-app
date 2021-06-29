import { GetCratesMeta, GetCratesPayload } from 'types/store/GetCrates';
import { createAsyncReducer } from 'utils/Redux';

import { getCratesActions } from '../actions';

export default createAsyncReducer<GetCratesMeta, GetCratesPayload>(
  getCratesActions
);
