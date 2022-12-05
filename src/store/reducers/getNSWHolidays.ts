import { GetNSWHolidaysPayload } from 'types/store/GetNSWHolidaysState';
import { createAsyncReducer } from 'utils/Redux';

import { getNSWHolidaysActions } from '../actions';

export default createAsyncReducer<{}, GetNSWHolidaysPayload>(
  getNSWHolidaysActions
);
