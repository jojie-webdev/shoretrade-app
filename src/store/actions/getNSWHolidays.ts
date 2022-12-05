import { GetNSWHolidaysPayload } from 'types/store/GetNSWHolidaysState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_NSW_HOLIDAYS';
const asyncAction = createAsyncAction<{}, GetNSWHolidaysPayload>(ns);

const getNSWHolidaysActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getNSWHolidaysActions;
